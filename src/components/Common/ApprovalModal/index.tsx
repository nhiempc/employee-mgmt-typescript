import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    TextField,
    Typography,
    styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// styles
import moment from 'moment';
import { useAppSelector } from '../../../reduxSaga/hooks';
import { statusSelector } from '../../../reduxSaga/slices/employee.slice';
import useStyles, { InputLabelProps } from './styles';

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
    handleSubmit: (staatus: number) => void;
};

const ApprovalModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSubmit
}) => {
    const { classes } = useStyles();
    const [approvalDate, setApprovalDate] = useState(
        moment().format('YYYY-MM-DD')
    );
    const [isValid, setIsValid] = useState(false);
    const [checked, setChecked] = useState(false);
    let currentStatus = useAppSelector(statusSelector);
    let _status: number | null = null;
    if (currentStatus === 2 || currentStatus === 3) {
        _status = 5;
    } else if (currentStatus === 8) {
        _status = 10;
    } else if (currentStatus === 16) {
        _status = 18;
    }

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'approvalDate') {
            setApprovalDate(value);
        }
        if (name === 'checkbox') {
            setChecked(e.target.checked);
        }
    };

    useEffect(() => {
        if (approvalDate && checked) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [approvalDate, checked]);

    const handleCloseModal = () => {
        setApprovalDate('');
        setChecked(false);
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
                            InputLabelProps={InputLabelProps}
                            id='approvalDate'
                            name='approvalDate'
                            label='Ngày'
                            value={approvalDate ?? ''}
                            onChange={handleChange}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.inputGroup}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label='Đã đủ điều kiện'
                                name='checkbox'
                                checked={checked}
                                onChange={handleChange}
                            />
                        </FormGroup>
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
                    disabled={isValid ? false : true}
                    onClick={() => handleSubmit(Number(_status))}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default ApprovalModal;
