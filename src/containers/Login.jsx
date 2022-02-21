import React, { useState } from 'react';
import Section from '../components/common/Section';
import Container from '../components/common/Container';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()

    }

    // TODO setup django to drf_react_template library to generate login form schema 

    return (
        <Section>
            <Container>
                <h1>Sign In</h1>
                <p>Sign into your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder='password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submt">Login</button>
                </form>
            </Container >
        </Section>

    )
}

export default Login;