import {
    FormControl,
    FormLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
// styles
import { Call } from '@mui/icons-material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CakeIcon from '@mui/icons-material/Cake';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EmailIcon from '@mui/icons-material/Email';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Box } from '@mui/system';
import moment from 'moment';
import { IEmployee } from '../../../models/IEmployee';
import { ICV, IWorkExperience, initCV } from '../../../models/ICV';
import useStyles, { InputLabelProps, InputProps } from './styles';
import { isEmptyObject } from '../../../helpers/common';
import { useAppDispatch } from '../../../reduxSaga/hooks';
import { formActions } from '../../../reduxSaga/slices/form.slice';

type IProps = {
    employeeData: IEmployee;
};

const Profile: React.FunctionComponent<IProps> = ({ employeeData }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const src = 'https://i.ibb.co/44RBHzs/avatar1.jpg';

    const initWork = {
        company: '',
        position: '',
        detail: '',
        startDate: '',
        endDate: ''
    };

    const { employeeInfo } = employeeData;

    const [workList, setWorkList] = useState<IWorkExperience[]>([initWork]);
    const [errorsWork, setErrorsWork] = useState<any>({});
    const [errorsCV, setErrorsCV] = useState<any>({});
    const [cvData, setcvData] = useState<ICV>({
        ...initCV,
        workExperiences: [initWork]
    });
    const [isValid, setIsValid] = useState<boolean>(false);

    const handlechangeWork = (event: any, index: number) => {
        const { name, value } = event.target;
        if (!value) {
            setErrorsWork({ ...errorsWork, [name]: 'Không được để trống' });
        } else {
            const { [name]: x, ...newObject } = errorsWork;
            setErrorsWork(newObject);
        }
        const updatedArray = [
            ...workList.slice(0, index),
            {
                ...workList[index],
                [name]: value
            },
            ...workList.slice(index + 1)
        ];
        setWorkList(updatedArray);
        setcvData({ ...cvData, workExperiences: updatedArray });
    };

    const handleChangeCV = (event: any) => {
        const { name, value } = event.target;
        if (!value) {
            setErrorsCV({ ...errorsCV, [name]: 'Không được để trống' });
        } else {
            const { [name]: x, ...newObject } = errorsCV;
            setErrorsCV(newObject);
        }
        setcvData({ ...cvData, [name]: value });
    };

    const handleAddWork = () => {
        setWorkList([...workList, initWork]);
        setcvData({
            ...cvData,
            workExperiences: [...cvData.workExperiences, initWork]
        });
    };

    useEffect(() => {
        if (isEmptyObject(errorsWork) && isEmptyObject(errorsCV)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [errorsWork, errorsCV]);

    useEffect(() => {
        if (isValid) {
            dispatch(formActions.addCV(cvData));
        }
    }, [isValid, cvData, dispatch]);

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%' }}>
                <Grid container className={classes.cvWrapper}>
                    {' '}
                    {employeeInfo && (
                        <Grid item xs={4} className={classes.leftWrapper}>
                            <Box className={classes.imageContainer}>
                                {employeeInfo.photoUrl && (
                                    <img
                                        src={employeeInfo.photoUrl}
                                        alt='Avatar'
                                        className={classes.avatar}
                                    />
                                )}
                                {!employeeInfo.photoUrl && (
                                    <img
                                        src={src}
                                        alt='Avatar'
                                        className={classes.avatar}
                                    />
                                )}
                            </Box>
                            <Box className={classes.header}>
                                <Typography variant='h5'>
                                    {employeeInfo.fullName ?? ''}
                                </Typography>
                                <Typography
                                    variant='h6'
                                    className={classes.position}
                                >
                                    {employeeInfo.teamId === 1
                                        ? 'Front-end'
                                        : 'Back-end'}
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfo}>
                                <Typography
                                    variant='body1'
                                    className={classes.titleInfo}
                                >
                                    Thông tin cơ bản
                                </Typography>
                                <Box className={classes.basicInfoItem}>
                                    <CakeIcon />
                                    <Typography variant='body2'>
                                        {moment(
                                            employeeInfo.dateOfBirth
                                        ).format('DD/MM/YYYY') ===
                                        'Invalid date'
                                            ? moment().format('DD/MM/YYYY')
                                            : moment(
                                                  employeeInfo.dateOfBirth
                                              ).format('DD/MM/YYYY')}
                                    </Typography>
                                </Box>
                                <Box className={classes.basicInfoItem}>
                                    <TransgenderIcon />
                                    <Typography variant='body2'>
                                        {employeeInfo.gender === 1
                                            ? 'Nam'
                                            : 'Nữ'}
                                    </Typography>
                                </Box>
                                <Box className={classes.basicInfoItem}>
                                    <LocationOnIcon />
                                    <Typography variant='body2'>
                                        {employeeInfo.address ??
                                            'Không có địa chỉ'}
                                    </Typography>
                                </Box>
                                <Box className={classes.basicInfoItem}>
                                    <Call />
                                    <Typography variant='body2'>
                                        {employeeInfo.phone ??
                                            'Không có số điện thoại'}
                                    </Typography>
                                </Box>
                                <Box className={classes.basicInfoItem}>
                                    <EmailIcon />
                                    <Typography variant='body2'>
                                        {employeeInfo.email ?? 'Không có email'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                    <Grid item xs={8} className={classes.rightWrapper}>
                        <Box className={classes.careerGoalWrapper}>
                            <Box
                                className={classes.titleWrapper}
                                style={{ justifyContent: 'flex-start' }}
                            >
                                <CrisisAlertIcon fontSize='large' />
                                <Typography
                                    variant='subtitle1'
                                    className={classes.careerGoalTitle}
                                >
                                    Mục tiêu nghề nghiệp
                                </Typography>
                            </Box>
                            <TextField
                                error={errorsCV['careerGoal'] ? true : false}
                                helperText={errorsCV['careerGoal']}
                                InputLabelProps={InputLabelProps}
                                fullWidth
                                InputProps={InputProps}
                                spellCheck={false}
                                id='careerGoal'
                                name='careerGoal'
                                label='Mục tiêu nghề nghiệp'
                                multiline
                                placeholder='Mục tiêu nghề nghiệp'
                                variant='standard'
                                value={cvData.careerGoal ?? ''}
                                onChange={handleChangeCV}
                            />
                        </Box>

                        <Box>
                            <Box className={classes.titleWrapper}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <BusinessCenterIcon fontSize='large' />
                                    <Typography
                                        variant='subtitle1'
                                        className={classes.workExperiencesTitle}
                                    >
                                        Kinh nghiệm làm việc
                                    </Typography>
                                </Box>
                                <ControlPointIcon
                                    fontSize='large'
                                    onClick={handleAddWork}
                                    sx={{
                                        alignSelf: 'flex-end',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                            {cvData.workExperiences.map((work, index) => (
                                <Box className={classes.workItem} key={index}>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.timeWrapper}
                                        >
                                            <Typography
                                                variant='body2'
                                                className={classes.FormLabel}
                                            >
                                                Ngày bắt đầu
                                            </Typography>
                                            <TextField
                                                type='date'
                                                fullWidth
                                                InputProps={InputProps}
                                                variant='standard'
                                                value={
                                                    work.startDate
                                                        ? moment(
                                                              work.startDate
                                                          ).format('YYYY-MM-DD')
                                                        : ''
                                                }
                                                size='small'
                                                name='startDate'
                                                id='startDate'
                                                onChange={(event) =>
                                                    handlechangeWork(
                                                        event,
                                                        index
                                                    )
                                                }
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.timeWrapper}
                                        >
                                            <Typography
                                                variant='body2'
                                                className={classes.FormLabel}
                                            >
                                                Ngày kết thúc
                                            </Typography>
                                            <TextField
                                                type='date'
                                                fullWidth
                                                variant='standard'
                                                InputProps={InputProps}
                                                value={
                                                    work.endDate
                                                        ? moment(
                                                              work.endDate
                                                          ).format('YYYY-MM-DD')
                                                        : ''
                                                }
                                                size='small'
                                                name='endDate'
                                                id='endDate'
                                                onChange={(event) =>
                                                    handlechangeWork(
                                                        event,
                                                        index
                                                    )
                                                }
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            className={
                                                classes.workDetailWrapper
                                            }
                                        >
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Tên công ty
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    error={
                                                        errorsWork['company']
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errorsWork['company']
                                                    }
                                                    fullWidth
                                                    id='company'
                                                    name='company'
                                                    multiline
                                                    InputProps={InputProps}
                                                    spellCheck={false}
                                                    variant='standard'
                                                    value={work.company ?? ''}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Vị trí
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    error={
                                                        errorsWork['position']
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errorsWork['position']
                                                    }
                                                    fullWidth
                                                    id='position'
                                                    name='position'
                                                    multiline
                                                    InputProps={InputProps}
                                                    spellCheck={false}
                                                    variant='standard'
                                                    value={work.position ?? ''}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <FormLabel
                                                    className={
                                                        classes.FormLabel
                                                    }
                                                >
                                                    <Typography variant='body2'>
                                                        Mô tả công việc
                                                    </Typography>
                                                </FormLabel>
                                                <TextField
                                                    error={
                                                        errorsWork['detail']
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        errorsWork['detail']
                                                    }
                                                    fullWidth
                                                    id='detail'
                                                    name='detail'
                                                    spellCheck={false}
                                                    multiline
                                                    InputProps={InputProps}
                                                    variant='standard'
                                                    value={work.detail ?? ''}
                                                    onChange={(event) =>
                                                        handlechangeWork(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Box>

                        <Box className={classes.careerGoalWrapper}>
                            <Box
                                className={classes.titleWrapper}
                                style={{ justifyContent: 'flex-start' }}
                            >
                                <HandymanIcon fontSize='large' />
                                <Typography
                                    variant='subtitle1'
                                    className={classes.careerGoalTitle}
                                >
                                    Kỹ năng
                                </Typography>
                            </Box>
                            <TextField
                                error={errorsCV['skill'] ? true : false}
                                helperText={errorsCV['skill']}
                                InputLabelProps={InputLabelProps}
                                fullWidth
                                id='skill'
                                name='skill'
                                multiline
                                spellCheck={false}
                                InputProps={InputProps}
                                label='Kỹ năng'
                                placeholder='Kỹ năng'
                                variant='standard'
                                value={cvData.skill ?? ''}
                                onChange={handleChangeCV}
                            />
                        </Box>

                        <Box className={classes.careerGoalWrapper}>
                            <Box
                                className={classes.titleWrapper}
                                style={{ justifyContent: 'flex-start' }}
                            >
                                <SportsEsportsIcon fontSize='large' />
                                <Typography
                                    variant='subtitle1'
                                    className={classes.careerGoalTitle}
                                >
                                    Sở thích
                                </Typography>
                            </Box>
                            <TextField
                                error={errorsCV['hobby'] ? true : false}
                                helperText={errorsCV['hobby']}
                                InputLabelProps={InputLabelProps}
                                fullWidth
                                InputProps={InputProps}
                                id='hobby'
                                name='hobby'
                                multiline
                                spellCheck={false}
                                label='Sở thích'
                                placeholder='Sở thích'
                                variant='standard'
                                value={cvData.hobby ?? ''}
                                onChange={handleChangeCV}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Profile;
