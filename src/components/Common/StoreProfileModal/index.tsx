import React, { useState } from 'react';
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
// styles
import useStyles, { InputLabelProps } from './styles';

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
    handleSaveProfile: (storeData: any) => void;
};

const StoreProfileModal: React.FC<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleSaveProfile
}) => {
    const { classes } = useStyles();

    const [date, setDate] = useState('');
    const [storeData, setStoreData] = useState({
        status: 13,
        storedProfileCode: '',
        note: ''
    });

    const handleChangeDate = (e: any) => {
        setDate(e.target.value);
    };

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        setStoreData({ ...storeData, [name]: value });
    };

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
            <DialogContent dividers className={classes.modalContent}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='body2'>
                            Ngày nộp lưu<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            type='date'
                            fullWidth
                            label={'Ngày nộp lưu'}
                            InputLabelProps={InputLabelProps}
                            value={date}
                            size='small'
                            name='date'
                            id='date'
                            onChange={handleChangeDate}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='body2'>
                            Số nộp lưu<span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            fullWidth
                            label={'Số nộp lưu'}
                            InputLabelProps={InputLabelProps}
                            value={storeData.storedProfileCode}
                            size='small'
                            name='storedProfileCode'
                            id='storedProfileCode'
                            onChange={handleChange}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>
                            Ghi chú
                            <span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <TextField
                            fullWidth
                            label={'Ghi chú'}
                            InputLabelProps={InputLabelProps}
                            multiline
                            rows={3}
                            value={storeData.note ?? ''}
                            size='small'
                            name='note'
                            id='note'
                            onChange={handleChange}
                        ></TextField>
                    </Grid>
                </Grid>
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
                    onClick={() => handleSaveProfile(storeData)}
                >
                    Lưu
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default StoreProfileModal;
