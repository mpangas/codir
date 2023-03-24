import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = (props: {username: string}) => {
    /*const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }*/
    return (
        <div className="main">
          <div className="rectangle">
            <p id="bigText">TAKE YOUR SKILLS IN THE RIGHT DIRECTION</p>
            <p id="smallText">Explore and expand your technical skills browsing video tutorials created by professors and renowned industry members.</p>
          </div>
          <div id="studyImg"></div>
        </div>
      );
}

export default Main;