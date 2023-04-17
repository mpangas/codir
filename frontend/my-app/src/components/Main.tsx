import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPic from '../image/study.png'
import { textAlign, width } from '@mui/system';
import { green } from '@mui/material/colors';
import Transparent from '../image/transparent.png';
import Preferences from '../image/preferences.png';
import Browsing from '../image/browsing.png';
import Filter from '../image/filter.png';
import Recommendation from '../image/recommendation.png';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Main = (props: { username: string }) => {
  /*const navigate = useNavigate();
  if (props.username === "" || props.username === undefined) {
      navigate("/login");
  }*/
  return (
    <div className="main">
      {/*<div className="rectangle">
            <p id="bigText">TAKE YOUR SKILLS IN THE RIGHT DIRECTION</p>
            <p id="smallText">Explore and expand your technical skills browsing video tutorials created by professors and renowned industry members.</p>
    </div>*/}
      <Stack direction="row" justifyContent="center">
        <Stack direction="column" marginRight={6} marginTop={7}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 58, fontFamily: 'Open Sans', color: "#028299" }}>TAKE YOUR SKILLS IN <br /> THE RIGHT DIRECTION</Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Open Sans', marginLeft: 1, fontSize: 19, color: "black" }}>Explore and expand your technical skills browsing video
            tutorials <br /> created by professors and renowned industry members.</Typography>
        </Stack>
        <img src={StudyPic} id="studyImg"></img>
      </Stack>
      <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center', marginTop: 8, fontSize: 22 }}>Get introduced and learn modern developer tools, frameworks, programming languages
        <br /> through our top-rated tutorials</Typography>
      <Box sx={{ display: "flex", marginLeft: 2 }}>
        <img src={Transparent} id="transparentImg"></img>
      </Box>
      <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center', marginTop: 6, fontSize: 22 }}>We guarantee the best user experience with effective learning techniques!</Typography>
      <Stack direction="row">

        <Cards sx={{ width: 315, height: 260, marginTop: 5, color: 'black', mx: 5, borderRadius: 5, boxShadow: '0px 2.75px 2.75px rgba(0, 0, 0, .75)',  transition: 'transform .4s ease-in', '&:hover': {transform: 'scale(1.2)', cursor: 'pointer', }, }}>
          <CardContent>
          <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'center', fontSize: 22 }}> 
          Choosing your preferences </Typography>
          </CardContent>
          <CardMedia>
            <img src={Preferences} id="preferences"></img>
          </CardMedia>
        </Cards>
        <Cards sx={{ width: 315, height: 260, marginTop: 5, color: 'black', mx: 5, borderRadius: 5, boxShadow: '0px 2.75px 2.75px rgba(0, 0, 0, .75)', transition: 'transform .4s ease-in', '&:hover': {transform: 'scale(1.2)', cursor: 'pointer', } }}>
          <CardContent sx={{textAlign: "center"}}>
          <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'center', fontSize: 22 }}> 
          Browsing through Tutorials </Typography>
          </CardContent>
          <CardMedia>
            <img src={Browsing} id="browsing"></img>
          </CardMedia>
        </Cards>
        
        <Cards sx={{ width: 315, height: 260, marginTop: 5, color: 'black', mx: 5, borderRadius: 5, boxShadow: '0px 2.75px 2.75px rgba(0, 0, 0, .75)', transition: 'transform .4s ease-in', '&:hover': {transform: 'scale(1.2)', cursor: 'pointer', } }}>
          <CardContent sx={{textAlign: "center"}}>
          <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'center', fontSize: 22, marginBottom: -1 }}> 
          Getting Tutorial Recommendations </Typography>
          </CardContent>
          <CardMedia>
            <img src={Recommendation} id="recommendations"></img>
          </CardMedia>
        </Cards>

        <Cards sx={{ width: 315, height: 260, marginTop: 5, color: 'black', mx: 5, borderRadius: 5, boxShadow: '0px 2.75px 2.75px rgba(0, 0, 0, .75)', transition: 'transform .4s ease-in', '&:hover': {transform: 'scale(1.2)', cursor: 'pointer', } }}>
          <CardContent sx={{textAlign: "center"}}>
          <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'center', fontSize: 22 }}> 
          Filtering tutorials </Typography>
          </CardContent>
          <CardMedia>
            <img src={Filter} id="filtering"></img>
          </CardMedia>
        </Cards>
      </Stack>
    </div>
  );
}

export default Main;