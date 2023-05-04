import CloseIcon from '@mui/icons-material/Close';
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
import React, { useEffect, useState } from 'react';
// styles
import { leaderOptions } from '../../../common';
import { IRegister, initRegister } from '../../../models/IRegister';
import useStyles, { InputLabelProps } from './styles';
import { isEmptyObject } from '../../../helpers/common';

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
    handleSendLeader: (registerInfo: IRegister) => void;
    status: number;
};

const SendLeaderModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSendLeader,
    status
}) => {
    const { classes } = useStyles();

    const [registerInfo, setRegisterInfo] = useState<IRegister>({
        ...initRegister,
        status: status
    });
    const [errors, setErrors] = useState<any>({ error: 'error' });
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleChangeRegisterInfo = (event: any) => {
        let { name, value } = event.target;
        if (!value) {
            setErrors({ ...errors, [name]: 'Không được để trống' });
        } else {
            const { [name]: x, ...newObject } = errors;
            setErrors(newObject);
        }
        if (name === 'registerName') {
            let index = event.target.selectedIndex;
            if (index !== 0) {
                setRegisterInfo({
                    ...registerInfo,
                    [name]: value,
                    status: status,
                    registerPosition: leaderOptions[index].position
                });
            }
        } else {
            setRegisterInfo({ ...registerInfo, [name]: value, status: status });
        }
    };

    useEffect(() => {
        if (isEmptyObject(errors)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [errors]);

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    minHeight: '200px'
                }
            }}
        >
            <BootstrapDialogTitle
                id='customized-dialog-title'
                onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>
            <DialogContent
                dividers
                className={classes.modalContent}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography
                            variant='body2'
                            className={classes.FormLabel}
                        >
                            Ngày trình<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            error={errors['date'] ? true : false}
                            helperText={errors['date']}
                            type='date'
                            fullWidth
                            label={'Ngày trình lãnh đạo'}
                            InputLabelProps={InputLabelProps}
                            value={registerInfo.registerDate}
                            size='small'
                            name='registerDate'
                            id='registerDate'
                            onChange={handleChangeRegisterInfo}
                        ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography
                            variant='body2'
                            className={classes.FormLabel}
                        >
                            Tên lãnh đạo<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            error={errors['registerName'] ? true : false}
                            helperText={errors['registerName']}
                            fullWidth
                            label={'Tên lãnh đạo'}
                            InputLabelProps={InputLabelProps}
                            value={registerInfo.registerName}
                            size='small'
                            select
                            name='registerName'
                            id='registerName'
                            SelectProps={{ native: true }}
                            onChange={handleChangeRegisterInfo}
                        >
                            {leaderOptions.map((leader: any, index: number) => (
                                <option key={index} value={leader.label}>
                                    {leader.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography
                            variant='body2'
                            className={classes.FormLabel}
                        >
                            Chức vụ<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            error={errors['registerPosition'] ? true : false}
                            helperText={errors['registerPosition']}
                            fullWidth
                            label={'Chức vụ'}
                            InputProps={{
                                readOnly: true
                            }}
                            InputLabelProps={InputLabelProps}
                            value={registerInfo.registerPosition}
                            size='small'
                            name='registerPosition'
                            id='registerPosition'
                            onChange={handleChangeRegisterInfo}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant='body2'
                            className={classes.FormLabel}
                        >
                            Nội dung trình lãnh đạo
                            <span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            error={errors['registerContent'] ? true : false}
                            helperText={errors['registerContent']}
                            fullWidth
                            label={'Nội dung'}
                            InputLabelProps={InputLabelProps}
                            multiline
                            rows={3}
                            value={registerInfo.registerContent}
                            size='small'
                            name='registerContent'
                            id='registerContent'
                            onChange={handleChangeRegisterInfo}
                        ></TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='contained'
                    color='primary'
                    autoFocus
                    disabled={!isValid}
                    onClick={() => handleSendLeader(registerInfo)}
                >
                    Trình lãnh đạo
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleClose}
                >
                    Hủy
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default SendLeaderModal;
