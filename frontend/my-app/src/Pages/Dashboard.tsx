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
interface Tutorial {
    id: string;
    title: string;
    location: string;
    score: number;
    attributes: {
        skillLevel: string;
        language: string;
        technology: string;
        style: string;
    };
}

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


    const cardList = tutorialArray.map((item: Tutorial) => {
        return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} attributes={item.attributes} />;
    });
    const recomList = recommendation.map((item: Tutorial ) => {
        return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} attributes={item.attributes} />;
    });

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
            <br></br>
            <h2 className="uniform">Recommendations</h2>
            <div className="uniform" id="horizontal"></div>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex' }}>
                {recomList}
            </Grid>
        </div>
    )
}

export default Dashboard