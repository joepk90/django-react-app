import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './common/container';
import Section from './common/section';
import Form from "@rjsf/core";

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

class DjangoForm extends Component {
    state = {
        schema: {},
        uiSchema: {},
        formData: {},
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

        const response = await fetch(HOST + "/blog/posts/1/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(event.formData)
            })
            .then((result) => result.json())
            .then((result) => {
                toast.error(result.non_field_errors[0]);
            });

        const { status } = response;

        if (status && status === 200) {

            toast.success("Success!");
            this.setState({
                formData: event.formData
            })

        } else {

            toast.error("Something went wrong...");
            this.setState({
                formData: this.state.formData
            })

        }

        return response;

    }

    render() {

        const { schema, uiSchema, formData } = this.state;

        if (!schema || !uiSchema || !formData) return

        return (
            <Section>
                <Container>
                    <Form
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={formData}
                        onSubmit={this.handleFormSubmit}
                    />
                </Container>
            </Section>
        )
    }
}

export default DjangoForm;