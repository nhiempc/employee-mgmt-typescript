import { Box } from '@mui/system';
import { Button } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useStyles } from './style';
import { useState } from 'react';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import { headerNewEmployee } from '../../common';
import PaginationBase from '../Common/Pagination/Pagination';
import usePagination from '../../hooks/usePagination';

const NewEmployeeContainer = () => {
    const { classes } = useStyles();
    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 10
    });

    const rowData: any[][] = [];
    const idData: number[] = [];
    let totalPageNum = 0;

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleShowAddEmployeeInfo = () => {
        setOpenAddModal(!openAddModal);
    };
    return (
        <Box sx={{ padding: '24px' }}>
            <Button
                type='button'
                variant='contained'
                startIcon={<PersonAddAltIcon />}
                className={classes.btn}
                sx={{
                    marginBottom: '12px',
                    backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`
                }}
                onClick={handleShowAddEmployeeInfo}
            >
                Tạo mới
            </Button>
            <ListTemplate
                maxHeight={550}
                idData={idData}
                headerData={headerNewEmployee}
                rowData={rowData}
            />
            <PaginationBase
                perPage={perPage}
                totalPage={totalPageNum}
                pageIndex={page}
                changePage={_changePage}
                changePerPage={_changePerPage}
            />
        </Box>
    );
};

export default NewEmployeeContainer;
