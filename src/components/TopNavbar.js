import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import navLogo from '../resources/logos/nav-logo-transparent.png'
import Fab from '@mui/material/Fab';
import { IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Link } from 'react-router-dom';


export const TopNavbar = () => {

    return (
    <div style={{ paddingTop: 64 }}>
    <Box sx={{ flexGrow: 1, }}>
        <AppBar 
            position="fixed"
            sx={{ bgcolor: "#b19cd9",}}>

        <Toolbar>

    <Link to="closet">
        <IconButton>
            <Box
                component="img"
                sx={{ height: 40, margin: -1 }}
                alt="nav logo"
                src={navLogo}
            />
        </IconButton>
    </Link>
            
            <Typography
                align='center'
                variant="h6" 
                component="div"
                fontFamily="helvetica-bold"
                sx={{ flexGrow: 1, }}>
            "USER" CLOSET
            </Typography>

            <Fab
                component={Link} to="/add-item"
                style={{ color: "white", backgroundColor: "#9cc4d9" }}
                variant="contained"
                size="small"
                aria-label="add">
                <AddAPhotoIcon />
            </Fab>


        </Toolbar>
        </AppBar>
    </Box>
    </div>
    );
}
