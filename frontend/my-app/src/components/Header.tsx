import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(value === 0)
            navigate("/");
        else if(value === 1)
            navigate("/login");
        else if(value === 2)
            navigate("/signup");
    }, [value, navigate])
    
    return (
         <div className="header">
          <h1 id="logo" onClick={() => {setValue(0)}}>CODIR</h1>
          <div className="cred">
            <button id="login" onClick={() => {setValue(1)}}>LOGIN</button>
            <button id="signup" onClick={() => {setValue(2)}}>SIGN UP</button>
          </div>
         </div>
      );
}

export default Header;