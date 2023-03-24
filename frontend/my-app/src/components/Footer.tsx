import React from 'react';
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
                <GitHub  sx={{ width: "49px", height: "49px", color:"black", marginTop:1}}/>
            </a>
            </Grid>
            <div className="horz" id="secondLine"></div>
        </div>
    );
}

export default Footer;