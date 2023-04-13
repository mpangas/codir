import React, { useEffect } from 'react'

const Preferences = (props: {username: string}) => {
    return (
        <div className="home">
            {props.username ? <h1>Welcome {props.username}</h1> : <h1>Welcome! Please sign up or log back in.</h1>}
        </div>
    )
}

export default Preferences