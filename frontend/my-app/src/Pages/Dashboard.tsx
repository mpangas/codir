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
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1> 
            <h2 className="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
            <Card/>
            {/*<div className="Card">
                <Card sx={{ maxWidth: 345, marginTop: 1, marginLeft: 9 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: 0.5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>*/}
        </div>
    )
}

export default Dashboard