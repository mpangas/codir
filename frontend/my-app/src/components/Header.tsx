import React from 'react';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { fontStyle, fontWeight } from '@mui/system';
import LogoPic from '../image/CODIRLOGOUPDATEDUPDATED.png'

const Header = (props: { username: string, setUsername: (username: string) => void }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        props.setUsername("");
    }
    let menu;
    if (props.username === "" || props.username === undefined) {
        menu = (
            <div className="cred">
                <Button sx={{ textTransform: "none" }} id="login" href="/login">LOGIN</Button>
                <Button sx={{ textTransform: "none" }} id="signup" href="/signup">SIGN UP</Button>
            </div>
        )
    } else {
        menu = (
            <div className="cred">
                <Button 
                sx={{ textTransform: "none", 
                color: "black", 
                fontWeight: "bold"
                }}
                id="dashboardB"
                href="/dashboard"
                >Dashboard</Button>
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Tooltip title="Account Settings">
                        <IconButton onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <Avatar sx={{ width: 47, height: 47, bgcolor: deepOrange[500] }}>
                              {props.username.substring(0, 1).toUpperCase()}
                            </Avatar>
                          </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                        <MenuItem onClick={handleClose}>
                            <Avatar sx={{ fontSize: "15px" }}/> Profile
                        </MenuItem>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <MenuItem id="logout" href="/login" onClick={logout}>
                                Logout
                            </MenuItem>
                        </Box>
                    </Menu>
                </React.Fragment>
            </div>
        )
    }
    return (
        <div className="header">
            {/*<a id="headerLink" href="/"><h1 id="logo">CODIR</h1></a>*/}
            <a id="headerLink" href="/"><img id="logo" src={LogoPic}></img></a>
            {menu}
        </div>
    );
}

export default Header;