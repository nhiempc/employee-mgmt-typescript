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
import { isEmptyObject } from '../../../helpers/common';
import { IEmployee } from '../../../models/IEmployee';
import { IForm } from '../../../models/IForm';
import { TabContext } from '../TabContextCustom';
import CertificateList from './CertificateList';
import Profile from './Profile';
import Resume from './Resume';
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
    profileData: IForm;
    employee: IEmployee;
};

const ViewProfileModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    profileData,
    employee
}) => {
    const { classes } = useStyles();

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
                <TabContext
                    labelOne={'Hồ sơ'}
                    labelTwo={'Sơ yếu lý lịch'}
                    labelThree={'Danh sách văn bằng'}
                    componentOne={
                        !isEmptyObject(employee) && (
                            <Profile
                                profileData={profileData}
                                employeeData={employee.employeeInfo}
                            />
                        )
                    }
                    componentTwo={
                        !isEmptyObject(employee) && (
                            <Resume
                                profileData={profileData}
                                familyData={employee.familyRelations}
                            />
                        )
                    }
                    componentThee={
                        !isEmptyObject(employee) && (
                            <CertificateList
                                certificateData={employee.certificates}
                            />
                        )
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
                    Đóng
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default ViewProfileModal;
