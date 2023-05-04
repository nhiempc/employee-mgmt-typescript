import CloseIcon from '@mui/icons-material/Close';
import { TabContext, TabList } from '@mui/lab';
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
import { employeeInfoValidationSchema } from '../../../common';
import { IEmployee } from '../../../models/IEmployee';
import { useAppSelector } from '../../../reduxSaga/hooks';
import { newEmployeeSelector } from '../../../reduxSaga/slices/employee.slice';
import { TabPanel } from '../TabContextCustom/TabPanel';
import CertificateTab from './CertificateTab';
import EmployeeInfoTab from './EmployeeInfoTab';
import FamifyInfoTab from './FamifyInfoTab';
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
    isOpen: boolean;
    title: string;
    handleClose: () => void;
    handleUpdate: (newEmployee: IEmployee) => void;
    handleRegister: () => void;
    employeeData: IEmployee;
};

const EditEmployeeModalContainer: React.FunctionComponent<IProps> = ({
    isOpen,
    title,
    handleClose,
    handleUpdate,
    handleRegister,
    employeeData
}) => {
    const { classes } = useStyles();

    const [value, setValue] = useState<string>('1');
    const {
        certificates: certificatesNew,
        familyRelations: familyRelationsNew
    } = useAppSelector(newEmployeeSelector);

    const handleCancel = () => {
        handleClose();
    };

    const { employeeInfo, certificates, familyRelations } = employeeData;

    const handleChangeTab = (
        event: React.SyntheticEvent,
        newValue: string,
        errors: any,
        touched: any
    ) => {
        // if (isEmptyObject(errors) && !isEmptyObject(touched)) {
        //     setValue(newValue);
        // }
        setValue(newValue);
    };

    return (
        <Formik
            initialValues={{
                ...employeeInfo,
                dateOfBirth: employeeInfo.dateOfBirth?.split(' ')[0]
            }}
            onSubmit={() => {}}
            enableReinitialize
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
                                        value={value}
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
                                    <CertificateTab
                                        certificates={certificates}
                                    />
                                </TabPanel>
                                <TabPanel value='3'>
                                    <FamifyInfoTab
                                        familyRelations={familyRelations}
                                    />
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
                                color='warning'
                                autoFocus
                                onClick={() =>
                                    handleUpdate({
                                        employeeInfo: values,
                                        certificates: certificatesNew,
                                        familyRelations: familyRelationsNew
                                    })
                                }
                            >
                                Cập nhật
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

export default EditEmployeeModalContainer;
