import React from 'react';
import { useState } from 'react';

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
            <input value={email} className="boxMargin" id="emailbox" placeholder='Enter your Email' onChange={emailChange}></input>
            <input value={user} className="boxMargin" id="usernamebox" placeholder='Enter your Username' onChange={userChange}></input>
            <input value={pass} type={'password'} className="boxMargin" id="passwordbox" placeholder='Enter your Password' onChange={passChange}></input>
            <button className="boxMargin" id="signupbox" onClick={printInput}>SIGN UP</button>
            <p id="alreadyhaveaccount">already have an account? click here to sign in</p>
          </div>
        </div>
      );
}

export default Signup;