import React, { FC, useCallback, useState } from 'react';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar/TopBar';
import Breadcrumb from '../../components/Common/Breadcrumb/Breadcrumb';

const MainLayout: FC = ({ children }: any) => {
    const [isDrawer, setIsDrawer] = useState(true);

    const _handleToogleDrawer = useCallback(() => {
        setIsDrawer(!isDrawer);
    }, [isDrawer]);
    return (
        <div className='wrapper' style={{ display: 'flex' }}>
            <NavBar isDrawer={isDrawer} />
            <div className='mainContent' style={{ width: '100%' }}>
                <TopBar
                    isDrawer={isDrawer}
                    handleToogleDrawer={_handleToogleDrawer}
                />
                <Breadcrumb />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
