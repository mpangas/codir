import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AboutUs = (props: {username: string}) => {
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    return (
        <div className="aboutus">
            <br></br>
            <h1 id="largeText" >About Us</h1>
            <h2 id="tinyText" >Codir is a platform for discovering and sharing coding tutorials from around the web. It aims to create a one-stop destination for developers to find high-quality, relevant tutorials for a wide range of programming languages, libraries, frameworks, and other technologies.</h2>  
            <h2 id="madebyText" >Created by:</h2>
            <h2 id="madebyText2" >Pranet Allu</h2>
            <h2 id="madebyText3" >Mike Pangas</h2>
            <h2 id="madebyText4" >Tyler Berndt </h2>
            <h2 id="madebyText5" >Ansh Kalariya</h2>
          </div>
      );
}

export default AboutUs;