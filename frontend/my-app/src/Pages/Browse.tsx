import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Browse = (props: {username: string}) => {
    const navigate = useNavigate();
    if (props.username === "" || props.username === undefined) {
        navigate("/login");
    }
    return (
        <div className="browse">
            <br></br>
            <h1 id="largelargeText" >Browse</h1>
            <h1 id="searchtut" >Search your favorite tutorials!</h1>
            <form className="box">
            <input
                type="text"
                placeholder="Search"
                className="input"
            />
            <button type="submit" className="button">Go</button>
            </form>
            <h1 id="results" >Results: </h1>
            <h1 id="java" >- Full Java tutorial for Beginners! </h1>
            <h1 id="cplusplus" >- Full C++ tutorial for Beginners! </h1>
            <h1 id="python" >- Full Python tutorial for Beginners! </h1>
            <h1 id="htmlcss" >- Full HTML/CSS tutorial for Beginners! </h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
      );
}
export default Browse;
