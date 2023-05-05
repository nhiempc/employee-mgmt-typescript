import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
// styles
import useStyles, {
    FormHelperTextProps,
    InputLabelProps,
    InputProps,
    InputPropsTextarea
} from './styles';
import moment from 'moment';
import { employeeApi } from '../../../services';
import { initEmployeeInfo } from '../../../common';
import { IEmployeeInfo } from '../../../models/IEmployee';

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
    handleSendTerminateRequest: (terminateRequest: any) => void;
    employeeId: number;
};

const TerminateRequestModal: React.FC<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSendTerminateRequest,
    employeeId
}) => {
    const { classes } = useStyles();
    const [date, setDate] = useState('');
    const [terminateRequest, setTerminateRequest] = useState({
        status: 8,
        terminateRequestDetail: ''
    });

    const [employeeInfo, setEmployeeInfo] =
        useState<IEmployeeInfo>(initEmployeeInfo);

    useEffect(() => {
        employeeApi
            .getEmployeeById(employeeId)
            .then((res) => setEmployeeInfo(res.data.employeeInfo));
    }, [employeeId]);

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        setTerminateRequest({ ...terminateRequest, [name]: value });
    };

    const handleChangeDate = (e: any) => {
        setDate(e.target.value);
    };

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
                                Đơn xin nghỉ việc
                            </Typography>
                        </Grid>
                        <Typography>
                            Kính gửi: Ban Giám đốc công ty OceanTech
                        </Typography>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography sx={{ flexShrink: 0 }}>
                                Tên tôi là:
                            </Typography>
                            <Typography
                                className={classes.textData}
                                variant='body1'
                            >
                                {employeeInfo.fullName ?? 'Không có thông tin'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography sx={{ flexShrink: 0 }}>
                                Hiện đang công tác tại vị trí:
                            </Typography>
                            <Typography
                                className={classes.textData}
                                variant='body1'
                            >
                                {employeeInfo.registerPosition ??
                                    'Không có thông tin'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography sx={{ flexShrink: 0 }}>
                                Tôi xin được nghỉ việc từ ngày:
                            </Typography>
                            <TextField
                                className={classes.textData}
                                size='small'
                                fullWidth
                                type='date'
                                variant='standard'
                                value={date}
                                onChange={handleChangeDate}
                                InputLabelProps={InputLabelProps}
                                InputProps={InputProps}
                            >
                                Front-end
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <Typography
                                sx={{
                                    flexShrink: 0,
                                    minHeight: '40px',
                                    display: 'flex',
                                    alignItems: 'end'
                                }}
                            >
                                Tôi làm đơn này đề nghị ban giám đốc cho tôi xin
                                nghỉ việc với lý do:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fieldItem}>
                            <TextField
                                sx={{ margin: 0 }}
                                className={classes.textData}
                                size='small'
                                multiline
                                label='Lý do'
                                fullWidth
                                spellCheck={false}
                                variant='standard'
                                name='terminateRequestDetail'
                                id='terminateRequestDetail'
                                InputLabelProps={InputLabelProps}
                                FormHelperTextProps={FormHelperTextProps}
                                InputProps={InputPropsTextarea}
                                value={
                                    terminateRequest.terminateRequestDetail ??
                                    ''
                                }
                                onChange={handleChange}
                            ></TextField>
                        </Grid>
                        <Typography sx={{ padding: '16px 0' }}>
                            Trong khi chờ đợi sự chấp thuận của Ban Giám Đốc
                            Công ty, tôi sẽ tiếp tục làm việc nghiêm túc và tiến
                            hành bàn giao công việc cũng như tài sản cho người
                            quản lý trực tiếp của tôi.
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
                    onClick={() => handleSendTerminateRequest(terminateRequest)}
                >
                    Gửi lãnh đạo
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default TerminateRequestModal;
