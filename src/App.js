import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import { ToastContainer } from 'react-toastify';
import './App.css';
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>

);

export default App;
