import React from 'react';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { margin } from '@mui/system';

function Card(props: any) {
    return(
    <div className="Card">
                <Cards sx={{ width: 315, height: 260 , marginTop: 3, marginLeft: 15 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 30 }}>
                            {props.title}
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center", fontSize: 15 }}>
                            {props.user}
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginTop: 15, marginRight: 1.5}}>
                        <ThumbUpAltOutlinedIcon sx={{marginRight: 0.5}}></ThumbUpAltOutlinedIcon>
                        <Typography gutterBottom variant="h5" component="div" sx={{marginRight: 1, marginTop: 0.2}}>{props.score}</Typography>
                        <ThumbDownAltOutlinedIcon sx={{marginRight: 0.5, marginTop: 0.2}}></ThumbDownAltOutlinedIcon>
                     </CardMedia>
                </Cards>
        </div>
    );
}

export default Card;