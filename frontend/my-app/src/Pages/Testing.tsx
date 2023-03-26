import React, { useEffect, useState } from 'react';
import { FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';

const Testing = (props: { username: string }) => {
    const [Title, setTitle] = useState("");
    const [Location, setLocation] = useState("");
    const [User, setUser] = useState("");
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Title,
                Location,
                User,
            })
        })

        const data = await response.json();
        console.log(JSON.stringify(data));
    }
    return (
        <div className="testing">
            <br></br>
            <form onSubmit={submit}>
                <TextField
                    sx={{ ml: 50, mb: 2, mt: 2 }}
                    className="input-box"
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    sx={{ ml: 50, mb: 2, mt: -1 }}
                    className="input-box"
                    label="Location"
                    onChange={e => setLocation(e.target.value)}
                />
                <TextField
                    sx={{ ml: 50, mb: 2, mt: -1 }}
                    className="input-box"
                    label="User"
                    onChange={e => setUser(e.target.value)}
                />
                <Button sx={{ ml: 50, mb: 2, mt: -1 }} variant="contained" color="primary" className="boxMargin" id="loginbox" type="submit">Submit</Button>
            </form>
        </div>
    );
}



export default Testing;