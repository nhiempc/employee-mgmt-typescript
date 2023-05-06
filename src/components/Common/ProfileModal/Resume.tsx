import { Grid, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import theme from '../../../theme';
// styles
import { FastField, Formik, useFormikContext } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GENDER, resumeValidationSchema, thFamily } from '../../../common';
import { isEmptyObject } from '../../../helpers/common';
import { IEmployee } from '../../../models/IEmployee';
import { IResume, initResume } from '../../../models/IResume';
import { useAppDispatch } from '../../../reduxSaga/hooks';
import { formActions } from '../../../reduxSaga/slices/form.slice';
import InputField from '../CustomFields/InputField/InputField';
import useStyles, {
    FormHelperTextProps,
    InputLabelProps,
    InputProps
} from './styles';

type IProps = {
    employeeData: IEmployee;
};

const Resume: React.FunctionComponent<IProps> = ({ employeeData }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const { familyRelations } = employeeData;
    const { employeeInfo } = employeeData;
    const [resume, setResume] = useState<IResume>(initResume);

    const idFamilyData: number[] = [];
    const rowFamilyData: any[][] = [];

    if (familyRelations && familyRelations.length > 0) {
        familyRelations.map((item) => {
            rowFamilyData.push([
                item.name,
                GENDER[item.gender],
                moment(item.dateOfBirth).format('DD-MM-YYYY') === 'Invalid date'
                    ? moment().format('DD-MM-YYYY')
                    : moment(item.dateOfBirth).format('DD-MM-YYYY'),
                item.citizenId,
                item.relation,
                item.address
            ]);
            idFamilyData.push(Number(item.familyId));
            return rowFamilyData;
        });
    }

    const AutoSubmit = () => {
        const { submitForm, errors, touched } = useFormikContext();
        useEffect(() => {
            if (isEmptyObject(errors) && !isEmptyObject(touched)) {
                submitForm();
            }
        }, [submitForm, errors, touched]);
        return null;
    };

    useEffect(() => {
        let {
            fullName,
            dateOfBirth,
            gender,
            address,
            phone,
            email,
            citizenId,
            photoUrl,
            code
        } = employeeInfo;
        dispatch(
            formActions.addResume({
                ...resume,
                fullName,
                dateOfBirth,
                gender,
                address,
                phone,
                email,
                citizenId,
                photoUrl,
                code
            })
        );
    }, [dispatch, resume, employeeInfo]);

    return (
        <Formik
            initialValues={initResume}
            onSubmit={(values) => {
                setResume(values);
            }}
            validationSchema={resumeValidationSchema}
        >
            {(formikProps) => {
                const { errors } = formikProps;
                return (
                    <Box>
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <ThemeProvider theme={theme}>
                                <Grid
                                    item
                                    xs={10}
                                    className={classes.resumeWrapper}
                                >
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
                                        {!employeeInfo.photoUrl && (
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
                                        {employeeInfo.photoUrl && (
                                            <div
                                                className={classes.resumeAvatar}
                                                style={{
                                                    border: 'none',
                                                    color: 'black',
                                                    padding: '15px',
                                                    backgroundSize: 'cover',
                                                    width: '120px',
                                                    height: '160px',
                                                    backgroundImage: `url('${employeeInfo.photoUrl}')`,
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
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Họ và tên
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                label='Họ và tên'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                id='fullName'
                                                name='fullName'
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                                value={employeeInfo.fullName}
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Tên thường gọi
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.commonName
                                                        ? true
                                                        : false
                                                }
                                                helperText={errors.commonName}
                                                name='commonName'
                                                component={InputField}
                                                label='Tên thường gọi'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Ngày sinh
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                label='Ngày sinh'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                type='date'
                                                id='dateOfBirth'
                                                name='dateOfBirth'
                                                value={
                                                    moment(
                                                        employeeInfo.dateOfBirth
                                                    ).format('YYYY-MM-DD') ?? ''
                                                }
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Giới tính
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                label='Giới tính'
                                                style={{ margin: 0 }}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                                id='gender'
                                                name='gender'
                                                value={
                                                    GENDER[employeeInfo.gender]
                                                }
                                            ></TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Địa chỉ
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                label='Địa chỉ'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                id='address'
                                                name='address'
                                                value={employeeInfo.address}
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Chỗ ở hiện nay
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.currentAddress
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors.currentAddress
                                                }
                                                name='currentAddress'
                                                component={InputField}
                                                label='Chỗ ở hiện nay'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Điện thoại
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                type='tel'
                                                label='Điện thoại'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                id='phone'
                                                name='phone'
                                                value={employeeInfo.phone}
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Email
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                type='email'
                                                label='Email'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                id='email'
                                                name='email'
                                                value={employeeInfo.email}
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                            ></TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Dân tộc
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.ethnicity
                                                        ? true
                                                        : false
                                                }
                                                helperText={errors.ethnicity}
                                                name='ethnicity'
                                                component={InputField}
                                                label='Dân tộc'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Tôn giáo
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.religion
                                                        ? true
                                                        : false
                                                }
                                                helperText={errors.religion}
                                                name='religion'
                                                component={InputField}
                                                label='Tôn giáo'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Số căn cước công dân
                                            </Typography>
                                            <TextField
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                variant='standard'
                                                size='small'
                                                fullWidth
                                                label='Số căn cước công dân'
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                id='citizenId'
                                                name='citizenId'
                                                value={employeeInfo.citizenId}
                                                InputProps={{
                                                    ...InputProps,
                                                    readOnly: true
                                                }}
                                            ></TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Cấp ngày
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.citizenIdIssuanceDate
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors.citizenIdIssuanceDate
                                                }
                                                name='citizenIdIssuanceDate'
                                                component={InputField}
                                                label='Ngày cấp'
                                                type='date'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ padding: '10px 0' }}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.fieldItem}
                                        >
                                            <Typography
                                                variant='body1'
                                                sx={{ flexShrink: 0 }}
                                            >
                                                Nơi cấp
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.citizenIdIssuingAuthority
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors.citizenIdIssuingAuthority
                                                }
                                                name='citizenIdIssuingAuthority'
                                                component={InputField}
                                                label='Nơi cấp'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                FormHelperTextProps={
                                                    FormHelperTextProps
                                                }
                                                InputProps={InputProps}
                                                variant='standard'
                                                size='small'
                                            />
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
                                        <Typography
                                            sx={{ fontStyle: 'italic' }}
                                        >
                                            Ghi rõ họ tên, năm sinh, nghề
                                            nghiệp, nơi công tác của bố mẹ đẻ,
                                            anh chị em ruột, vợ(hoặc chồng), con
                                        </Typography>
                                    </Box>
                                    {familyRelations.length === 0 && (
                                        <Box
                                            className={classes.noInfoBox}
                                            sx={{ marginTop: '16px' }}
                                        >
                                            <Typography>
                                                Không có thông tin về gia đình
                                            </Typography>
                                        </Box>
                                    )}
                                    {familyRelations.length > 0 && (
                                        <table className={classes.table}>
                                            <thead>
                                                <tr>
                                                    <th className={classes.th}>
                                                        STT
                                                    </th>
                                                    {thFamily.map(
                                                        (item, index) => (
                                                            <th
                                                                key={index}
                                                                className={
                                                                    classes.th
                                                                }
                                                            >
                                                                {item}
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {familyRelations &&
                                                    familyRelations.map(
                                                        (data, index) => (
                                                            <tr key={index}>
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {index + 1}
                                                                </td>
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {data.name}
                                                                </td>
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {moment(
                                                                        data.dateOfBirth
                                                                    ).format(
                                                                        'DD/MM/YYYY'
                                                                    ) ===
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
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {
                                                                        GENDER[
                                                                            data
                                                                                .gender
                                                                        ]
                                                                    }
                                                                </td>
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {
                                                                        data.relation
                                                                    }
                                                                </td>
                                                                <td
                                                                    className={
                                                                        classes.td
                                                                    }
                                                                >
                                                                    {data.address ??
                                                                        'Không có địa chỉ'}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                            </tbody>
                                        </table>
                                    )}
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ padding: '30px 0' }}
                                        >
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
                                                Tôi xin cam đoan những lời khai
                                                trên là đúng sự thực và chịu
                                                trách nhiệm về những lời khai
                                                đó. Nếu sau này cơ quan có thẩm
                                                quyền phát hiện vấn đề gì không
                                                đúng. Tôi xin chấp hành biện
                                                pháp xử lý theo quy định.
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
                                                Hà Nội, ngày {moment().date()}{' '}
                                                tháng {moment().month() + 1} năm{' '}
                                                {moment().year()}
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
                                            {employeeInfo.fullName && (
                                                <>
                                                    <Typography
                                                        variant='body1'
                                                        paddingTop={'10px'}
                                                    >
                                                        {employeeInfo.fullName
                                                            .split(' ')
                                                            .pop()}
                                                    </Typography>
                                                    <Typography
                                                        variant='body1'
                                                        paddingTop={'10px'}
                                                    >
                                                        {employeeInfo.fullName}
                                                    </Typography>
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <AutoSubmit />
                            </ThemeProvider>
                        </Grid>
                    </Box>
                );
            }}
        </Formik>
    );
};

export default Resume;
