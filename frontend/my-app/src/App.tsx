import React from 'react';
import './CSS/App.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import './CSS/Main.css';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
     <Header />
     <Main />
     <Footer />
    </div>
  );
}

export default App;
