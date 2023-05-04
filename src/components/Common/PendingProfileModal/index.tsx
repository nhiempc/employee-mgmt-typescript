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
import React, { useEffect } from 'react';
// styles
import { isEmptyObject } from '../../../helpers/common';
import { IEmployee } from '../../../models/IEmployee';
import { IForm } from '../../../models/IForm';
import { useAppDispatch } from '../../../reduxSaga/hooks';
import { employeeActions } from '../../../reduxSaga/slices/employee.slice';
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
    handleReject: () => void;
    handleRequiredSupplement: () => void;
    handleApprove: () => void;
};

const PendingProfileModal: React.FunctionComponent<IProps> = ({
    title,
    isOpen,
    handleClose,
    profileData,
    employee,
    handleReject,
    handleRequiredSupplement,
    handleApprove
}) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (employee.employeeInfo) {
            dispatch(
                employeeActions.addCurrentStatus(employee.employeeInfo.status)
            );
        } else {
            return;
        }
    }, [dispatch, employee.employeeInfo]);

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
                <Button
                    variant='contained'
                    color='warning'
                    autoFocus
                    onClick={handleReject}
                >
                    Từ chối
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    autoFocus
                    onClick={handleRequiredSupplement}
                >
                    Yêu cầu bổ sung
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    autoFocus
                    onClick={handleApprove}
                >
                    Duyệt
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default PendingProfileModal;
