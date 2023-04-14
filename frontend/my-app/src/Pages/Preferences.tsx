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
    Checkbox,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilterButton from '../components/FilterButton';
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

};

const Preferences = (props: { username: string }) => {
    // Submit Tutorial
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [Title, setTitle] = useState('');
    const [Location, setLocation] = useState('');
    const [User, setUser] = useState('');
    const [error, setError] = useState("");

    const titleRegex = /^.{0,18}$/;
    const locRegex = /^.{0,18}$/;
    const userRegex = /^.{0,18}$/;

    useEffect(() => {
        if (props.username === "" || props.username === undefined) {
            navigate("/login");
        }
    }, [props.username, navigate]);

    const handleClose = () => {
        setOpen(false);

        setTitle("");
        setLocation("");
        setUser("");

        setError("");
    };

    // Filters
    const [language, setLanguage] = useState("All Languages");
    const [technology, setTechnology] = useState("All Technologies");
    const [difficulty, setDifficulty] = useState("All Skill Levels");
    const [learningStyle, setLearningStyle] = useState("All Learning Styles");

    const [langs, setoption] = useState<string[]>([]);
    const [tools, setoption2] = useState<string[]>([]);

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };
    const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff = event.target.value as string[];
        if (newstuff.length < langs.length) {
            const remove = langs.find((value) => !newstuff.includes(value))!;
            setoption(langs.filter((value) => value !== remove));
        } else {
            const newthing = newstuff.find((value) => !langs.includes(value))!;
            setoption([...langs, newthing]);
        }

    };
    const handleTechnologyChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff2 = event.target.value as string[];

        if (newstuff2.length < tools.length) {
            const remove2 = tools.find((value) => !newstuff2.includes(value))!;
            setoption2(tools.filter((value) => value !== remove2));
        } else {
            const newthing2 = newstuff2.find((value) => !tools.includes(value))!;
            setoption2([...tools, newthing2]);
        }
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
                sx={{ flexDirection: 'column' }}
            >
                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 35, }}>
                    Search Preferences
                </Typography>

                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 16, marginTop: 5 }}>
                    Welcome to the preferences section! Please select your following preferences/options to best match your learning interests!
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', ml: '5%', my: 2, width: 200, justifyContent: 'center' }}>
                <Box sx={{
                    flex: 5,
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    position: 'absolute',
                    top: '32%',
                    left: '50%',
                    justifyContent: 'center', zIndex: 1
                }}>
                    <FormControl sx={{ minHeight: 110, minWidth: 180, }}>
                        <InputLabel id="langs">Programming Languages</InputLabel>
                        <Select
                            labelId="langs"
                            multiple
                            value={langs}
                            onChange={handleLanguageChange}
                            renderValue={(selected) => selected.join(', ')}
                        >

                            {['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA',].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    flex: 5,
                    position: 'absolute',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    top: '42%',
                    left: '50%',
                    justifyContent: 'center', zIndex: 1
                }}>
                    <FormControl sx={{ minHeight: 110, minWidth: 180, }}>
                        <InputLabel id="prog-tech">Technologies</InputLabel>
                        <Select
                            labelId="prog-tech"
                            multiple
                            value={tools}
                            onChange={handleTechnologyChange}
                            renderValue={(selected) => selected.join(', ')}
                        >

                            {['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn'].map((options2) => (
                                <MenuItem key={options2} value={options2}>
                                    {options2}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    flex: 5,
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    position: 'absolute',
                    top: '52%',
                    left: '50%',
                    justifyContent: 'center', zIndex: 1
                }}>
                    <FilterButton
                        defaultOption="All Learning Styles"
                        options={['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials']}
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                    />
                </Box>
            </Box>

            <Box sx={{
                flex: 5,
                transform: 'translateX(-50%)',
                display: 'flex',
                position: 'absolute',
                top: '60%',
                left: '50%',
                justifyContent: 'center', zIndex: 1
            }}>
                <FilterButton
                    defaultOption="All Skill Levels"
                    options={['Beginner', 'Intermediate', 'Advanced']}
                    value={difficulty}
                    onChange={handleDifficultyChange}
                />
            </Box>



            <Box
                height="90vh"
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <Button variant="contained" sx={{
                        backgroundColor: "#0097b2",
                        '&:hover': {
                            backgroundColor: "#028299",
                        },
                        width: 150
                    }} onClick={() => setOpen(true)}>
                        SUBMIT
                    </Button></Link>

            </Box>

        </Container>


    );
}
export default Preferences;
