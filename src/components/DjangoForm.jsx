import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubmitButton from './SubmitButton';
import Form from "@rjsf/core";
import { getPostForm, updatePost } from '../services/blogEndpoints';
import { isEmpty } from '../utilties/objects';

const DjangoForm = ({ isAuthenticated }) => {

    const [schema, setSchema] = useState({});
    const [uiSchema, setUISchema] = useState({});
    const [formData, setFormData] = useState({});
    const [formDisabled, setFormDisabled] = useState(false);

    useEffect(() => {

        (async () => {
            try {

                const response = await getPostForm(1);

                const { data } = response;

                if (!data || isEmpty(data)) {
                    throw new Error(response);
                }

                const { formData, serializer } = data;

                setSchema(serializer.schema)
                setUISchema(serializer.uiSchema)
                setFormData(formData)

            } catch (err) {

                // nested destructuring - extract the detail property:
                // if other nested objects don't exist, set to an empty object (making detail undefined)
                const { response: { data: { detail } = {} } = {} } = err;

                let errorMessage = !detail ? 'Something went wrong!' : detail;

                toast.error(errorMessage);

            }
        })()





    }, []);



    const renderAuthMessage = () => {

        if (isAuthenticated) {
            return '';
        }

        return (
            <p>The post can be updated once an hour, by anyone. Login, to update it at any time.</p>
        )

    }

    const renderLastUpdate = () => {

        const { last_update: lastUpdate } = formData;

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

    const handleFormChange = (event) => {

        if (!event || !event.formData) {
            toast.error("Something went wrong...");
        }

        setFormData(event.formData)

    }

    const handleFormSubmit = async () => {

        setFormDisabled(true);

        try {

            const response = await updatePost(1, formData);

            const { data } = response;

            if (!data || isEmpty(data)) {
                throw new Error(response);
            }

            toast.success("Success!");


            setFormData(data)
            setFormDisabled(false)

        } catch (err) {

            // nested destructuring - extract the detail property:
            // if other nested objects don't exist, set to an empty object (making detail undefined)
            const { response: { data: { detail } = {} } = {} } = err;

            let errorMessage = !detail ? 'Something went wrong!' : detail;

            toast.error(errorMessage);
            setFormData(formData)
            setFormDisabled(false)

        }

    }


    if (!schema || !uiSchema || !formData) return ''
    if (isEmpty(schema) || isEmpty(uiSchema) || isEmpty(formData)) return ''

    return (
        <React.Fragment>

            <Form
                disabled={formDisabled}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onSubmit={handleFormSubmit}
                className="py-3"
                onChange={handleFormChange}
            >
                <SubmitButton disabled={formDisabled} />
            </Form>

            {renderAuthMessage()}
            {renderLastUpdate()}

        </React.Fragment>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { login })(DjangoForm);