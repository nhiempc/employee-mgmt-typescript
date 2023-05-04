import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useTabContext } from '@mui/lab';
import { Box } from '@mui/material';

interface TabProps {
    value: string;
}

export const TabPanel: FunctionComponent<PropsWithChildren<TabProps>> = ({
    children,
    value
}) => {
    const { value: contextValue } = useTabContext() || {};
    return (
        <Box
            width={'100%'}
            sx={{ display: value === contextValue ? 'block' : 'none' }}
            key={value}
        >
            {children}
        </Box>
    );
};
