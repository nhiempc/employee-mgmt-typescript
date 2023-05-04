import { PhotoCamera } from '@mui/icons-material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { Grid, IconButton, Typography } from '@mui/material';
import { FastField, Form } from 'formik';
import React from 'react';
import { genderOptions, groupOptions } from '../../../common';
import { IEmployeeInfo } from '../../../models/IEmployee';
import InputField from '../CustomFields/InputField/InputField';
import InputMediaField from '../CustomFields/InputMediaField/InputMediaField';
import SelectField from '../CustomFields/SelectField/SelectField';
import useStyles, { InputLabelProps } from './styles';

type IProps = {
    employeeInfo: IEmployeeInfo;
    errors: any;
};

const EmployeeInfoTab: React.FunctionComponent<IProps> = ({
    employeeInfo,
    errors
}) => {
    const { classes } = useStyles();

    return (
        <Form>
            <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.fullName ? true : false}
                                helperText={errors.fullName}
                                name='fullName'
                                component={InputField}
                                label='Tên nhân viên'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.fullName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FastField
                                error={errors.code ? true : false}
                                helperText={errors.code}
                                name='code'
                                component={InputField}
                                label='Mã nhân viên'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.code}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.gender ? true : false}
                                helperText={errors.gender}
                                name='gender'
                                fullWidth={true}
                                options={genderOptions}
                                component={SelectField}
                                label='Giới tính'
                                variant='outlined'
                                select={true}
                                SelectProps={{ native: true }}
                                InputLabelProps={InputLabelProps}
                                size='small'
                                value={employeeInfo.gender}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.dateOfBirth ? true : false}
                                helperText={errors.dateOfBirth}
                                name='dateOfBirth'
                                component={InputField}
                                label='Ngày sinh'
                                type='date'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.dateOfBirth}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.phone ? true : false}
                                helperText={errors.phone}
                                name='phone'
                                component={InputField}
                                label='Số điện thoại'
                                type='tel'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.phone}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.email ? true : false}
                                helperText={errors.email}
                                name='email'
                                component={InputField}
                                label='Email'
                                type='email'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.email}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.citizenId ? true : false}
                                helperText={errors.citizenId}
                                name='citizenId'
                                component={InputField}
                                label='Số CMND/CCCD'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.citizenId}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FastField
                                error={errors.teamId ? true : false}
                                helperText={errors.teamId}
                                name='teamId'
                                fullWidth={true}
                                options={groupOptions}
                                component={SelectField}
                                label='Nhóm'
                                variant='outlined'
                                select={true}
                                SelectProps={{ native: true }}
                                InputLabelProps={InputLabelProps}
                                size='small'
                                value={employeeInfo.teamId}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid item xs={12}>
                            <FastField
                                error={errors.address ? true : false}
                                helperText={errors.address}
                                name='address'
                                component={InputField}
                                label='Địa chỉ'
                                fullWidth={true}
                                InputLabelProps={InputLabelProps}
                                variant='outlined'
                                size='small'
                                value={employeeInfo.address}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} style={{ paddingTop: 0 }}>
                    {employeeInfo.photoUrl === '' && (
                        <>
                            <div className={classes.noImageContainer}>
                                <IconButton
                                    className={classes.noImageBox}
                                    aria-label='upload picture'
                                    component='label'
                                >
                                    <FastField
                                        component={InputMediaField}
                                        hidden={true}
                                        accept='image/*'
                                        type='file'
                                        name='photoUrl'
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
                    {employeeInfo.photoUrl && (
                        <>
                            <div className={classes.imageContainer}>
                                <img
                                    style={{
                                        width: '100%',
                                        border: '1px solid black'
                                    }}
                                    src={employeeInfo.photoUrl.toString()}
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
                                    <FastField
                                        component={InputMediaField}
                                        hidden={true}
                                        accept='image/*'
                                        type='file'
                                        name='photoUrl'
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </div>
                        </>
                    )}
                </Grid>
            </Grid>
        </Form>
    );
};

export default EmployeeInfoTab;
