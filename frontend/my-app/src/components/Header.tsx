import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'

const Header = (props: { username: string, setUsername: (username: string) => void }) =>  {
  const logout = async () => {
    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    props.setUsername("");
  }
  let menu;
  if (props.username === "" || props.username === undefined) {
    menu = (
      <div className="cred">
            <Button id="login" href="/login">LOGIN</Button>
            <Button id="signup" href="/signup">SIGN UP</Button>
      </div>
    )
  } else {
    menu = (
      <div className="cred">
          <Button id="logout" href="/login" onClick={logout}>LOGOUT</Button>
      </div>
    )
  }
  return (
         <div className="header">
          <a id="headerLink" href="/"><h1 id="logo">CODIR</h1></a>
          <div className="cred">
            {menu}
          </div>
         </div>
  );
}

export default Header;