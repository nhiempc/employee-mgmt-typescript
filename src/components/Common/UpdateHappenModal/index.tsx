import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    styled
} from '@mui/material';
// styles
import React from 'react';
import Header from './Header';
import IncreaseSalary from './IncreaseSalary';
import RegisterProfile from './RegisterProfile';
import useStyles from './styles';
import Promote from './Promote';

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
    employeeId: number;
    handleTerminate: (employeeId: number) => void;
};

const UpdateHappenModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    employeeId,
    handleTerminate
}) => {
    const { classes } = useStyles();

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'md'}
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
                <Header employeeId={employeeId} />
                <RegisterProfile />
                <IncreaseSalary employeeId={employeeId} />
                <Promote employeeId={employeeId} />
                {/* <ProposalConsultation employeeId={employeeId} /> */}
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
                    onClick={() => handleTerminate(employeeId)}
                >
                    Kết thúc
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default UpdateHappenModal;
