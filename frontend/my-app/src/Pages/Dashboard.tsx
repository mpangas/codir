import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Dashboard = (props: {username: string}) => {
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    return (
        <div className="dashboard">
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1> 
            <h2 id="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
            <div className="Card">
                <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 7 }}>
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
            </div>
            <div className="Card2">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 7 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>
            <div className="Card3">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 7 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>
            <div className="Card4">
            <Card sx={{ maxWidth: 275, marginTop: -45.6, marginLeft: 44 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>
            <div className="Card5">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 44 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>

            <div className="Card6">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 44 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>

            <div className="Card7">
            <Card sx={{ maxWidth: 275, marginTop: -45.6, marginLeft: 81 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>

            <div className="Card8">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 81 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>

            <div className="Card9">
            <Card sx={{ maxWidth: 275, marginTop: 1, marginLeft: 81 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            TITLE
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            AUTHOR
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: .5}}></ThumbUpOffAltIcon>
                        <p>98</p>
                     </CardMedia>
                </Card>
            </div>
            
        </div>
    )
}

export default Dashboard