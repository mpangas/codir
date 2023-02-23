import React from 'react';
import github from '../image/github.png';
import { GitHub } from '@mui/icons-material';
function Footer() {
    return (
        <div className="footer">
            <div className="horz"></div>
            <a href="https://github.com/mpangas/codir" target="_blank">
                <GitHub />
            </a>
        </div>
    );
}

export default Footer;