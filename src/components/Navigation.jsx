import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth'

const Navigation = ({ logout, isAuthenticated }) => {

    const authLinks = [
        {
            id: 'logout',
            label: 'Logout',
            path: '/',
            event: () => logout
        }
    ]

    const guestLinks = [
        {
            id: 'login',
            label: 'Login',
            path: '/login'
        }
    ]

    const links = isAuthenticated === true ? authLinks : guestLinks

    const renderLinks = (links) => {
        return links.map(link => {
            return <Link
                key={link.path}
                className="btn btn-info my-2 my-sm-0"
                onClick={logout}
                to={link.path}
            >{link.label}</Link>
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Home</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {/* <li class="nav-item active">
            <Link class="nav-link" to="/about">About</Link>
        </li> */}
            </ul>
            {renderLinks(links)}
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navigation);