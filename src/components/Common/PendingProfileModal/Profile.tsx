import { Divider, Grid, Typography } from '@mui/material';
// styles
import { Call } from '@mui/icons-material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CakeIcon from '@mui/icons-material/Cake';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EmailIcon from '@mui/icons-material/Email';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Box } from '@mui/system';
import moment from 'moment';
import useStyles from './styles';
import { IEmployeeInfo } from '../../../models/IEmployee';
import { IForm } from '../../../models/IForm';

type IProps = {
    profileData: IForm;
    employeeData: IEmployeeInfo;
};

const Profile: React.FunctionComponent<IProps> = ({
    profileData,
    employeeData
}) => {
    const { classes } = useStyles();
    const src = 'https://i.ibb.co/44RBHzs/avatar1.jpg';

    const { cv } = profileData;

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%' }}>
                <Grid container className={classes.cvWrapper}>
                    <Grid item xs={4} className={classes.leftWrapper}>
                        <Box className={classes.imageContainer}>
                            {employeeData.photoUrl && (
                                <img
                                    src={employeeData.photoUrl}
                                    alt='Avatar'
                                    className={classes.avatar}
                                />
                            )}
                            {!employeeData.photoUrl && (
                                <img
                                    src={src}
                                    alt='Avatar'
                                    className={classes.avatar}
                                />
                            )}
                        </Box>
                        <Box className={classes.header}>
                            <Typography variant='h5'>
                                {employeeData.fullName}
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.position}
                            >
                                {employeeData.teamId === 1
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
                                    {moment(employeeData.dateOfBirth).format(
                                        'DD/MM/YYYY'
                                    ) === 'Invalid date'
                                        ? moment().format('DD/MM/YYYY')
                                        : moment(
                                              employeeData.dateOfBirth
                                          ).format('DD/MM/YYYY')}
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <TransgenderIcon />
                                <Typography variant='body2'>
                                    {employeeData.gender === 1 ? 'Nam' : 'Nữ'}
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <LocationOnIcon />
                                <Typography variant='body2'>
                                    {employeeData.address ?? 'Không có địa chỉ'}
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <Call />
                                <Typography variant='body2'>
                                    {employeeData.phone ??
                                        'Không có số điện thoại'}
                                </Typography>
                            </Box>
                            <Box className={classes.basicInfoItem}>
                                <EmailIcon />
                                <Typography variant='body2'>
                                    {employeeData.email ?? 'Không có email'}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
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
                            {cv.careerGoal ? (
                                <Typography variant='body1'>
                                    {cv.careerGoal}
                                </Typography>
                            ) : (
                                <Typography className={classes.noInfoBox}>
                                    Không có thông tin về mục tiêu nghề nghiệp
                                </Typography>
                            )}
                        </Box>

                        <Box className={classes.workExperiencesWrapper}>
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
                            </Box>
                            {cv.workExperiences.length > 0 ? (
                                cv.workExperiences.map((work, index) => (
                                    <Box
                                        className={classes.workItem}
                                        key={index}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant='body1'
                                                    className={
                                                        classes.workPosition
                                                    }
                                                >
                                                    {work.position ??
                                                        'Không có dữ liệu'}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                className={classes.timeLine}
                                            >
                                                <span>
                                                    {work.startDate
                                                        ? moment(
                                                              work.startDate
                                                          ).format('DD/MM/YYYY')
                                                        : moment().format(
                                                              'DD/MM/YYYY'
                                                          )}
                                                </span>
                                                {'-'}
                                                <span>
                                                    {work.endDate
                                                        ? moment(
                                                              work.endDate
                                                          ).format('DD/MM/YYYY')
                                                        : moment().format(
                                                              'DD/MM/YYYY'
                                                          )}
                                                </span>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                className={classes.company}
                                            >
                                                <Typography variant='body1'>
                                                    {work.company ??
                                                        'Không có dữ liệu'}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                className={classes.detail}
                                            >
                                                <Typography
                                                    variant='body1'
                                                    fontWeight={300}
                                                >
                                                    {work.detail ??
                                                        'Không có dữ liệu'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ mt: '15px' }} />
                                    </Box>
                                ))
                            ) : (
                                <Box className={classes.noInfoBox}>
                                    <Typography>
                                        Không có thông tin về kinh nghiệm làm
                                        việc
                                    </Typography>
                                </Box>
                            )}
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
                            {cv.skill ? (
                                <Typography variant='body1'>
                                    {cv.skill}
                                </Typography>
                            ) : (
                                <Box className={classes.noInfoBox}>
                                    <Typography>
                                        Không có thông tin về kỹ năng
                                    </Typography>
                                </Box>
                            )}
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
                            {cv.hobby ? (
                                <Typography variant='body1'>
                                    {cv.hobby}
                                </Typography>
                            ) : (
                                <Box className={classes.noInfoBox}>
                                    <Typography>
                                        Không có thông tin về sở thích
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default Profile;
