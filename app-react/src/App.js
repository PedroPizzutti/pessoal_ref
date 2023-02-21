import React from 'react';
import GlobalStyles from './styles/GlobalStyles';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

function App() {
  return (
    <>
      <Header />
      <Routes />
      <GlobalStyles />
      <Footer />
    </>
  );
}

export default App;
