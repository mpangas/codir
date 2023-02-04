import React from 'react';


function Signup() {
    return (
        <div className="main">
          <div id="largebox">
            <p id="promptedtext">Sign up for your Codir account</p>
            
            <p id="email">Email</p>
            <p id="username">Username</p>
            <p id="password">Password</p>
            <input id="emailbox"></input>
            <input id="usernamebox"></input>
            <input id="passwordbox"></input>
            
            <button id="signupbox">SIGN UP</button>
            <p id="alreadyhaveaccount">already have an account? click here to sign in</p>

            

          </div>
        </div>
      );
}

export default Signup;