import React from 'react';
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './CSS/App.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import './CSS/Main.css';
import './CSS/Login.css';
import './CSS/Signup.css';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
