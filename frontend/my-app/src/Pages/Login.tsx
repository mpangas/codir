import React from 'react';

function Login() {
    return (
      <div className="main">
      <div id="mainloginbox">
        <p id="promptedlogintext">Login to your Codir account</p>
        <input className="boxMargin" id="loginusernamebox" placeholder='Enter your Username'></input>
        <input type={'password'} className="boxMargin" id="loginpasswordbox" placeholder='Enter your Password'></input>
        <button className="boxMargin" id="loginbox">LOGIN</button>
      </div>
    </div>
      );
}

export default Login;