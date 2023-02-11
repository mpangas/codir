import React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { spacing } from '@mui/system';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = React.useState("");
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");

    function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
      setEmail(e.target.value); 
    }
    function userChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUser(e.target.value); 
    }
    function passChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPass(e.target.value); 
    }
    function printInput() {
      console.log("Email: " + email);
      console.log("Username: " + user);
      console.log("Password: " + pass);
    }
    return (
        <div className="main">
          <div id="largebox">
            <p id="promptedtext">Sign up for your Codir account</p>
            <TextField sx={{ml: 11 , mb: 2, mt: -2}} id="emailbox" label="Email" type="email" />
            <TextField sx={{ml: 11 , mb: 2}} id="usernamebox" label="Username" type="Username" />
            <TextField
              sx={{ ml: 11 , mb: 0.5}}
              id="passwordbox"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            {/*<input value={email} className="boxMargin" id="emailbox" placeholder='Enter your Email' onChange={emailChange}></input>
            <input value={user} className="boxMargin" id="usernamebox" placeholder='Enter your Username' onChange={userChange}></input>
    <input value={pass} type={'password'} className="boxMargin" id="passwordbox" placeholder='Enter your Password' onChange={passChange}></input>*/}
            <Button variant="contained" color="primary" className="boxMargin" id="signupbox" onClick={printInput}>SIGN UP</Button>
            <p id="alreadyhaveaccount">already have an account? click here to <Link to="/login">sign in</Link>
            </p>
          </div>
        </div>
      );
}

export default Signup;