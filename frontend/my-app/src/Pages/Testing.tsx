import React, { useEffect, useState } from 'react';
import { FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import { spacing, Stack } from '@mui/system';

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
        <><div className="testing">
            <form onSubmit={submit}>
                <FormControl sx={{ ml: 70 }}>
                    <TextField
                        sx={{ mt: 4 }}
                        className="input-box"
                        label="Title"
                        onChange={e => setTitle(e.target.value)} />
                    <TextField
                        sx={{ mt: 4 }}
                        className="input-box"
                        label="Location"
                        onChange={e => setLocation(e.target.value)} />
                    <TextField
                        sx={{ mt: 4 }}
                        className="input-box"
                        label="User"
                        onChange={e => setUser(e.target.value)} />
                    <Button sx={{ mt: 4 }} variant="contained" color="primary" type="submit">Submit</Button>
                </FormControl>
            </form>
        </div><h1 id="test">TEST</h1></>
    );
}



export default Testing;