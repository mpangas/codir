import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '../components/Card';


const Dashboard = (props: {username: string}) => {
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    const cardData = [
        {title: "TITLE1", author: "Author1", likes: "100"},
        {title: "TITLE2", author: "Author2", likes: "101"},
        {title: "TITLE3", author: "Author3", likes: "102"},
        {title: "TITLE4", author: "Author4", likes: "103"},
        {title: "TITLE5", author: "Author5", likes: "104"},
        {title: "TITLE6", author: "Author6", likes: "105"},
        {title: "TITLE7", author: "Author7", likes: "106"},
        {title: "TITLE8", author: "Author8", likes: "107"},
        {title: "TITLE9", author: "Author9", likes: "108"},
        {title: "TITLE10", author: "Author10", likes: "109"},
        {title: "TITLE11", author: "Author11", likes: "110"},
    ];
    const cardList = cardData.map(cardData => {
        return <Card title={cardData.title} author={cardData.author} likes={cardData.likes}/>
    })
    return (
        <div className="dashboard">
            <br></br>
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1> 
            <h2 className="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
            <div className="cardsList">
                {cardList}
            </div>
        </div>
    )
}

export default Dashboard