import React from 'react';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import { margin } from '@mui/system';

function Card(props: {title: string, location: string, likes: number}) {
    return(
    <div className="Card">
                <Cards sx={{ width: 315, height: 260 , marginTop: 3, marginX: 3}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 30 }}>
                            {props.title}
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center", fontSize: 15 }}>
                            {props.location}
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginTop: 15, marginRight: 1.5}}>
                        <StarIcon sx={{}}></StarIcon>
                        <p id="numLikes">{props.likes}</p>
                     </CardMedia>
                </Cards>
        </div>
    );
}

export default Card;