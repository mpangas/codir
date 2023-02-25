import React from 'react';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function Card() {
    return(
    <div className="Card">
                <Cards sx={{ maxWidth: 345, marginTop: 1, marginLeft: 9 }}>
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
                </Cards>
        </div>
    );
}

export default Card;