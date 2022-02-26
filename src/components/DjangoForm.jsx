import React, { Component } from 'react';
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

        const response = await fetch(HOST + "/blog/posts/1/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(event.formData)
            });

        const { status } = response;

        if (status && status === 200) {

            toast.success("Success!");
            this.setState({
                formData: event.formData,
                formDisabled: false
            })

        } else {

            let errorMessage = 'Something went wrong...';

            const errors = await response.json();

            const { non_field_errors: errorsArray } = errors;

            if (Array.isArray(errorsArray) && errorsArray.length) {
                errorMessage = errorsArray[0];
            }

            toast.error("Error: " + errorMessage);
            this.setState({
                formData: this.state.formData,
                formDisabled: false
            })

        }

        return response;

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
            <p>The post can be updated once an hour, by anyone. The last update was on:<br /> {date.toString()} at {time.toString()}.</p>
        )
    }

    render() {

        const { schema, uiSchema, formData, formDisabled } = this.state;

        if (!schema || !uiSchema || !formData) return ''
        if (isEmpty(schema) || isEmpty(uiSchema) || isEmpty(formData)) return ''

        return (
            <React.Fragment>

                {this.renderLastUpdate()}

                <Form
                    disabled={formDisabled}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onSubmit={this.handleFormSubmit}
                >
                    <SubmitButton disabled={formDisabled} />
                </Form>

            </React.Fragment>
        )
    }
}

export default DjangoForm;