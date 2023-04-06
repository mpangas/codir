import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Box,
    Container,
    DialogContentText,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const Browse = (props: { username: string }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [Title, setTitle] = useState('');
    const [Location, setLocation] = useState('');
    const [User, setUser] = useState('');

    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
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
    };

    return (
        <Container maxWidth={false} sx={{
            minHeight: "60vh",
        }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="3%"
                marginX={10}
            >
                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 35, }}>
                    Browse Tutorials
                </Typography>
                <Button variant="contained" sx={{
                    ml: 'auto',
                    backgroundColor: "#0097b2",
                    '&:hover': {
                        backgroundColor: "#028299",
                    },
                }} onClick={() => setOpen(true)}>
                    SUBMIT TUTORIAL
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 20, textAlign: 'center' }}>Submit a Tutorial</DialogTitle>
                <DialogContent>
                    <DialogContentText>Find a great tutorial? Enter the details below!</DialogContentText>
                    <FormFields
                        Title={Title}
                        setTitle={setTitle}
                        Location={Location}
                        setLocation={setLocation}
                        User={User}
                        setUser={setUser}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                        color: "#0097b2",
                    }}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{
                        backgroundColor: "#0097b2",
                        '&:hover': {
                            backgroundColor: "#028299",
                        },
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
export default Browse;
