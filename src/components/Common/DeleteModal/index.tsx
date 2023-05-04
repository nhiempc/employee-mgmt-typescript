import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// styles
import useStyles from './styles';

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
    handleDelete: () => void;
};

const DeleteModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    handleDelete
}) => {
    const { classes } = useStyles();
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'xs'}
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
                Việc xóa sẽ khiến nội dung không thể khôi phục. Bạn có chắc chắn
                muốn xóa?
            </DialogContent>
            <DialogActions className={classes.dialogActionWrapper}>
                <Button
                    variant='outlined'
                    color='warning'
                    autoFocus
                    onClick={handleClose}
                >
                    Hủy
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    autoFocus
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default DeleteModal;
