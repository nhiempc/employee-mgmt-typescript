import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import useStyles, { InputLabelProps } from './styles';
import { PhotoCamera } from '@mui/icons-material';

const EmployeeInfoTab = () => {
    const { classes } = useStyles();

    const [emInfo, setEmInfo] = useState({ status: 1, photoUrl: '' });

    const handleChangeEmployeeInfo = () => {
        setEmInfo({ ...emInfo, status: 1 });
    };

    const handleChangeAvatar = () => {};
    return (
        <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Tên nhân viên'
                            variant='outlined'
                            size='small'
                            name='fullName'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Mã nhân viên'
                            variant='outlined'
                            size='small'
                            name='code'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Giới tính'
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            size='small'
                            value={''}
                            name='gender'
                            onChange={handleChangeEmployeeInfo}
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value={''}>Chọn giới tính</option>
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='dateOfBirth'
                            type='date'
                            fullWidth
                            label='Ngày sinh'
                            variant='outlined'
                            size='small'
                            InputLabelProps={InputLabelProps}
                            name='dateOfBirth'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Số điện thoại'
                            variant='outlined'
                            size='small'
                            type='tel'
                            name='phone'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Email'
                            variant='outlined'
                            size='small'
                            name='email'
                            type='email'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Số CMND/CCCD'
                            variant='outlined'
                            size='small'
                            name='citizenId'
                            type='number'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Nhóm'
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            size='small'
                            value={''}
                            name='teamId'
                            onChange={handleChangeEmployeeInfo}
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value={''}>Chọn nhóm</option>
                            <option value={1}>Front-end</option>
                            <option value={2}>Back-end</option>
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Địa chỉ'
                            variant='outlined'
                            size='small'
                            name='address'
                            value={''}
                            onChange={handleChangeEmployeeInfo}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} style={{ paddingTop: 0 }}>
                {emInfo.photoUrl === '' && (
                    <>
                        <div className={classes.noImageContainer}>
                            <IconButton
                                className={classes.noImageBox}
                                aria-label='upload picture'
                                component='label'
                            >
                                <input
                                    hidden
                                    accept='image/*'
                                    type='file'
                                    name='photoUrl'
                                    onChange={handleChangeAvatar}
                                />
                                <CameraAltOutlinedIcon
                                    className={classes.noImageBox}
                                />
                            </IconButton>
                        </div>
                        <Typography
                            variant='body1'
                            textAlign={'center'}
                            sx={{ pt: 2 }}
                        >
                            Chọn ảnh đại diện
                        </Typography>
                    </>
                )}
                {emInfo.photoUrl && (
                    <>
                        <div className={classes.imageContainer}>
                            <img
                                style={{
                                    width: '100%',
                                    border: '1px solid black'
                                }}
                                src={emInfo.photoUrl}
                                alt='Avatar'
                                className={classes.avatar}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                textAlign: 'center'
                            }}
                        >
                            <IconButton
                                color='primary'
                                aria-label='upload picture'
                                component='label'
                            >
                                <input
                                    hidden
                                    accept='image/*'
                                    type='file'
                                    name='photoUrl'
                                    onChange={handleChangeAvatar}
                                />
                                <PhotoCamera />
                            </IconButton>
                        </div>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default EmployeeInfoTab;
