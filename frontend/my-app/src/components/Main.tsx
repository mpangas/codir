import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPic from '../image/study.png'

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
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 58, fontFamily: 'Open Sans', color: "#028299"}}>TAKE YOUR SKILLS IN <br /> THE RIGHT DIRECTION</Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Open Sans', marginLeft: 1, fontSize: 19, color: "black" }}>Explore and expand your technical skills browsing video
            tutorials <br /> created by professors and renowned industry members.</Typography>
        </Stack>
        <img src={StudyPic} id="studyImg"></img>
      </Stack>
    </div>
  );
}

export default Main;