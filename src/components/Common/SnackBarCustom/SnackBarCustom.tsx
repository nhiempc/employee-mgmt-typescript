/* eslint-disable */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export type AlertColor = 'error' | 'warning' | 'info' | 'success';

interface appProps {
    contentSnack: string;
    severity: AlertColor;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomizedSnackbars: React.FunctionComponent<appProps> = ({
    contentSnack,
    severity,
    open,
    setOpen
}) => {
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {contentSnack}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default CustomizedSnackbars;
