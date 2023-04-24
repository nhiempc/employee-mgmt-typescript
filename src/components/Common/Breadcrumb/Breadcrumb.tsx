import { Breadcrumbs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumb = () => {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname
        .split('/')
        .filter((crumb: string) => crumb !== '')
        .map((crumb: string, index: number) => {
            currentLink += `/${crumb}`;
            if (crumb === 'leader') {
                crumb = 'Lãnh đạo';
            }
            if (crumb === 'pending') {
                crumb = 'Chờ duyệt';
            }
            if (crumb === 'approved') {
                crumb = 'Chấp thuận';
            }
            if (crumb === 'employee') {
                crumb = 'Quản lý nhân viên';
            }
            if (crumb === 'create') {
                crumb = 'Tạo mới';
            }
            if (crumb === 'manage') {
                crumb = 'Quản lý';
            }
            if (crumb === 'end') {
                crumb = 'Kết thúc';
            }
            if (crumb === 'related_content') {
                crumb = 'Nội dung liên quan';
            }
            return (
                <div className='crumb' key={index}>
                    <Link
                        to={currentLink}
                        style={{
                            textDecoration: 'none',
                            color: `${process.env.REACT_APP_THEME_COLOR}`
                        }}
                    >
                        {crumb}
                    </Link>
                </div>
            );
        });

    return (
        <div className='breadcrumb'>
            <Breadcrumbs separator='>' sx={{ mx: 4, mt: 2 }}>
                <Link
                    to={'/'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: `${process.env.REACT_APP_THEME_COLOR}`
                    }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize='small' />
                    Trang chủ
                </Link>
                {crumbs}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;
