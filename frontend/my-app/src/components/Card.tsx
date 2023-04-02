import React from 'react';
import { useEffect, useState } from 'react'
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { IconButton } from '@mui/material';
import { margin } from '@mui/system';

function Card(props: any) {
    const [scores, setScores] = useState(props.score);

    const handleIncrement = () => {
        setScores(scores + 1);
    }

    const handleDecrement = () => {
        setScores(scores - 1);
    }

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
                     <CardMedia sx={{display: 'flex', float: "right", marginTop: 15}}>
                        <IconButton sx={{marginRight: 0.5}} onClick={handleIncrement}><ThumbUpAltOutlinedIcon></ThumbUpAltOutlinedIcon></IconButton>
                        <Typography gutterBottom variant="h5" component="div" sx={{marginTop: 1, marginRight: 0.5}}>{scores}</Typography>
                        <IconButton onClick={handleDecrement}><ThumbDownAltOutlinedIcon></ThumbDownAltOutlinedIcon></IconButton>
                     </CardMedia>
                </Cards>
        </div>
    );
}

export default Card;