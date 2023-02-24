import React, { useEffect } from 'react'

const Dashboard = (props: {username: string}) => {
    return (
        <div className="dashboard">
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1> 
            <h2 className="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
        </div>
    )
}

export default Dashboard