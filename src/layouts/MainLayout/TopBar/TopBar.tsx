import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

type IProps = {
    handleToogleDrawer: () => void;
    isDrawer: boolean;
};

export default function TopBar({ isDrawer, handleToogleDrawer }: IProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
                    position: 'relative',
                    transition: 'all 0.5s'
                }}
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        onClick={handleToogleDrawer}
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Quản lý nhân viên
                    </Typography>

                    <div>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                                My account
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
