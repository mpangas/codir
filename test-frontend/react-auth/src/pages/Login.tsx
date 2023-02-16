import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        } else {
            console.log(data.message);
        }
    }
    
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>  
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login