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
    CircularProgress
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
    Language,
    setTutLanguage,
    Technology,
    setTutTechnology,
    DeliveryMethod,
    setTutDeliveryMethod,
    Difficulty,
    setTutDifficulty,
}: {
    Title: string,
    setTitle: (title: string) => void,
    Location: string,
    setLocation: (location: string) => void,
    Language: string,
    setTutLanguage: (language: string) => void,
    Technology: string,
    setTutTechnology: (technology: string) => void,
    DeliveryMethod: string,
    setTutDeliveryMethod: (deliveryMethod: string) => void,
    Difficulty: string,
    setTutDifficulty: (difficulty: string) => void,
}) => {
    return (
        <FormControl sx={{}}>
            <TextField
                data-testid="titleInput"
                sx={{ mt: 3 }}
                className="input-box"
                label="Title"
                value={Title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{ style: { backgroundColor: 'white' } }}
            />
            <TextField
                data-testid="locationInput"
                sx={{ mt: 3 }}
                className="input-box"
                label="URL"
                value={Location}
                onChange={e => setLocation(e.target.value)}
                inputProps={{ style: { backgroundColor: 'white' } }}
            />
            <FilterButton
                defaultOption='Select the programming language'
                options={['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA']}
                value={Language}
                onChange={setTutLanguage}
                sx={{ mt: 3, width: '100%' }}
                size="medium"
                defaultDisabled={true}
            />
            <FilterButton
                defaultOption='Select the technology'
                options={['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn']}
                value={Technology}
                onChange={setTutTechnology}
                sx={{ mt: 3, width: '100%' }}
                size="medium"
                defaultDisabled={true}
            />
            <FilterButton
                defaultOption='Select the delivery method'
                options={['Text', 'Video', 'Interactive']}
                value={DeliveryMethod}
                onChange={setTutDeliveryMethod}
                sx={{ mt: 3, width: '100%' }}
                size="medium"
                defaultDisabled={true}
            />
            <FilterButton
                defaultOption='Select the difficulty'
                options={['Beginner', 'Intermediate', 'Experienced']}
                value={Difficulty}
                onChange={setTutDifficulty}
                sx={{ mt: 3, width: '100%' }}
                size="medium"
                defaultDisabled={true}
            />
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
    const [tutLanguage, setTutLanguage] = useState('Select the programming language');
    const [tutTechnology, setTutTechnology] = useState('Select the technology');
    const [tutDeliveryMethod, setTutDeliveryMethod] = useState('Select the delivery method');
    const [tutDifficulty, setTutDifficulty] = useState('Select the difficulty');

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
        setTutLanguage("Select the programming language");
        setTutTechnology("Select the technology");
        setTutDeliveryMethod("Select the delivery method");
        setTutDifficulty("Select the difficulty");

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

        var attributes = {
            skillLevel: tutDifficulty,
            language: tutLanguage,
            technology: tutTechnology,
            style: tutDeliveryMethod,
        };

        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Title,
                Location,
                attributes
            }),
        });

        const data = await response.json();
        setOpen(false);
        setTitle("");
        setLocation("");
        setTutLanguage("Select the programming language");
        setTutTechnology("Select the technology");
        setTutDeliveryMethod("Select the delivery method");
        setTutDifficulty("Select the difficulty");
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
    const [tutorials, setTutorials] = useState<
        {
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
        }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTutorials = async () => {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/api/tutorials', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const data = await response.json();

        setTutorials(data.map((tutorial: any) => ({
            id: tutorial.id,
            title: tutorial.title,
            location: tutorial.location,
            score: tutorial.score,
            attributes: {
                skillLevel: '',
                language: '',
                technology: '',
                style: '',
            },
        })));
    }

    async function fetchAttributes(id: string) {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/tutorials/attributes/id:${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        const data = await response.json();
        const { skillLevel, language, technology, style } = data;
        return { skillLevel, language, technology, style };
    }

    const [filteredTutorials, setFilteredTutorials] = useState<
        {
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
        }[]
    >(tutorials);

    useEffect(() => {
        const fetchFilteredTutorials = async () => {
            setIsLoading(true);
            getTutorials();
            const filteredAttributes = {
                skillLevel: difficulty !== "All Skill Levels" ? difficulty : "",
                language: language !== "All Languages" ? language : "",
                technology: technology !== "All Technologies" ? technology : "",
                style: learningStyle !== "All Learning Styles" ? learningStyle : "",
            };

            const tutorialsWithAttributes = await Promise.all(
                tutorials.map(async (tutorial: { id: string, title: string, location: string, score: number }) => {
                    const attributes = await fetchAttributes(tutorial.id);
                    return {
                        ...tutorial,
                        attributes,
                    };
                })
            );

            const filteredTutorials = tutorialsWithAttributes.filter((tutorial) =>
                Object.keys(filteredAttributes).every((key) => {
                    if (!filteredAttributes[key as keyof typeof filteredAttributes]) {
                        return true;
                    }
                    return tutorial.attributes[key as keyof typeof filteredAttributes] === filteredAttributes[key as keyof typeof filteredAttributes];
                })
            );

            setFilteredTutorials(filteredTutorials);
            setIsLoading(false);
        };

        fetchFilteredTutorials();
    }, [language, technology, difficulty, learningStyle]);

    const [tutorialCards, setTutorialCards] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        let newCards = filteredTutorials.map((item: { id: string, title: string, location: string, score: number }) => {
            return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} />;
        });
        if (newCards.length === 0 && language === "All Languages" && technology === "All Technologies" && difficulty === "All Skill Levels" && learningStyle === "All Learning Styles") {
            newCards = tutorials.map((item: { id: string, title: string, location: string, score: number }) => {
                return <Card title={item.title} location={item.location} score={item.score} idNum={item.id} />;
            });
        }
        setTutorialCards(newCards);
        setIsLoading(false)
    }, [tutorials, filteredTutorials]);

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
                        Language={tutLanguage}
                        setTutLanguage={setTutLanguage}
                        Technology={tutTechnology}
                        setTutTechnology={setTutTechnology}
                        DeliveryMethod={tutDeliveryMethod}
                        setTutDeliveryMethod={setTutDeliveryMethod}
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
            <Box sx={{ display: 'flex', ml: 10.25, my: 1, width: 200 }}>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" sx={{ display: 'flex', fontSize: 18, whiteSpace: 'nowrap', mr: 2 }}>
                        Filter By:
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption='All Languages'
                        options={['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA']}
                        value={language}
                        onChange={handleLanguageChange}
                        sx={{ m: 1, width: 180, }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Technologies"
                        options={['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn']}
                        value={technology}
                        onChange={handleTechnologyChange}
                        sx={{ m: 1, width: 180, }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Skill Levels"
                        options={['Beginner', 'Intermediate', 'Advanced']}
                        value={difficulty}
                        onChange={handleDifficultyChange}
                        sx={{ m: 1, width: 180, }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FilterButton
                        defaultOption="All Learning Styles"
                        options={['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials']}
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                        sx={{ m: 1, width: 180, }}
                    />
                </Box>
            </Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" padding="0" paddingTop="100px">
                    <CircularProgress />
                </Box>
            ) : tutorialCards.length || (language == "All Languages" && technology == "All Technologies" && difficulty == "All Skill Levels" && learningStyle == "All Learning Styles") ? (
                <Grid container spacing={2} sx={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                    {tutorialCards}
                </Grid>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
                    <Typography variant="h5" color="textSecondary">
                        No results match your filters.
                    </Typography>
                </Box>
            )}


        </Container>
    );
}
export default Browse;
