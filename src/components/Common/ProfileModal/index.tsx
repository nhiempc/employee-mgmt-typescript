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
import React from 'react';
// styles
import { IEmployee } from '../../../models/IEmployee';
import { IForm } from '../../../models/IForm';
import { useAppSelector } from '../../../reduxSaga/hooks';
import { newFormSelector } from '../../../reduxSaga/slices/form.slice';
import TabContextCustom from '../TabContextCustom/TabContextCustom';
import CertificateList from './CertificateList';
import Profile from './Profile';
import Resume from './Resume';
import useStyles from './styles';

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
        padding: 0
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

type IProps = {
    title: string;
    isOpen: boolean;
    handleClose: () => void;
    handleSaveProfile: (employeeId: number, formData: IForm) => void;
    handleOpenSendLeaderModal: () => void;
    employeeData: IEmployee;
};

const ProfileModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    employeeData,
    handleSaveProfile,
    handleOpenSendLeaderModal
}) => {
    const { classes } = useStyles();
    const { employeeInfo } = employeeData;
    const { employeeId } = employeeInfo;
    const newForm = useAppSelector(newFormSelector);

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={isOpen}
            fullWidth
            maxWidth={'lg'}
            PaperProps={{
                sx: {
                    minHeight: '95vh'
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
                <TabContextCustom
                    labelOne={'Hồ sơ'}
                    labelTwo={'Sơ yếu lý lịch'}
                    labelThree={'Danh sách văn bằng'}
                    componentOne={<Profile employeeData={employeeData} />}
                    componentTwo={<Resume employeeData={employeeData} />}
                    componentThee={
                        <CertificateList employeeData={employeeData} />
                    }
                />
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
                    color='success'
                    autoFocus
                    onClick={() =>
                        handleSaveProfile(Number(employeeId), {
                            ...newForm,
                            employeeId: Number(employeeId)
                        })
                    }
                >
                    Lưu
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    autoFocus
                    onClick={handleOpenSendLeaderModal}
                >
                    Trình lãnh đạo
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default ProfileModal;
