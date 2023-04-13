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

    const [proglang, setoption] = useState<string[]>([]);
    const [techtools, setoption2] = useState<string[]>([]);

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value);
    };
    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const options = event.target.name;
        setoption((prev) => {
            if (!prev.includes(options)) {
                return [...prev, options];
            } else {
                return prev.filter((lang) => lang !== options);
            }
        });
    };
    const handleTechnologyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const options2 = event.target.name;
        setoption2((prev2) => {
            if (!prev2.includes(options2)) {
                return [...prev2, options2];
            } else {
                return prev2.filter((tech) => tech !== options2);
            }
        });
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
            <Box sx={{ flex: 1, justifyContent: 'center' }}>
            <FormGroup>
            {['Assembly', 'Bash/Shell', 'C', 'C#', 'C++', 'COBOL', 'Dart', 'Elixir', 'F#', 'Fortran', 'Go', 'Groovy', 'Haskell', 'HTML/CSS', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'SQL', 'Swift', 'TypeScript', 'VBA'].map((options) => (
            <FormControlLabel
            key={options}
            control={<Checkbox checked={proglang.includes(options)} onChange={handleLanguageChange} name={options} />}
            label={options}
            />
            ))}
            </FormGroup>
        </Box>
                <Box sx={{ flex: 1, justifyContent: 'center' }}>
                <FormGroup>
                {['.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', 'Blazor', 'Cloud Computing', 'CouchDB', 'Django', 'Docker', 'DynamoDB', 'Express', 'FastAPI', 'Flask', 'Flutter', 'Git', 'GitHub', 'GitLab', 'Homebrew', 'jQuery', 'Kubernetes', 'Laravel', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'npm', 'NumPy', 'Nuxt.js', 'Oracle', 'Pandas', 'PostgreSQL', 'PyTorch', 'Qt', 'React Native', 'React.js', 'Redis', 'Ruby on Rails', 'SQLite', 'Spring', 'Svelte', 'Terraform', 'TensorFlow', 'Unity 3D', 'Unreal Engine', 'Vue.js', 'Yarn'].map((options2) => (
                    <FormControlLabel
                    key={options2}
                    control={<Checkbox checked={techtools.includes(options2)} onChange={handleTechnologyChange} name={options2} />}
                    label={options2}
            />
            ))}
            </FormGroup>
                </Box>
                <Box sx={{ flex: 5, position: 'absolute', top: 232, left: 350, display: 'flex', justifyContent: "center", }}>
                    <FilterButton
                        defaultOption="All Learning Styles"
                        options={['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials']}
                        value={learningStyle}
                        onChange={handleLearningStyleChange}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: "center", position: 'absolute', top: 232, left: 625 }}>
                    <FilterButton
                        defaultOption="All Skill Levels"
                        options={['Beginner', 'Intermediate', 'Advanced']}
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    />
                </Box>
            
        </Container>
    );
}
export default Preferences;
