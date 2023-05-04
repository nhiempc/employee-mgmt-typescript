import { TabList } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import React from 'react';
import { TabPanel } from './TabPanel';

interface TabContextProps {
    componentOne?: React.ReactNode;
    componentTwo?: React.ReactNode;
    componentThee?: React.ReactNode;
    labelOne: string;
    labelTwo?: string;
    labelThree?: string;
}

const TabContextCustom = ({
    componentOne,
    componentTwo,
    componentThee,
    labelOne = 'item1',
    labelTwo = 'item2',
    labelThree = 'item3'
}: TabContextProps) => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value}>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex'
                    }}
                >
                    <TabList
                        style={{ height: '83vh', position: 'sticky', top: 0 }}
                        orientation='vertical'
                        variant='scrollable'
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',
                            minWidth: '200px'
                        }}
                    >
                        <Tab label={labelOne} value='1' />
                        {componentTwo && <Tab label={labelTwo} value='2' />}
                        {componentThee && <Tab label={labelThree} value='3' />}
                    </TabList>

                    <TabPanel value='1'>{componentOne}</TabPanel>
                    {componentTwo && (
                        <TabPanel value='2'>{componentTwo}</TabPanel>
                    )}
                    {componentThee && (
                        <TabPanel value='3'>{componentThee}</TabPanel>
                    )}
                </Box>
            </TabContext>
        </>
    );
};

export default TabContextCustom;
