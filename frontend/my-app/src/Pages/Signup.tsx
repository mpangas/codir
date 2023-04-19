import { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props: { setUsername: (username: string) => void}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameReg = /^[a-zA-Z0-9]{6,20}$/;
    const passwordReg = /^.{6,20}$/;

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (email === "" || email === undefined) {
            setError("You must enter a email.");
            return;
        }
        else if (username === "" || username === undefined) {
            setError("You must enter a username.");
            return;
        }
        else if (password === "" || password === undefined) {
            setError("You must enter a password.");
            return;
        }

        if (!emailReg.test(email)) {
            setError("Email address should adhere to this format: example@example.com");
            return;
        }
        else if (!usernameReg.test(username)) {
            setError("The username must contain only alphanumeric and 6-20 characters.");
            return;
        }
        else if (!passwordReg.test(password)) {
            setError("The password should contain 6-20 characters.");
            return;
        }

        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                username,
                password
            })
        })

        const data = await response.json();
        if (response.status === 200) {
            navigate("/preferences");
            props.setUsername(username);
        } else {
            console.log(data.message);
        }
    }
    return (
        <div className="signup">
            <div id="largebox">
                <form onSubmit={submit}>
                    <p id="promptedtext">Sign up for your Codir account</p>
                    <TextField
                        sx={{ ml: 11, mb: 2, mt: -2 }}
                        id="emailbox"
                        label="Email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ ml: 11, mb: 2 }}
                        id="usernamebox"
                        label="Username"
                        type="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        sx={{ ml: 11, mb: 0.5 }}
                        id="passwordbox"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="error-msg">
                        {error}
                    </div>
                    
                    <Button
                        data-testid="my-button"
                        variant="contained"
                        color="primary"
                        className="boxMargin"
                        id="signupbox"
                        type="submit">SIGN UP</Button>
                    <p id="alreadyhaveaccount">already have an account? click here to <Link to="/login">sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;