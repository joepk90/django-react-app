import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from "@rjsf/core";
import Section from '../components/common/Section';
import Container from '../components/common/Container';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { getLoginForm } from '../services/authEndpoints'
import { isEmpty } from '../utilties/objects';

const Login = ({ login, isAuthenticated }) => {

    const [schema, setSchema] = useState({});
    const [uiSchema, setUISchema] = useState({});
    const [formData, setFormData] = useState({});
    const [formDisabled, setFormDisabled] = useState(false);

    useEffect(() => {

        (async () => {

            // TODO setup try catch in case form endpoint fails
            const response = await getLoginForm()

            const { data } = response;

            const { serializer: {
                schema,
                uiSchema
            } = {} } = data;

            // delete the form title
            delete schema['title'];

            setSchema(schema)
            setUISchema(uiSchema)

            // if (!data || isEmpty(data)) {
            //     throw new Error(response);
            // }


        })();

    }, [])

    const handleFormChange = (event) => {

        if (!event || !event.formData) {
            toast.error("Something went wrong...");
        }

        setFormData(event.formData)

    }

    const handleFormSubmit = async () => {

        setFormDisabled(true);
        const res = await login(formData);

        if (!res.status && res.status !== 200) {

            const { response: { data: { detail } = {} } = {} } = res;
            let errorMessage = !detail ? 'Something went wrong!' : detail;

            toast.error(errorMessage);
            setFormData(formData)
            setFormDisabled(false)
        }
    }


    if (isAuthenticated) {
        return <Navigate replace to="/" />
    }

    const renderForm = () => {

        if (!schema || isEmpty(schema) || !uiSchema || isEmpty(uiSchema)) return '';

        return (
            <Form
                disabled={formDisabled}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onSubmit={handleFormSubmit}
                onChange={handleFormChange}
            >
                <button className="btn btn-info" type="submt">Login</button>
            </Form>
        );

    }

    return (
        <Section>
            <Container>
                <h1>Sign In</h1>
                <p>Sign into your Account</p>

                {renderForm()}

            </Container >
        </Section>

    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);