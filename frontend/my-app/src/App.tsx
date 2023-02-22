import React from 'react';
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';
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
  const [username, setUsername] = React.useState('');
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        const data = await response.json();
        setUsername(data.username);
      }
    )();
  });
  return (
    <BrowserRouter>
    <div className="App">
      <Header username={username} setUsername={setUsername}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
