import React from 'react';
import GlobalStyles from './styles/GlobalStyles';

// temp
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Login />
      <GlobalStyles />
      <Footer />
    </>
  );
}

export default App;
