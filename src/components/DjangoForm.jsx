import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubmitButton from './SubmitButton';
import Form from "@rjsf/core";
import { isEmpty } from '../utilties/objects';

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

class DjangoForm extends Component {
    state = {
        schema: {},
        uiSchema: {},
        formData: {},
        formDisabled: false
    }

    componentDidMount = () => {

        (async () => {

            fetch(HOST + '/blog/forms/1/')
                .then(results => results.json())
                .then(data => {

                    const { formData, serializer } = data;

                    this.setState({
                        schema: serializer.schema,
                        uiSchema: serializer.uiSchema,
                        formData: formData,
                    })
                });

        })()


    }

    handleFormSubmit = async (event) => {

        if (!event || !event.formData) {
            toast.error("Something went wrong...");
        }

        this.setState({
            formDisabled: true
        })

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const accessToken = localStorage.getItem('access');

        if (accessToken) {
            headers.Authorization = `JWT ${localStorage.getItem('access')}`;
        }

        await fetch(HOST + "/blog/posts/1/",
            {
                headers: headers,
                method: "PUT",
                body: JSON.stringify(event.formData)
            })
            .then(async (results) => {

                const { ok } = results;

                const data = await results.json();

                if (ok === false || !data || isEmpty(data)) {
                    let errorMessage = !data.detail ? 'Something went wrong!' : data.detail;
                    throw new Error(errorMessage);
                }

                toast.success("Success!");
                return this.setState({
                    formData: data,
                    formDisabled: false
                })

            })
            .catch(async (err) => {

                toast.error(err.toString());
                this.setState({
                    formData: this.state.formData,
                    formDisabled: false
                })

            });

        return;

    }

    renderAuthMessage = () => {

        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return '';
        }

        return (
            <p>The post can be updated once an hour, by anyone. Login, to update it at any time.</p>
        )

    }

    renderLastUpdate = () => {

        const { last_update: lastUpdate } = this.state.formData;

        if (!lastUpdate) return

        const dateTimeObj = new Date(Date.parse(lastUpdate));

        const time = dateTimeObj.toLocaleTimeString();
        const date = dateTimeObj.toLocaleString('default', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });



        return (
            <p>The last update was at:<br /> {date.toString()} at {time.toString()}.</p>
        )
    }

    render() {

        const { schema, uiSchema, formData, formDisabled } = this.state;

        if (!schema || !uiSchema || !formData) return ''
        if (isEmpty(schema) || isEmpty(uiSchema) || isEmpty(formData)) return ''

        return (
            <React.Fragment>

                <Form
                    disabled={formDisabled}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onSubmit={this.handleFormSubmit}
                    className="py-3"
                >
                    <SubmitButton disabled={formDisabled} />
                </Form>

                {this.renderAuthMessage()}
                {this.renderLastUpdate()}

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { login })(DjangoForm);