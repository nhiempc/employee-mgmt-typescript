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
import React, { useState } from 'react';
// styles
import useStyles, { InputLabelProps } from './styles';
import { useAppSelector } from '../../../reduxSaga/hooks';
import { statusSelector } from '../../../reduxSaga/slices/employee.slice';

function BootstrapDialogTitle(props: any) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 1,
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '500'
            }}
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
    handleSubmit: (rejectData: any) => void;
};

const RejectModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSubmit
}) => {
    const { classes } = useStyles();
    let _status: number | null = null;
    let currentStatus = useAppSelector(statusSelector);
    if (currentStatus === 2 || currentStatus === 3) {
        _status = 6;
    } else if (currentStatus === 8) {
        _status = 11;
    } else if (currentStatus === 16) {
        _status = 19;
    }
    const [rejectData, setRejectData] = useState({
        status: _status,
        rejectedReason: ''
    });
    const [rejectDate, setRejectDate] = useState('');

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'rejectDate') {
            setRejectDate(value);
        }
        if (name === 'rejectedReason') {
            setRejectData({ ...rejectData, [name]: value, status: _status });
        }
    };

    const handleCloseModal = () => {
        setRejectDate('');
        handleClose();
    };

    return (
        <BootstrapDialog
            onClose={handleCloseModal}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'xs'}
        >
            <BootstrapDialogTitle
                id='customized-dialog-title'
                onClose={handleClose}
            >
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers className={classes.modalContent}>
                <Grid container>
                    <Grid item xs={12} className={classes.inputGroup}>
                        <Typography variant='body2'>Chọn ngày</Typography>
                        <TextField
                            fullWidth
                            size='small'
                            type='date'
                            id='rejectDate'
                            name='rejectDate'
                            label='Ngày'
                            InputLabelProps={InputLabelProps}
                            value={rejectDate ?? ''}
                            onChange={handleChange}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.inputGroup}>
                        <Typography variant='body2'>Lý do từ chối</Typography>
                        <TextField
                            type='text'
                            multiline
                            fullWidth
                            InputLabelProps={InputLabelProps}
                            label='Nội dung'
                            size='small'
                            minRows={3}
                            id='rejectedReason'
                            name='rejectedReason'
                            value={rejectData.rejectedReason ?? ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleCloseModal}
                >
                    Hủy
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    autoFocus
                    onClick={() => handleSubmit(rejectData)}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default RejectModal;
