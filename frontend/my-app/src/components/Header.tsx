import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'

function Header() {
    return (
         <div className="header">
          <a id="headerLink" href="/"><h1 id="logo">CODIR</h1></a>
          <div className="cred">
            <Button id="login" href="/login">LOGIN</Button>
            <Button id="signup" href="/signup">SIGN UP</Button>
          </div>
         </div>
      );
}

export default Header;