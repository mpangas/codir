import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

/*let response: any = null;
                for (var i = 0; i < tutorialIDArray.length; i++) {
                        console.log("List of ids: " + tutorialIDArray[i]);
                        response = await fetch(`http://localhost:8000/api/tutorials/${tutorialIDArray[i]}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    })
                }
                const data = await response.json();
                setTutorialArray(data);*/

const Dashboard = (props: { username: string }) => {
    const [tutorialIDArray, setTutorialIDArray] = useState([]);
    const [tutorialArray, setTutorialArray] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/favorites', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response.json();
                // Extract tutorialIDs from data
                const tutorialIds = data.map((item: { tutorialID: string; }) =>
                    item.tutorialID);
                setTutorialIDArray(tutorialIds);
            }
        )();
    }, [props.username]);

    useEffect(() => {
        (
            async () => {

                const responses = await Promise.all(tutorialIDArray.map(async (id) => {
                    const response = await fetch(`http://localhost:8000/api/tutorials/id:${id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const data = await response.json();
                    return data;
                }));

                const tutorialData = responses.reduce((acc, cur) => {
                    return [...acc, cur];
                }, []);

                setTutorialArray(tutorialData);

            }
        )();
    }, [props.username, tutorialIDArray]);

    useEffect(() => {
        (
            async () => {
                const response2 = await fetch('http://localhost:8000/api/tutorials/recommend', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response2.json();
                setRecommendation(data);
            }
        )();
    }, [props.username]);

    /*const cardData = [
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
        {title: "TITLE12", author: "Author12", likes: "111"},
        {title: "TITLE13", author: "Author13", likes: "112"},
        {title: "TITLE14", author: "Author14", likes: "113"},
        {title: "TITLE15", author: "Author15", likes: "114"},
    ];*/
    const cardList = tutorialArray.map((item: { title: string, location: string, score: number, id: string }) => {
        return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} key={item.id} />
    })
    const recomList = recommendation.map((item: { title: string, location: string, score: number, id: string }) => {
        return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} key={item.id} />
    })

    return (
        <div className="dashboard">
            <br></br>
            <h1 id="dashboardTitle" className="uniform">DASHBOARD</h1>
            <h1 id="welcome">Welcome, {props.username} !</h1>
            <h2 className="uniform">Favorites</h2>
            <div className="uniform" id="horizontal"></div>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex' }}>
                {tutorialArray.length > 0 ? cardList : 
                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 23, marginTop: 18, marginBottom: 15 }}>
                    Go to <a href="/browse">Browse</a> to add favorites!
                </Typography>}
            </Grid>
            <h2 className="uniform">Recommendations</h2>
            <div className="uniform" id="horizontal"></div>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex' }}>
                {recomList}
            </Grid>
        </div>
    )
}

export default Dashboard