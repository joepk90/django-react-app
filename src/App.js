import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/common/container';
import Section from './components/common/section';
import logo from './logo.svg';
import './App.css';
import Form from "@rjsf/core";

const handleFormSubmit = async (event) => {

  const response = await fetch("http://127.0.0.1:8000/blog/posts/1/",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(event.formData)
    })

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

  const [serializer, setSerializer] = React.useState(null);
  const [formData, setFormData] = React.useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/blog/forms/1/')
      .then(results => results.json())
      .then(data => {

        console.log(data);

        const { formData, serializer } = data;

        setSerializer(serializer);
        setFormData(formData);
      });
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Django React App - Form Example
      </header>

      {renderForm(serializer, formData)}

    </div>
  );
}

export default App;
