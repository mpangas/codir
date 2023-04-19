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

   // const [languages, setLanguage] = useState("All Languages");
   // const [technologies, setTechnology] = useState("All Technologies");
    // const [skillLevel, setDifficulty] = useState("All Skill Levels");
    // const [styles, setLearningStyle] = useState("All Learning Styles");

    const [language, setoption] = useState<string[]>([]);
    const [technologie, setoption2] = useState<string[]>([]);
    const [style, setoption3] = useState<string[]>([]);
    const [skillLeve, setoption4] = useState<string[]>([]);

    useEffect(() => {
        if (props.username === "" || props.username === undefined) {
            navigate("/login");
        }
    }, [props.username, navigate]);

    const handleSubmit = async () => {
        const username = props.username;
        console.log(username);
        var skillLevel = skillLeve.join(",");
        var languages = language.join(",");
        var technologies = technologie.join(",");
        var styles = style.join(",");
        const response = await fetch('http://localhost:8000/api/preferences', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                skillLevel,
                languages,
                technologies,
                styles,
            }),
        });
        const data = await response.json();
        setoption([]);
        setoption2([]);
        setoption3([]);
        setoption4([])
    };

    const handleDifficultyChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff4 = event.target.value as string[];

        if (newstuff4.length < skillLeve.length) {
            const remove4 = skillLeve.find((value) => !newstuff4.includes(value))!;
            setoption4(skillLeve.filter((value) => value !== remove4));
        } else {
            const newthing4 = newstuff4.find((value) => !skillLeve.includes(value))!;
            setoption4([...skillLeve, newthing4]);
        }
    };

    const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff = event.target.value as string[];
        if (newstuff.length < language.length) {
            const remove = language.find((value) => !newstuff.includes(value))!;
            setoption(language.filter((value) => value !== remove));
        } else {
            const newthing = newstuff.find((value) => !language.includes(value))!;
            setoption([...language, newthing]);
        }

    };
    const handleTechnologyChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff2 = event.target.value as string[];

        if (newstuff2.length < technologie.length) {
            const remove2 = technologie.find((value) => !newstuff2.includes(value))!;
            setoption2(technologie.filter((value) => value !== remove2));
        } else {
            const newthing2 = newstuff2.find((value) => !technologie.includes(value))!;
            setoption2([...technologie, newthing2]);
        }
    };
    const handleLearningStyleChange = (event: SelectChangeEvent<string[]>) => {
        const newstuff3 = event.target.value as string[];

        if (newstuff3.length < style.length) {
            const remove3 = style.find((value) => !newstuff3.includes(value))!;
            setoption3(style.filter((value) => value !== remove3));
        } else {
            const newthing3 = newstuff3.find((value) => !style.includes(value))!;
            setoption3([...style, newthing3]);
        }
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
                sx={{ flexDirection: 'column' }}
            >
                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 35, }}>
                    Search Preferences
                </Typography>

                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", fontSize: 16, marginTop: 5 }}>
                    Welcome to the preferences section! Please select your following preferences/options to best match your learning interests! Click submit to proceed to the Dashboard.
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
                            value={language}
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
                            value={technologie}
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
                    <FormControl sx={{ minHeight: 110, minWidth: 180, }}>
                        <InputLabel id="prog-style">Learning Styles</InputLabel>
                        <Select
                            labelId="prog-style"
                            multiple
                            value={style}
                            onChange={handleLearningStyleChange}
                            renderValue={(selected) => selected.join(', ')}
                        >

                            {['Text Tutorials', 'Video Tutorials', 'Interactive Tutorials'].map((options3) => (
                                <MenuItem key={options3} value={options3}>
                                    {options3}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{
                flex: 5,
                transform: 'translateX(-50%)',
                display: 'flex',
                position: 'absolute',
                top: '62%',
                left: '50%',
                justifyContent: 'center', zIndex: 1
            }}>
                <FormControl sx={{ minHeight: 110, minWidth: 180, }}>
                        <InputLabel id="prog-diff">Skill Levels</InputLabel>
                        <Select
                            labelId="prog-diff"
                            multiple
                            value={skillLeve}
                            onChange={handleDifficultyChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {['Beginner', 'Intermediate', 'Advanced'].map((options4) => (
                                <MenuItem key={options4} value={options4}>
                                    {options4}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
            </Box>



            <Box
                height="105vh"
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {/*<Link to="/dashboard" style={{ textDecoration: "none" }}>*/}
                <Button variant="contained" sx={{
                    backgroundColor: "#0097b2",
                    '&:hover': {
                        backgroundColor: "#028299",
                    },
                    width: 150
                }} onClick={handleSubmit}>
                    SUBMIT
                </Button>{/*</Link>*/}

            </Box>

        </Container>


    );
}
export default Preferences;
