import React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import { margin } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Card(props: { title: string, user: string, score: number, idNum: string }) {
    const [score, setScore] = useState<number>(props.score);
    const [like, setLike] = useState(false);
    const [dislike, setdislike] = useState(false);
    const tutorialID = props.idNum;
    const username = props.user;
    const [favorite, setFavorite] = useState(false);
    const navigate = useNavigate();

    const handleIncrement = useCallback(async () => {
        if (like) {
            const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/down`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            localStorage.setItem(`like_${props.idNum}`, `${false}`);
            setLike(false);
            setScore(score - 1);
            return;
        }
        if (dislike) {
            const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/up`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            const response1 = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/up`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            localStorage.setItem(`like_${props.idNum}`, `${true}`);
            localStorage.setItem(`dislike_${props.idNum}`, `${false}`);
            setLike(true);
            setdislike(false);
            setScore(score + 2);
            return;
        }
        const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/up`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        localStorage.setItem(`like_${props.idNum}`, `${true}`);
        localStorage.setItem(`dislike_${props.idNum}`, `${false}`);
        setLike(true);
        setdislike(false);
        setScore(score + 1);
    }, [props.idNum, score, setLike, setdislike]);

    const handleDecrement = useCallback(async () => {
        if (dislike) {
            const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/up`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            localStorage.setItem(`dislike_${props.idNum}`, `${false}`);
            setdislike(false);
            setScore(score + 1);
            return;
        }
        if (like) {
            const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/down`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            const response1 = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/down`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
            localStorage.setItem(`dislike_${props.idNum}`, `${true}`);
            localStorage.setItem(`like_${props.idNum}`, `${false}`);
            setdislike(true);
            setLike(false);
            setScore(score - 2);
            return;
        }
        console.log("what is the state: " + dislike);
        const response = await fetch(`http://localhost:8000/api/tutorials/id:${props.idNum}/down`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        localStorage.setItem(`like_${props.idNum}`, `${false}`);
        localStorage.setItem(`dislike_${props.idNum}`, `${true}`);
        setdislike(true);
        setLike(false);
        setScore(score - 1);
    }, [props.idNum, score, setLike, setdislike]);

    const handleFavorite = async () => {
        console.log(props.user);
        const response = await fetch('http://localhost:8000/api/favorites/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tutorialID
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            navigate("/dashboard");
        } else {
            console.log(data.message);
        }
        setFavorite(true);
    }

    useEffect(() => {
        const likeValue = localStorage.getItem(`like_${props.idNum}`);
        const dislikeValue = localStorage.getItem(`dislike_${props.idNum}`);
        console.log("Like state " + likeValue);
        console.log("Dislike state " + dislikeValue);
        if (likeValue) {
            setLike(JSON.parse(likeValue));
        }
        if (dislikeValue) {
            setdislike(JSON.parse(dislikeValue));
        }
        setScore(props.score);
    }, [props.idNum, props.score, setLike, setdislike]);

    return (
        <div className="Card">
            <Cards sx={{ width: 315, height: 260, marginTop: 6, color: 'black', mx: 5, borderRadius: 5, boxShadow: '0px 2.75px 2.75px rgba(0, 0, 0, .75)' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 26 }}>
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: "center", fontSize: 15 }}>
                        {props.user}
                    </Typography>
                </CardContent>
                <CardMedia sx={{ display: 'flex', float: "left" }}>
                    <IconButton sx={{ marginLeft: 0.5, marginTop: 14.5 }} onClick={handleFavorite}>{favorite ? <FavoriteIcon sx={{ color: 'red' }}></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}</IconButton>
                </CardMedia>
                <CardMedia sx={{ display: 'flex', float: "right", marginTop: 15 }}>
                    <IconButton sx={{
                        marginRight: 0.3,
                        transition: 'transform 0.1s linear',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }} onClick={handleIncrement} >{like ? <ThumbUpIcon sx={{ color: 'black' }} /> : <ThumbUpOffAltIcon />}</IconButton >
                    <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 1, marginRight: 0.5 }}>{score}</Typography>
                    <IconButton sx={{
                        marginRight: 0.5,
                        transition: 'transform 0.1s linear',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }} onClick={handleDecrement} > {dislike ? <ThumbDownIcon sx={{ color: 'black' }} /> : <ThumbDownOffAltOutlinedIcon />}</IconButton>
                </CardMedia>
            </Cards>
        </div >
    );
}

export default Card;

