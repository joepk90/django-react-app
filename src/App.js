import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/common/container';
import Section from './components/common/section';
import './App.css';
import Form from "@rjsf/core";

// .env: REACT_APP_API_URL=http://domain.com
const HOST = process.env.REACT_APP_API_URL

const handleFormSubmit = async (event) => {

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
  } else {
    toast.error("Something went wrong...");
  }

}

const renderForm = (serializer, formData) => {

  if (!serializer || !formData) return

  return (
    <Section>
      <Container>
        <Form
          schema={serializer.schema}
          uiSchema={serializer.uiSchema}
          formData={formData}
          onSubmit={handleFormSubmit}
        />
      </Container>
    </Section>
  )
}

function App() {

  const [serializer, setSerializer] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(HOST + '/blog/forms/1/')
      .then(results => results.json())
      .then(data => {

        const { formData, serializer } = data;

        setSerializer(serializer);
        setFormData(formData);
      });
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <Section>
          <Container>
            <h1>Django React App - Form Example</h1>
          </Container>
        </Section>
      </header>

      {renderForm(serializer, formData)}

    </div>
  );
}

export default App;
