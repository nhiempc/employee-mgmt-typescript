import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import currencyFormatter from 'currency-formatter';
// styles
import useStyles from './styles';
import { formatDate } from '../../../helpers/common';
import moment from 'moment';
import { TEAM, initEmployeeInfo } from '../../../common';
import { ISalary } from '../../../models/ISalary';
import { IEmployeeInfo } from '../../../models/IEmployee';
import { employeeApi } from '../../../services';

function BootstrapDialogTitle(props: any) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{ m: 0, p: 1, textAlign: 'center', fontSize: '18px' }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

type IProps = {
    title: string;
    isOpen: boolean;
    handleClose: () => void;
    handleSendLeader: () => void;
    employeeId: number;
    increaseSalaryData: ISalary;
};

const IncreaseSalaryModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSendLeader,
    employeeId,
    increaseSalaryData
}) => {
    const { classes } = useStyles();
    const [employeeInfo, setEmployeeInfo] =
        useState<IEmployeeInfo>(initEmployeeInfo);

    useEffect(() => {
        employeeApi
            .getEmployeeById(employeeId)
            .then((res) => setEmployeeInfo(res.data.employeeInfo));
    }, [employeeId]);

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'md'}
        >
            <BootstrapDialogTitle
                id='customized-dialog-title'
                onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers className={classes.modalContent}>
                <ThemeProvider theme={theme}>
                    <Grid container className={classes.wrapper}>
                        <Grid item xs={12} className={classes.header}>
                            <Typography
                                variant='h6'
                                sx={{
                                    textTransform: 'uppercase',
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
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    padding: '32px 0'
                                }}
                            >
                                Đơn xin đề xuất tăng lương
                            </Typography>
                        </Grid>
                        <Typography>
                            Kính gửi: Ban Giám đốc công ty OceanTech
                        </Typography>
                        <Grid container>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Tên tôi là:
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {employeeInfo.fullName ??
                                        'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Sinh ngày:
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {formatDate(employeeInfo.dateOfBirth) ===
                                    'Invalid date'
                                        ? 'Không có thông tin'
                                        : moment(
                                              employeeInfo.dateOfBirth
                                          ).format('DD/MM/YYYY')}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Số CMND/CCCD:
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {employeeInfo.citizenId ??
                                        'Không có thông tin'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.fieldItem}>
                                <Typography sx={{ flexShrink: 0 }}>
                                    Địa chỉ:
                                </Typography>
                                <Typography
                                    className={classes.textData}
                                    variant='body1'
                                >
                                    {employeeInfo.address ??
                                        'Không có thông tin'}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography sx={{ flexShrink: 0 }}>
                                Hiện đang công tác tại vị trí:
                            </Typography>
                            <Typography
                                className={classes.textData}
                                variant='body1'
                            >
                                {TEAM[employeeInfo.teamId] ??
                                    'Không có thông tin'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography
                                sx={{
                                    minHeight: '40px',
                                    display: 'flex',
                                    alignItems: 'end'
                                }}
                            >
                                Lý do tăng lương:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography
                                className={classes.textData}
                                variant='body1'
                            >
                                {increaseSalaryData.reason ??
                                    'Không có thông tin'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    paddingTop: '16px'
                                }}
                            >
                                Căn cứ vào bộ luật lao động năm 2019, hợp đồng
                                lao động số HĐLĐ001, thỏa ước lao động và tình
                                hình thực tế của công ty nên tôi viết đơn này
                                mong Ban giám đốc xem xét tăng lương cho tôi từ
                                ngày{' '}
                                {moment(increaseSalaryData.date).format(
                                    'DD/MM/YYYY'
                                )}
                                .
                            </Typography>
                        </Grid>
                        <Typography sx={{ padding: '16px 0' }}>
                            Rất mong Ban Giám đốc xem xét tăng thêm tiền lương
                            cho tôi với mức lương hàng tháng là{' '}
                            {currencyFormatter.format(
                                Number(increaseSalaryData.salary),
                                { code: 'VND' }
                            )}{' '}
                            để đảm bảo công bằng cũng như là lời động viên, tạo
                            ra động lực để tôi làm việc tốt hơn, cống hiến cho
                            công ty hiệu quả và đạt được những phát triển vượt
                            bậc trong năm {moment().year()}.
                        </Typography>
                        <Typography>Tôi xin chân thành cảm ơn!</Typography>
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
                            <Typography variant='body1' fontStyle={'italic'}>
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
                            <Typography variant='body2' fontStyle={'italic'}>
                                (Ký, ghi rõ họ tên)
                            </Typography>
                            {employeeInfo.fullName && (
                                <Typography variant='body1' paddingTop={'10px'}>
                                    {employeeInfo.fullName.split(' ').pop()}
                                </Typography>
                            )}
                            {employeeInfo.fullName && (
                                <Typography variant='body1' paddingTop={'10px'}>
                                    {employeeInfo.fullName}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleClose}
                >
                    Hủy
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    autoFocus
                    onClick={handleSendLeader}
                >
                    Gửi lãnh đạo
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default IncreaseSalaryModal;
