import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import history from './services/history';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={10000} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
