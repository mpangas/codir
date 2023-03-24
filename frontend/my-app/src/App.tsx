import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';
import './CSS/Card.css';
import './CSS/App.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import './CSS/Main.css';
import './CSS/Login.css';
import './CSS/Signup.css';
import './CSS/Dashboard.css';
import './CSS/AboutUs.css';
import './CSS/Browse.css';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import AboutUs from './Pages/AboutUs'
import Browse from './Pages/Browse'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Rubik, sans-serif',
      fontSize: 15,
      textTransform: 'none',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header username={username} setUsername={setUsername} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login setUsername={setUsername} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard username={username} />} />
            <Route path="/about" element={<AboutUs username={username}/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;