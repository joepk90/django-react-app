import Container from './components/common/container';
import Section from './components/common/section';
import logo from './logo.svg';
import './App.css';
import Form from "@rjsf/core";

function App() {



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Django React App - Form Example
      </header>

      <Section>
        <Container>
          <Form
            schema={{}}
            uiSchema={{}}
            formData={{}}
          // widgets={widgets}
          />
        </Container>
      </Section>
    </div>
  );
}

export default App;
