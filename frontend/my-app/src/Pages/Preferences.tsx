import {
    Button,
    Typography,
    FormControl,
    Box,
    Container,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Preferences = (props: { username: string }) => {
    const navigate = useNavigate();

    const [language, setoption] = useState<string[]>([]);
    const [technologiesOp, setoption2] = useState<string[]>([]);
    const [style, setoption3] = useState<string[]>([]);
    const [skillLevelOp, setoption4] = useState('');

    useEffect(() => {
        if (props.username === "" || props.username === undefined) {
            navigate("/login");
        }
    }, [props.username, navigate]);

    const handleSubmit = async () => {
        const username = props.username;
        console.log(username);
        var skillLevel = skillLevelOp;
        var languages = language.join(",");
        var technologies = technologiesOp.join(",");
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
        setoption4('');
    };

    const handleDifficultyChange = (event: SelectChangeEvent) => {
        setoption4(event.target.value as string);
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

        if (newstuff2.length < technologiesOp.length) {
            const remove2 = technologiesOp.find((value) => !newstuff2.includes(value))!;
            setoption2(technologiesOp.filter((value) => value !== remove2));
        } else {
            const newthing2 = newstuff2.find((value) => !technologiesOp.includes(value))!;
            setoption2([...technologiesOp, newthing2]);
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
                    Personal Preferences
                </Typography>

                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center',  fontSize: 16, marginTop: 5 }}>
                    Welcome to the preferences section! Here you can select tutorial preferences so we can effectively help you achieve your learning goals!
                </Typography>

                <FormControl sx={{ minWidth: 250, mt: 5 }}>
                    <InputLabel id="langs-label">Programming Languages</InputLabel>
                    <Select
                        labelId="langs-label"
                        id="langs"
                        multiple
                        value={language}
                        label="Programming Languages"
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

                <FormControl sx={{ minWidth: 250, mt: 3 }}>
                    <InputLabel id="prog-tech">Technologies</InputLabel>
                    <Select
                        labelId="prog-tech"
                        multiple
                        value={technologiesOp}
                        label="Technologies"
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

                <FormControl sx={{ minWidth: 250, mt: 3 }}>
                    <InputLabel id="prog-style">Learning Styles</InputLabel>
                    <Select
                        labelId="prog-style"
                        multiple
                        label="Learning Styles"
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

                <FormControl sx={{ minWidth: 250, mt: 3 }}>
                    <InputLabel id="prog-diff">Skill Levels</InputLabel>
                    <Select
                        labelId="prog-diff"
                        label="Skill Levels"
                        value={skillLevelOp}
                        onChange={handleDifficultyChange}
                    >
                        {['Beginner', 'Intermediate', 'Advanced'].map((options4) => (
                            <MenuItem key={options4} value={options4}>
                                {options4}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/*<Link to="/dashboard" style={{ textDecoration: "none" }}>*/}
                <Button variant="contained" sx={{
                    backgroundColor: "#0097b2",
                    '&:hover': {
                        backgroundColor: "#028299",
                    },
                    width: 150,
                    mt: 5
                }} onClick={handleSubmit}>
                    SUBMIT
                </Button>{/*</Link>*/}
            </Box>
        </Container>


    );
}
export default Preferences;
