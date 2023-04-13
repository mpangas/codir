import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Box,
} from '@mui/material';
import Card from '../components/Card';

const FormFields = ({
    Title,
    setTitle,
    Location,
    setLocation,
    User,
    setUser,
}: {
    Title: string,
    setTitle: (title: string) => void,
    Location: string,
    setLocation: (location: string) => void,
    User: string,
    setUser: (user: string) => void,
}) => {
    return (
        <FormControl sx={{}}>
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="Title"
                value={Title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="Location"
                value={Location}
                onChange={e => setLocation(e.target.value)}
            />
            <TextField
                sx={{ mt: 4 }}
                className="input-box"
                label="User"
                value={User}
                onChange={e => setUser(e.target.value)}
            />
        </FormControl>
    );
};

const Testing = (props: { username: string }) => {
    const [open, setOpen] = useState(false);
    
    const [Title, setTitle] = useState('');
    const [Location, setLocation] = useState('');
    const [User, setUser] = useState('');
    
    const [error, setError] = useState("");

    const [tutorialList, settutorialList] = useState([]);

    const titleRegex = /^.{0,18}$/;
    const locRegex = /^.{0,18}$/;
    const userRegex = /^.{0,18}$/;
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    const handleClose = () => {
        setOpen(false);
        
        setTitle("");
        setLocation("");
        setUser("");

        setError("");
    };

    const handleSubmit = async () => {
        if(Title === '' || Title === undefined) {
            setError("You must enter a title.");
            return;
        }
        else if(Location === '' || Location === undefined) {
            setError("You must enter a location.");
            return;
        }
        else if(User === '' || User === undefined) {
            setError("You must enter a user.");
            return;
        }

        if(!titleRegex.test(Title)) {
            setError("Title should have a maximum of 18 characters.");
            return;
        }
        else if(!locRegex.test(Location)) {
            setError("Location should have a maximum of 18 characters.");
            return;
        }
        else if(!userRegex.test(User)) {
            setError("User should have a maximum of 18 characters.");
            return;
        }

        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Title,
                Location,
                User,
            }),
        });

        const data = await response.json();
        console.log(JSON.stringify(data));
        setOpen(false);
        
        setTitle("");
        setLocation("");
        setUser("");

        setError("");
    };

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/tutorials', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response.json();
                settutorialList(data);
            }
        )();
    }, [props.username]);

    const cardList = tutorialList.map((item: { title: string,  user: string, score: number, id: string }) => {
        return <Card title={item.title} user={item.user} score={item.score} idNum={item.id}/>
    })

    return (
        <div>
            <h1 className="test">TEST</h1>
            <Box
                display="flex"
                justifyContent="center"
                minHeight="60vh"
                alignItems="flex-start"
                paddingTop={5}
            >
                <Button variant="contained" sx={{
                    mt: 4,
                }} onClick={() => setOpen(true)}>
                    Create a Review
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit a Tutorial Review</DialogTitle>
                <DialogContent>
                    <FormFields
                        Title={Title}
                        setTitle={setTitle}
                        Location={Location}
                        setLocation={setLocation}
                        User={User}
                        setUser={setUser}
                    />
                </DialogContent>
                <div className="tutorialErrorMsg">
                    {error}
                </div>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="cardsList">
                {cardList}
            </div>
        </div>
    );
};

export default Testing;