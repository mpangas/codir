import React from 'react';
import github from '../image/github.png';
import { GitHub } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

function Footer() {
    return (
        <div className="footer">
            <div className="horz" id="firstLine"></div>
            <Grid container 
            direction="column" 
            alignItems="center" 
            justifyContent="center"
            >
            <a href="https://github.com/mpangas/codir" target="_blank">
                <GitHub  sx={{ width: "47px", height: "47px", color:"black"}}/>
            </a>
            </Grid>
            <div className="horz" id="secondLine"></div>
        </div>
    );
}

export default Footer;