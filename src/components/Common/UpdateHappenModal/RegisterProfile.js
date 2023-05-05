import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Button,
    Collapse,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import ListTemplate from '../ListTemplate';
import { headerRegisterProfile } from '../../../common';
// styles
import useStyles, { InputProps } from './styles';

const RegisterProfile = () => {
    const { classes } = useStyles();

    const [openRegisterProfile, setOpenRegisterProfile] = useState(false);

    const handleClickRegisterProfile = () => {
        setOpenRegisterProfile(!openRegisterProfile);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <List
                    sx={{
                        width: '100%',
                        paddingTop: '16px',
                        paddingBottom: 0
                    }}
                >
                    <ListItemButton
                        onClick={handleClickRegisterProfile}
                        className={classes.listHeader}
                    >
                        <ListItemText primary='Đăng ký hồ sơ' />
                        {openRegisterProfile ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openRegisterProfile}
                        timeout='auto'
                        unmountOnExit
                    >
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                width: '100%',
                                margin: '0 auto',
                                paddingRight: '16px'
                            }}
                        >
                            <Grid item xs={3} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Tên hồ sơ{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    value={''}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={3} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ngày đăng ký{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    type='date'
                                    inputProps={InputProps}
                                    variant='outlined'
                                    value={''}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={6} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ghi chú{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    value={''}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={6} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Nội dung{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    value={''}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                className={classes.actionBtnGroup}
                            >
                                <Button variant='contained'>Thêm</Button>
                                <Button variant='contained' color='error'>
                                    Nhập lại
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ width: '100%', padding: '16px' }}>
                            <ListTemplate
                                maxHeight={250}
                                headerData={headerRegisterProfile}
                            />
                        </Grid>
                    </Collapse>
                </List>
            </Grid>
        </Grid>
    );
};

export default RegisterProfile;
