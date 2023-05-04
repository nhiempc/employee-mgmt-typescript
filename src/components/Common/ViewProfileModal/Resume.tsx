import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
// styles
import useStyles from './styles';
import { GENDER, thFamily } from '../../../common';
import moment from 'moment';
import { IFamilyRelations } from '../../../models/IEmployee';
import { IForm } from '../../../models/IForm';

type IProps = {
    profileData: IForm;
    familyData: IFamilyRelations[];
};

const Resume: React.FunctionComponent<IProps> = ({
    profileData,
    familyData
}) => {
    const { classes } = useStyles();

    const { resume } = profileData;

    return (
        <Box>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={10} className={classes.resumeWrapper}>
                        <Box className={classes.resumeHeader}>
                            <Typography
                                variant='h6'
                                sx={{
                                    textTransform: 'uppercase',
                                    paddingTop: '16px',
                                    fontWeight: '600'
                                }}
                            >
                                Cộng hòa xã hội chủ nghĩa Việt Nam
                            </Typography>
                            <Typography
                                variant='h6'
                                sx={{
                                    px: '15px',
                                    borderBottom: '2px solid black',
                                    width: 'fit-content',
                                    fontWeight: '600'
                                }}
                            >
                                Độc lập - Tự do - Hạnh phúc
                            </Typography>
                        </Box>

                        <Box className={classes.avatarWrapper}>
                            {!resume.photoUrl && (
                                <Typography
                                    className={classes.resumeAvatar}
                                    variant='body1'
                                    sx={{
                                        color: 'black',
                                        padding: '15px'
                                    }}
                                >
                                    Ảnh 4x6cm
                                </Typography>
                            )}
                            {resume.photoUrl && (
                                <div
                                    className={classes.resumeAvatar}
                                    style={{
                                        border: 'none',
                                        color: 'black',
                                        padding: '15px',
                                        backgroundSize: 'cover',
                                        width: '120px',
                                        height: '160px',
                                        backgroundImage: `url('${resume.photoUrl}')`,
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                            )}
                            <Box className={classes.resumeTitle}>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        paddingTop: '16px'
                                    }}
                                >
                                    Sơ yếu lý lịch
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        width: 'fit-content',
                                        fontStyle: 'italic',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Tự thuật
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography
                                variant='h5'
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold'
                                }}
                            >
                                1. Bản thân
                            </Typography>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Họ và tên
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.fullName ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Tên thường gọi
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.commonName ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Ngày sinh
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {moment(resume.dateOfBirth).format(
                                        'DD/MM/YYYY'
                                    ) === 'Invalid date'
                                        ? 'Không có thông tin'
                                        : moment(resume.dateOfBirth).format(
                                              'DD/MM/YYYY'
                                          )}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Giới tính
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {GENDER[resume.gender] ?? 'Nam'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Địa chỉ
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.address ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Chỗ ở hiện nay
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.currentAddress ??
                                        'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Điện thoại
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.phone ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Email
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.email ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Dân tộc
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.ethnicity ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Tôn giáo
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.religion ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Số căn cước công dân
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.citizenId ?? 'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Cấp ngày
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {moment(
                                        resume.citizenIdIssuanceDate
                                    ).format('DD/MM/YYYY') === 'Invalid date'
                                        ? 'Không có thông tin'
                                        : moment(
                                              resume.citizenIdIssuanceDate
                                          ).format('DD/MM/YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.fieldItem}>
                                <Typography
                                    variant='body1'
                                    sx={{ flexShrink: 0 }}
                                >
                                    Nơi cấp
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {resume.citizenIdIssuingAuthority ??
                                        'Không có thông tin'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{ marginTop: '20px' }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold'
                                }}
                            >
                                2. Quan hệ gia đình
                            </Typography>
                            <Typography sx={{ fontStyle: 'italic' }}>
                                Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công
                                tác của bố mẹ đẻ, anh chị em ruột, vợ(hoặc
                                chồng), con
                            </Typography>
                        </Box>
                        {familyData.length === 0 && (
                            <Box
                                className={classes.noInfoBox}
                                sx={{ marginTop: '16px' }}
                            >
                                <Typography>
                                    Không có thông tin về gia đình
                                </Typography>
                            </Box>
                        )}
                        {familyData.length > 0 && (
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        <th className={classes.th}>STT</th>
                                        {thFamily.map((item, index) => (
                                            <th
                                                key={index}
                                                className={classes.th}
                                            >
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {familyData &&
                                        familyData.map((data, index) => (
                                            <tr key={index}>
                                                <td className={classes.td}>
                                                    {index + 1}
                                                </td>
                                                <td className={classes.td}>
                                                    {data.name}
                                                </td>
                                                <td className={classes.td}>
                                                    {moment(
                                                        data.dateOfBirth
                                                    ).format('DD/MM/YYYY') ===
                                                    'Invalid date'
                                                        ? moment().format(
                                                              'DD/MM/YYYY'
                                                          )
                                                        : moment(
                                                              data.dateOfBirth
                                                          ).format(
                                                              'DD/MM/YYYY'
                                                          )}
                                                </td>
                                                <td className={classes.td}>
                                                    {GENDER[data.gender]}
                                                </td>
                                                <td className={classes.td}>
                                                    {data.relation}
                                                </td>
                                                <td className={classes.td}>
                                                    {data.address ??
                                                        'Không có địa chỉ'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}

                        <Grid container>
                            <Grid item xs={12} sx={{ padding: '30px 0' }}>
                                <Typography
                                    variant='body1'
                                    fontSize={'24px'}
                                    textTransform={'uppercase'}
                                    textAlign={'center'}
                                    fontWeight={'bold'}
                                >
                                    Lời cam đoan
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ paddingTop: '10px' }}
                                >
                                    Tôi xin cam đoan những lời khai trên là đúng
                                    sự thực và chịu trách nhiệm về những lời
                                    khai đó. Nếu sau này cơ quan có thẩm quyền
                                    phát hiện vấn đề gì không đúng. Tôi xin chấp
                                    hành biện pháp xử lý theo quy định.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={7}></Grid>
                            <Grid
                                item
                                xs={5}
                                sx={{
                                    padding: '20px 0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    variant='body1'
                                    fontStyle={'italic'}
                                >
                                    Hà Nội, ngày {moment().date()} tháng{' '}
                                    {moment().month() + 1} năm {moment().year()}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={'bold'}
                                    paddingTop={'10px'}
                                >
                                    Người khai ký tên
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontStyle={'italic'}
                                >
                                    (Ký, ghi rõ họ tên)
                                </Typography>
                                {resume.fullName && (
                                    <Typography
                                        variant='body1'
                                        paddingTop={'10px'}
                                    >
                                        {resume.fullName.split(' ').pop()}
                                    </Typography>
                                )}
                                <Typography variant='body1' paddingTop={'10px'}>
                                    {resume.fullName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </Box>
    );
};

export default Resume;
