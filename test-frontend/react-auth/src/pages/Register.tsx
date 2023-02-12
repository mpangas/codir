import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                username,
                password
            })
        })
        
        const data = await response.json();
        if(response.status === 200) {
            navigate("/login");
        } else {
            console.log(data.message);
        }
    }
    
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Create an Account</h1>
                <div className="form-floating">
                    <input className="form-control" id="floatingInput" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="floatingEmail" placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingEmail">Email Address</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </main>
    )
}

export default Register