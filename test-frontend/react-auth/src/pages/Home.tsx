import React, { useEffect } from 'react'

const Home = () => {
    const [username, setUsername] = React.useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })

                const data = await response.json();
                setUsername(data.username);
            }
        )();
    });

    return (
        <div className="home">
            Hi {username}
        </div>
    )
}

export default Home