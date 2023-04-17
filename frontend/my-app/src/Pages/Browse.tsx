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
    Grid,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilterButton from '../components/FilterButton';
import Card from '../components/Card';

const FormFields = ({
    Title,
    setTitle,
    Location,
    setLocation,
    Difficulty,
    setTutDifficulty,
}: {
    Title: string,
    setTitle: (title: string) => void,
    Location: string,
    setLocation: (location: string) => void,
    Difficulty: string,
    setTutDifficulty: (difficulty: string) => void,
}) => {
    return (
        <FormControl sx={{}}>
            <TextField
                data-testid="titleInput"
                sx={{ mt: 4 }}
                className="input-box"
                label="Title"
                value={Title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                data-testid="locationInput"
                sx={{ mt: 4 }}
                className="input-box"
                label="Location"
                value={Location}
                onChange={e => setLocation(e.target.value)}
            />
            <Select
                id="level"
                sx={{ mt: 4 }}
                value={Difficulty}
                onChange={(e) => setTutDifficulty(e.target.value)}
            >
                <MenuItem disabled value="Select a difficulty">Select a difficulty</MenuItem>
                <MenuItem value={'Beginner'}>Beginner</MenuItem>
                <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                <MenuItem value={'Experienced'}>Experienced</MenuItem>
            </Select>
        </FormControl>
    );
};

const Browse = (props: { username: string }) => {
    // Submit Tutorial
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [Title, setTitle] = useState('');
    const [Location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [tutDifficulty, setTutDifficulty] = useState('Select a difficulty');

    const titleRegex = /^.{0,18}$/;
    const locRegex = /^.{0,18}$/;

    useEffect(() => {
        if (props.username === "" || props.username === undefined) {
            navigate("/login");
        }
    }, [props.username, navigate]);

    const handleClose = () => {
        setOpen(false);

        setTitle("");
        setLocation("");
        setTutDifficulty("Select a difficulty");

        setError("");
    };

    const handleSubmit = async () => {
        if (Title === '' || Title === undefined) {
            setError("You must enter a title.");
            return;
        }
        else if (Location === '' || Location === undefined) {
            setError("You must enter a location.");
            return;
        }

        if (!titleRegex.test(Title)) {
            setError("Title should have a maximum of 18 characters.");
            return;
        }
        else if (!locRegex.test(Location)) {
            setError("Location should have a maximum of 18 characters.");
            return;
        }

        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Title,
                Location,
            }),
        });

        const data = await response.json();
        setOpen(false);

        setTitle("");
        setLocation("");

        setError("");
    };

    // Filters
    const [language, setLanguage] = useState("All Languages");
    const [technology, setTechnology] = useState("All Technologies");
    const [difficulty, setDifficulty] = useState("All Skill Levels");
    const [learningStyle, setLearningStyle] = useState("All Learning Styles");

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };
    const handleLanguageChange = (value: string) => {
        setLanguage(value);
    };
    const handleTechnologyChange = (value: string) => {
        setTechnology(value);
    };
    const handleLearningStyleChange = (value: string) => {
        setLearningStyle(value);
    };

    // Tutorials
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/tutorials', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const data = await response.json();

                const tutorialData = data.map((item: { title: string, user: string, score: number, }) =>
                    item);
                setTutorials(tutorialData);
            }
        )();
    }, [props.username]);

    const tutorialCards = tutorials.map((item: { id: string, title: string, user: string, score: number }) => {
        return <Card title={item.title} user={item.user} score={item.score} idNum={item.id} />
    })

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
                <Button data-testid="submitTut" variant="contained" sx={{
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
                        Difficulty={tutDifficulty}
                        setTutDifficulty={setTutDifficulty}
                    />
                </DialogContent>
                <div className="tutorialErrorMsg">
                    {error}
                </div>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                        color: "#0097b2",
                    }}>Cancel</Button>
                    <Button data-testid="submitBut" onClick={handleSubmit} variant="contained" sx={{
                        backgroundColor: "#0097b2",
                        '&:hover': {
                            backgroundColor: "#028299",
                        },
                    }}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ display: 'flex', ml: '5%', my: 2, width: 200 }}>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption='All Languages'
                        options={['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA']}
                        value={language}
                        onChange={handleLanguageChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Technologies"
                        options={['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn']}
                        value={technology}
                        onChange={handleTechnologyChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Skill Levels"
                        options={['Beginner', 'Intermediate', 'Advanced']}
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Learning Styles"
                        options={['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials']}
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                    />
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                {tutorialCards}
            </Grid>
        </Container>
    );
}
export default Browse;
