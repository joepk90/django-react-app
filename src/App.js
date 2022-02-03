import React from 'react';
import DjangoForm from './components/DjangoForm';
import Container from './components/common/Container';
import Section from './components/common/Section';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {

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

      <main>
        <Section>
          <Container>
            <DjangoForm />
          </Container>
        </Section>
      </main>


    </div>
  );
}

export default App;
