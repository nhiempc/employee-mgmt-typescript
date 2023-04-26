import { useEffect } from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useStyles } from './style';
import { useState } from 'react';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import { STATUS, headerNewEmployee, newEmployeeStatus } from '../../common';
import PaginationBase from '../Common/Pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import AddEmployeeModalContainer from '../Common/AddEmployeeModal/AddEmployeeModalContainer';
import EditEmployeeModalContainer from '../Common/EditEmployeeModal/EditEmployeeModalContainer';

const NewEmployeeContainer = () => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 10
    });
    const dataEmployees = useAppSelector(employeeByStatusSelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const totalEmployee = useAppSelector(totalEmployeeSelector);

    const rowData: any[][] = [];
    const idData: number[] = [];
    let totalPageNum = 0;

    if (totalEmployee % perPage === 0) {
        totalPageNum = totalEmployee / perPage;
    } else {
        totalPageNum = Math.floor(totalEmployee / perPage + 1);
    }

    if (dataEmployees && dataEmployees.length > 0) {
        dataEmployees.map((employee) => {
            rowData.push([
                employee.code,
                employee.fullName,
                employee.email,
                employee.phone,
                employee.citizenId,
                STATUS[employee.status]
            ]);
            idData.push(Number(employee.employeeId));
            return rowData;
        });
    }

    useEffect(() => {
        const payload = {
            status: newEmployeeStatus,
            page,
            perPage
        };
        dispatch(employeeActions.fetchEmployeeByStatus(payload));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const payload = {
            status: newEmployeeStatus
        };
        dispatch(employeeActions.fetchEmployeeCount(payload));
    }, [dispatch]);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenAddEmployeeInfo = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddEmployeeInfo = () => {
        setOpenAddModal(false);
    };

    const handleOpenEditEmployeeInfo = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditEmployeeInfo = () => {
        setOpenEditModal(false);
    };

    const handleSaveEmployeeInfo = () => {};

    const handleRegister = () => {};

    const handleUpdateEmployeeInfo = () => {};

    return (
        <>
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
                    onClick={handleOpenAddEmployeeInfo}
                >
                    Tạo mới
                </Button>
                <ListTemplate
                    maxHeight={550}
                    editConditionalArr={[STATUS[1], STATUS[4], STATUS[6]]}
                    infoConditionalArr={[STATUS[2], STATUS[3]]}
                    deleteConditionalArr={[STATUS[1]]}
                    idData={idData}
                    handleEdit={handleOpenEditEmployeeInfo}
                    headerData={headerNewEmployee}
                    rowData={rowData}
                    isLoading={isLoading}
                />
                <PaginationBase
                    perPage={perPage}
                    totalPage={totalPageNum}
                    pageIndex={page}
                    changePage={_changePage}
                    changePerPage={_changePerPage}
                />
            </Box>
            <AddEmployeeModalContainer
                title={'Tạo mới nhân viên'}
                isOpen={openAddModal}
                handleClose={handleCloseAddEmployeeInfo}
                handleSave={handleSaveEmployeeInfo}
                handleRegister={handleRegister}
            />
            <EditEmployeeModalContainer
                title={'Chỉnh sửa nhân viên'}
                isOpen={openEditModal}
                handleClose={handleCloseEditEmployeeInfo}
                handleUpdate={handleUpdateEmployeeInfo}
                handleRegister={handleRegister}
            />
        </>
    );
};

export default NewEmployeeContainer;
