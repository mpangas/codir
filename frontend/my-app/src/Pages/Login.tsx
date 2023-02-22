import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { spacing } from '@mui/system';
import Button from '@mui/material/Button'

const Login = (props: {setUsername: (username: string) => void }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    {/*function userChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUser(e.target.value); 
    }
    function passChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPass(e.target.value); 
    }
    function printInput() {
      console.log("Username: " + user);
      console.log("Password: " + pass);
    }*/}
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await fetch('http://localhost:8000/api/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
              username,
              password
          })
      })

      const data = await response.json();
      if(response.status === 200) {
          navigate("/");
          props.setUsername(username);
      } else {
          console.log(data.message);
      }
  }
    return (
      <div className="main">
      <div id="mainloginbox">
        <p id="promptedlogintext">Login to your Codir account</p>
        <TextField sx={{ml: 9 , mb: 2, mt: -1}} id="loginusernamebox" label="Username" type="Username" />
        <TextField
          sx={{ ml: 9 , mb: 0.5}}
          id="loginpasswordbox"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary" className="boxMargin" id="loginbox" onClick={printInput}>LOGIN</Button>
      </div>
    </div>
      );
}

export default Login;