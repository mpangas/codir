import React from 'react';


function Signup() {
    return (
        <div className="main">
          <div id="largebox">
            <p id="promptedtext">Sign up for your Codir account</p>
            <input className="boxMargin" id="emailbox" placeholder='Enter your Email'></input>
            <input className="boxMargin" id="usernamebox" placeholder='Enter your Username'></input>
            <input type={'password'} className="boxMargin" id="passwordbox" placeholder='Enter your Password'></input>
            <button className="boxMargin" id="signupbox">SIGN UP</button>
            <p id="alreadyhaveaccount">already have an account? click here to sign in</p>

            

          </div>
        </div>
      );
}

export default Signup;