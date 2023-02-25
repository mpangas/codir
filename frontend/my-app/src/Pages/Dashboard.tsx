import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '../components/Card';

const Dashboard = (props: {username: string}) => {
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    return (
        <div className="dashboard">
            <br></br>
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1> 
            <h2 className="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
            <Card title="TITLE" author="AUTHOR" likes={98}/>
        </div>
    )
}

export default Dashboard