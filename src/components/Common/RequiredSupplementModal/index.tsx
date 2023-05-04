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
    handleSubmit: (requiredSupplementData: any) => void;
};

const RequiredSupplementModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSubmit
}) => {
    const { classes } = useStyles();
    let currentStatus = useAppSelector(statusSelector);
    let _status: number | null = null;
    if (currentStatus === 2 || currentStatus === 3) {
        _status = 4;
    } else if (currentStatus === 8) {
        _status = 9;
    } else if (currentStatus === 16) {
        _status = 17;
    }
    const [requiredSupplementData, setRequiredSupplementData] = useState({
        status: _status,
        statusLog: ''
    });
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        setRequiredSupplementData({
            ...requiredSupplementData,
            [name]: value,
            status: _status
        });
    };

    useEffect(() => {
        if (requiredSupplementData.statusLog) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [requiredSupplementData.statusLog]);

    const handleCloseModal = () => {
        setRequiredSupplementData({ status: 4, statusLog: '' });
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
                        <Typography variant='body2'>Nội dung</Typography>
                        <TextField
                            type='text'
                            multiline
                            fullWidth
                            label='Nội dung'
                            InputLabelProps={InputLabelProps}
                            size='small'
                            minRows={3}
                            id='statusLog'
                            name='statusLog'
                            value={requiredSupplementData.statusLog ?? ''}
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
                    disabled={isValid ? false : true}
                    onClick={() => handleSubmit(requiredSupplementData)}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default RequiredSupplementModal;
