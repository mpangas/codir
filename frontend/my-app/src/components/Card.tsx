import React from 'react';
import { useEffect, useState } from 'react'
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import { margin } from '@mui/system';

function Card(props: any) {
    const [score, setScore] = useState<number>(props.score);
    const [like, setLike] = useState(false);
    const [dislike, setdislike] = useState(false);

    const handleIncrement = async () => {
        const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/up`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const data = await response.json();
        setLike(true);
        setdislike(false);
        setScore(score + 1);
    }

    const handleDecrement = async () => {
        const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/down`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const data = await response.json();
        setLike(false);
        setdislike(true);
        setScore(score - 1);
    }

    useEffect(() => {
        setScore(props.score);
      }, [props.score]);

    /*useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/favorites', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response.json();

                console.log("Specific Details " + JSON.stringify(data));

                if (Array.isArray(data)) {
                    const numOfScore = data.map((item: { tutorialID: string; }) =>
                        item.tutorialID);
                    setScores(numOfScore);
                }
            }
        )();
    }, [props.idNum]);*/

    return (
        <div className="Card">
            <Cards sx={{ width: 315, height: 260, marginTop: 3, marginLeft: 15 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 30 }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center", fontSize: 15 }}>
                        {props.user}
                    </Typography>
                </CardContent>
                <CardMedia sx={{ display: 'flex', float: "right", marginTop: 15 }}>
                    <IconButton sx={{ marginRight: 0.5 }} onClick={handleIncrement} >{like ? <ThumbUpIcon sx={{ color: 'black' }} /> : <ThumbUpIcon sx={{ color: 'gray'}}/>}</IconButton>
                    <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 1, marginRight: 0.5 }}>{score}</Typography>
                    <IconButton onClick={handleDecrement}>{dislike ? <ThumbDownIcon sx={{ color: 'black' }} /> : <ThumbDownIcon sx={{ color: 'gray' }}/>}</IconButton>
                </CardMedia>
            </Cards>
        </div>
    );
}

export default Card;