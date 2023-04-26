import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tab,
    Tabs,
    Typography,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';
import { useState } from 'react';
import EmployeeInfoTab from './EmployeeInfoTab';
import CertificateTab from './CertificateTab';
import FamifyInfoTab from './FamifyInfoTab';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    const handleChangeTabContent = (event: any) => {};

    return (
        <div
            onChange={handleChangeTabContent}
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

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
    handleSave: () => void;
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

    const [value, setValue] = useState<number>(0);

    const handleCancel = () => {
        handleClose();
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
            <DialogContent dividers className={classes.modalContent}>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        aria-label='basic tabs example'
                    >
                        <Tab label='Thông tin nhân viên' {...a11yProps(0)} />
                        <Tab label='Thông tin văn bằng' {...a11yProps(1)} />
                        <Tab label='Quan hệ gia đình' {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <EmployeeInfoTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CertificateTab />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FamifyInfoTab />
                </TabPanel>
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
                    onClick={() => handleSave()}
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
};

export default AddEmployeeModalContainer;
