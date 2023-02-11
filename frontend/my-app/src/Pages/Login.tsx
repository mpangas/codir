import React from 'react';
import { TextField } from '@mui/material';
import { spacing } from '@mui/system';

function Login() {
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    function userChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUser(e.target.value); 
    }
    function passChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPass(e.target.value); 
    }
    function printInput() {
      console.log("Username: " + user);
      console.log("Password: " + pass);
    }
    return (
      <div className="main">
      <div id="mainloginbox">
        <p id="promptedlogintext">Login to your Codir account</p>
        <TextField sx={{ml: 9 , mb: 2}} id="loginusernamebox" label="Username" type="Username" />
        <TextField
          sx={{ ml: 9 , mb: 0.5}}
          id="loginpasswordbox"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        {/*<input value={user} className="boxMargin" id="loginusernamebox" placeholder='Enter your Username' onChange={userChange}></input>*/}
        {/*<input value={pass} type={'password'} className="boxMargin" id="loginpasswordbox" placeholder='Enter your Password' onChange={passChange}></input>*/}
        <button className="boxMargin" id="loginbox" onClick={printInput}>LOGIN</button>
      </div>
    </div>
      );
}

export default Login;