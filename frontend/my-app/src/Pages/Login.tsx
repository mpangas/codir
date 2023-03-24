import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';


const Login = (props: { setUsername: (username: string) => void}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "" || username === undefined) {
            setError("You must enter a username.");
            return;
        }
        else if (password === "" || password === undefined) {
            setError("You must enter a password.");
            return;
        }
        const response = await fetch('http://localhost:8000/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json();
        if (response.status === 200) {
            navigate("/");
            props.setUsername(username);
        } else {
            setError(data.message);
        }
    }
    return (
        <div className="login">
            <div id="mainloginbox">
                <form onSubmit={submit}>
                    <p id="promptedlogintext">Login to your Codir account</p>
                    <TextField
                        sx={{ ml: 9, mb: 2, mt: -1 }}
                        className="input-box"
                        label="Username"
                        type="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <FormControl sx={{ ml: 9, mb: 2, mt: -1, marginTop: 0.5 }} className="input-box" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <div className="error-msg">
                        {error}
                    </div>
                    <Button variant="contained" color="primary" className="boxMargin" id="loginbox" type="submit">LOGIN</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;