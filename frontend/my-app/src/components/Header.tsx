import React from 'react';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import LogoPic from '../image/CodirLogo.png';
import { ListItemIcon, ListItemText, MenuList } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props: { username: string, setUsername: (username: string) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let textLogin = "Login";
  const handleClick1 = () => {
    textLogin = "Login is clicked";
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
      <div className="header-menu">
        <div className="buttons">
          <Button
            sx={{
              textTransform: "none",
              alignItems: "center",
              height: "40px",
              width: "95px",
              backgroundColor: "#E4E4E4",
              color: "black",
              '&:hover': {
                backgroundColor: "#D3D3D3",
              },
            }}
            variant="contained"
            className="auth-btn"
            href="/login"
            onClick={handleClick1}
            >
            LOG IN
          </Button>
          <Button
            sx={{
              textTransform: "none",
              marginLeft: "30px",
              alignItems: "center",
              height: "40px",
              width: "95px",
              backgroundColor: "#0097b2",
              '&:hover': {
                backgroundColor: "#028299",
              },
            }}
            variant="contained"
            className="auth-btn"
            href="/signup">
            SIGN UP
          </Button>
        </div>
      </div>
    )
  } else {
    menu = (
      <div className="header-menu">
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            fontWeight: "500",
            backgroundColor: "transparent",
            fontSize: "16px",
            height: "40px",
            "&:hover": {
              color: "#0097b2",
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
              textDecoration: "none",
            },
            "&:after": {
              position: 'absolute',
              content: '""',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0097b2',
              transformOrigin: 'bottom right',
              transition: 'transform 0.30s ease-out',
            },
            "&:hover:after": {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
            marginRight: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="nav-btn"
          href="/test"
        >TEST</Button>
        <Button
          data-testid="dashboardBut"
          sx={{
            textTransform: "none",
            color: "black",
            fontWeight: "500",
            backgroundColor: "transparent",
            fontSize: "16px",
            height: "40px",
            "&:hover": {
              color: "#0097b2",
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
              textDecoration: "none",
            },
            "&:after": {
              position: 'absolute',
              content: '""',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0097b2',
              transformOrigin: 'bottom right',
              transition: 'transform 0.30s ease-out',
            },
            "&:hover:after": {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
            marginRight: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="nav-btn"
          href="/dashboard"
        >DASHBOARD</Button>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            fontWeight: "500",
            backgroundColor: "transparent",
            fontSize: "16px",
            height: "40px",
            "&:hover": {
              color: "#0097b2",
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
              textDecoration: "none",
            },
            "&:after": {
              position: 'absolute',
              content: '""',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0097b2',
              transformOrigin: 'bottom right',
              transition: 'transform 0.30s ease-out',
            },
            "&:hover:after": {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
            marginRight: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="nav-btn"
          href="/browse"
        >BROWSE</Button>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            fontWeight: "500",
            backgroundColor: "transparent",
            fontSize: "16px",
            height: "40px",
            "&:hover": {
              color: "#0097b2",
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
              textDecoration: "none",
            },
            "&:after": {
              position: 'absolute',
              content: '""',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0097b2',
              transformOrigin: 'bottom right',
              transition: 'transform 0.30s ease-out',
            },
            "&:hover:after": {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
            marginRight: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="nav-btn"
          href="/about"
        >ABOUT US</Button>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            fontWeight: "500",
            backgroundColor: "transparent",
            fontSize: "16px",
            height: "40px",
            "&:hover": {
              color: "#0097b2",
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
              textDecoration: "none",
            },
            "&:after": {
              position: 'absolute',
              content: '""',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: '#0097b2',
              transformOrigin: 'bottom right',
              transition: 'transform 0.30s ease-out',
            },
            "&:hover:after": {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
            marginRight: "20px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          className="nav-btn"
          href="/preferences"
        >PREFERENCES</Button>
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="">
              <IconButton onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                <Avatar sx={{ width: 47, height: 47, bgcolor: '#0097b2' }}>
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
            disableScrollLock={true}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 175,
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
                  right: 25,
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
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <Person2Icon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem id="logout" href="/login" onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </React.Fragment>
      </div>
    )
  }
  return (
    <div className="header">
      <div className="header-container">
        <a data-testid="headerLogo" id="headerLink" href="/"><img id="logo" data-testid="logoPicture" src={LogoPic}></img></a>
      </div>
      {menu}
    </div>
  );
}

export default Header;