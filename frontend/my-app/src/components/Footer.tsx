import React from 'react';
import github from './image/github.png';
function Footer() {
    return (
        <div className="footer">
            <div className="horz"></div>
            <a href="https://github.com/mpangas/codir" target="_blank">
                <img src={github} id="git"></img>
            </a>
            {/*<div className="git"></div>*/}
        </div>
      );
}

export default Footer;