import React from 'react';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function Card(props: any) {
    return(
    <div className="Card">
                <Cards sx={{ width: 315, height: 260 , marginTop: 3, marginLeft: 15 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                            {props.title}
                        </Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center" }}>
                            {props.author}
                        </Typography>
                     </CardContent>
                     <CardMedia sx={{display: 'flex', float: "right", marginRight: 1}}>
                        <ThumbUpOffAltIcon sx={{marginRight: 0.5}}></ThumbUpOffAltIcon>
                        <p>{props.likes}</p>
                     </CardMedia>
                </Cards>
        </div>
    );
}

export default Card;