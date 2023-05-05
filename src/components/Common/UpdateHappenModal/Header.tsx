import {
    Box,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    Typography
} from '@mui/material';
// styles
import useStyles, { InputProps } from './styles';
import { GENDER, TEAM } from '../../../common';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { employeeApi } from '../../../services';
import { IEmployee, initEmployee } from '../../../models/IEmployee';

type IProps = {
    employeeId: number;
};

const Header: React.FunctionComponent<IProps> = ({ employeeId }) => {
    const { classes } = useStyles();

    const [employee, setEmployee] = useState<IEmployee>(initEmployee);

    const { employeeInfo } = employee;

    useEffect(() => {
        employeeApi.getEmployeeById(employeeId).then((respone) => {
            if (respone) {
                setEmployee(respone.data);
            }
        });
    }, [employeeId]);

    return (
        <Grid container spacing={2} paddingLeft={'16px'}>
            <Grid
                item
                xs={4}
                paddingRight={'16px'}
                border={'1px solid #d0d0d0'}
                borderTop={'0px'}
            >
                {!employeeInfo.photoUrl && (
                    <CardMedia
                        image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                        sx={{
                            width: '100%',
                            paddingBottom: '100%',
                            borderRadius: '50%'
                        }}
                    />
                )}

                {employeeInfo.photoUrl && (
                    <CardMedia
                        image={employeeInfo.photoUrl}
                        sx={{
                            width: '100%',
                            paddingBottom: '100%',
                            borderRadius: '50%',
                            border: '1px solid #d0d0d0'
                        }}
                    />
                )}
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                        textAlign={'center'}
                    >
                        {employeeInfo.fullName
                            ? employeeInfo.fullName
                            : 'Không có tên'}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        textAlign={'center'}
                    >
                        {TEAM[employeeInfo.teamId] ?? 'Không có team'}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid
                item
                xs={8}
                style={{
                    paddingTop: 0
                }}
            >
                <Box
                    component={'div'}
                    sx={{
                        height: '100%',
                        border: '1px solid #d0d0d0',
                        borderTop: '0px'
                    }}
                >
                    <Typography
                        className={classes.basicInfoTitle}
                        variant='body1'
                        component='div'
                    >
                        Thông tin cơ bản
                    </Typography>
                    <Grid container spacing={2} className={classes.infoWrapper}>
                        <Grid item xs={5} className={classes.infoItem}>
                            <Typography variant='body2'>Họ và tên</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.fullName
                                        ? employeeInfo.fullName
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography variant='body2'>
                                Mã nhân viên
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.code
                                        ? employeeInfo.code
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={4} className={classes.infoItem}>
                            <Typography variant='body2'>
                                Số điện thoại
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.phone
                                        ? employeeInfo.phone
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={5} className={classes.infoItem}>
                            <Typography variant='body2'>Email</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.email
                                        ? employeeInfo.email
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={3} className={classes.infoItem}>
                            <Typography variant='body2'>Giới tính</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    GENDER[employeeInfo.gender] ??
                                    'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={4} className={classes.infoItem}>
                            <Typography variant='body2'>Ngày sinh</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.dateOfBirth
                                        ? moment(
                                              employeeInfo.dateOfBirth
                                          ).format('DD/MM/YYYY')
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>

                        <Grid item xs={5} className={classes.infoItem}>
                            <Typography variant='body2'>Số CCCD</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.citizenId
                                        ? employeeInfo.citizenId
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={7} className={classes.infoItem}>
                            <Typography variant='body2'>Vị trí</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.registerPosition
                                        ? employeeInfo.registerPosition
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.infoItem}>
                            <Typography variant='body2'>Địa chỉ</Typography>
                            <TextField
                                fullWidth
                                disabled
                                inputProps={InputProps}
                                variant='outlined'
                                value={
                                    employeeInfo.address
                                        ? employeeInfo.address
                                        : 'Không có dữ liệu'
                                }
                                size='small'
                            ></TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
