import axios from 'axios';
import { getCurrentUser, verifyAccessToken, createAccessToken } from '../services/endpoints'


import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from './types';

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {

        try {

            await verifyAccessToken();

            dispatch({
                type: AUTHENTICATED_SUCCESS,
            })

        } catch (err) {

            // console.log(err);

            dispatch({
                type: AUTHENTICATED_FAIL,
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
}

export const load_user = () => async dispatch => {

    // TODO use funtion to handle this
    if (localStorage.getItem('access')) {



        try {

            const response = await getCurrentUser();

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })

        } catch (err) {

            // console.log(err);

            dispatch({
                type: USER_LOADED_FAIL,
            })
        }

    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }



}

export const login = (email, password) => async dispatch => {

    try {

        const response = await createAccessToken(email, password)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(load_user());
    } catch (err) {

        // console.log(err);

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
}