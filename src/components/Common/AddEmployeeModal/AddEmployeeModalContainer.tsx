import CloseIcon from '@mui/icons-material/Close';
import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tab,
    styled
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import {
    employeeInfoValidationSchema,
    initEmployeeInfo
} from '../../../common';
import { isEmptyObject } from '../../../helpers/common';
import { INewEmployee } from '../../../models/IEmployee';
import CertificateTab from './CertificateTab';
import EmployeeInfoTab from './EmployeeInfoTab';
import FamifyInfoTab from './FamifyInfoTab';
import { TabPanel } from './TabPanel';
import useStyles from './styles';
import { useAppSelector } from '../../../reduxSaga/hooks';
import { newEmployeeSelector } from '../../../reduxSaga/slices/employee.slice';

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
    isOpen: boolean;
    title: string;
    handleClose: () => void;
    handleSave: (newEmployee: INewEmployee) => void;
    handleRegister: () => void;
};

const AddEmployeeModalContainer: React.FunctionComponent<IProps> = ({
    isOpen,
    title,
    handleClose,
    handleSave,
    handleRegister
}) => {
    const { classes } = useStyles();
    const { certificates, familyRelations } =
        useAppSelector(newEmployeeSelector);

    const [value, setValue] = useState('1');

    const handleCancel = () => {
        handleClose();
    };

    const handleChangeTab = (
        event: React.SyntheticEvent,
        newValue: string,
        errors: any,
        touched: any
    ) => {
        if (isEmptyObject(errors) && !isEmptyObject(touched)) {
            setValue(newValue);
        }
    };

    return (
        <Formik
            initialValues={initEmployeeInfo}
            onSubmit={() => {}}
            validationSchema={employeeInfoValidationSchema}
        >
            {(formikProps) => {
                const { values, errors, touched } = formikProps;
                return (
                    <BootstrapDialog
                        onClose={handleCancel}
                        aria-labelledby='customized-dialog-title'
                        open={isOpen}
                        fullWidth
                        maxWidth={'md'}
                    >
                        <BootstrapDialogTitle
                            id='customized-dialog-title'
                            onClose={handleCancel}
                        >
                            {title}
                        </BootstrapDialogTitle>
                        <DialogContent
                            dividers
                            className={classes.modalContent}
                        >
                            <TabContext value={value}>
                                <Box>
                                    <TabList
                                        onChange={(
                                            e: React.SyntheticEvent,
                                            newValue: string
                                        ) =>
                                            handleChangeTab(
                                                e,
                                                newValue,
                                                errors,
                                                touched
                                            )
                                        }
                                        aria-label='basic tabs example'
                                    >
                                        <Tab
                                            label='Thông tin nhân viên'
                                            value='1'
                                        />
                                        <Tab
                                            label='Thông tin văn bằng'
                                            value='2'
                                        />
                                        <Tab
                                            label='Quan hệ gia đình'
                                            value='3'
                                        />
                                    </TabList>
                                </Box>
                                <TabPanel value='1'>
                                    <EmployeeInfoTab
                                        employeeInfo={values}
                                        errors={errors}
                                    />
                                </TabPanel>
                                <TabPanel value='2'>
                                    <CertificateTab />
                                </TabPanel>
                                <TabPanel value='3'>
                                    <FamifyInfoTab />
                                </TabPanel>
                            </TabContext>
                        </DialogContent>
                        <DialogActions className={classes.dialogActionWrapper}>
                            <Button
                                variant='contained'
                                color='error'
                                autoFocus
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant='contained'
                                color='success'
                                autoFocus
                                disabled={
                                    !(
                                        isEmptyObject(errors) &&
                                        !isEmptyObject(touched)
                                    )
                                }
                                onClick={() =>
                                    handleSave({
                                        employeeInfo: values,
                                        certificates: certificates,
                                        familyRelations: familyRelations
                                    })
                                }
                            >
                                Lưu
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                autoFocus
                                onClick={handleRegister}
                            >
                                Đăng ký
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                );
            }}
        </Formik>
    );
};

export default AddEmployeeModalContainer;
