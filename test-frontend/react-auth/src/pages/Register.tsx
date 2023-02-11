import React, { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'no-cors',
            body: JSON.stringify({
                email,
                username,
                password
            })
        });

        const content = await response.json();
        console.log("test");
        console.log(content);
        // Check if the response is successful
        if (!response.ok) {
            // Redirect to the login page
            console.log("pog");
            navigate('/login', { replace: true });
        } else {
            // Display the error message
            console.log(content.message);
        }
    }
    
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Create an Account</h1>
                <div className="form-floating">
                    <input type="name" className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="Email Address" required onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingEmail">Email Address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </main>
    )
}

export default Register