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
        <Container sx={{ paddingTop: "3%" }}>
            <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 35 }}>
                Browse Tutorials
            </Typography>
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
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
export default Browse;
