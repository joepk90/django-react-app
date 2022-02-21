import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import { ToastContainer } from 'react-toastify';
import './App.css';


const App = () => (

  <Router>
    <ToastContainer />
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Layout>
  </Router>

);

export default App;
