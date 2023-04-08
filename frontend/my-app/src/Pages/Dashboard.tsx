import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

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
                    console.log("List of ids: " + id);
                    const response = await fetch(`http://localhost:8000/api/tutorials/id:${id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    const data = await response.json();
                    console.log(JSON.stringify(data));
                    return data;
                }));

                const tutorialData = responses.reduce((acc, cur) => {
                    return [...acc, cur];
                }, []);

                setTutorialArray(tutorialData);
            
            }
        )();
    }, [props.username, tutorialIDArray]);
 
    console.log("IDS: " + tutorialIDArray);
    console.log("TutorialProperties: " + JSON.stringify(tutorialArray));
    console.log("Length: " + tutorialArray.length);
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
    const cardList = tutorialArray.map((item: { title: string,  user: string, score: number, id: number }) => {
        return <Card title={item.title} user={item.user} score={item.score} idNum={item.id}/>
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