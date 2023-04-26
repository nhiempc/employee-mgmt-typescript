import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import {
    STATUS,
    approvedEmployeeStatus,
    headerPendingEmployee
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import { useEffect } from 'react';

const ApprovedContainer = () => {
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
                employee.code ?? 'Không có mã nhân viên',
                employee.fullName ?? 'Không có tên',
                employee.email ?? 'Không có Email',
                employee.phone ?? 'Không có số điện thoại',
                STATUS[employee.status] ?? 'Không có trạng thái'
            ]);
            idData.push(Number(employee.employeeId));
            return rowData;
        });
    }

    useEffect(() => {
        const payload = {
            status: approvedEmployeeStatus,
            page,
            perPage
        };
        dispatch(employeeActions.fetchEmployeeByStatus(payload));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const payload = {
            status: approvedEmployeeStatus
        };
        dispatch(employeeActions.fetchEmployeeCount(payload));
    }, [dispatch]);

    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                maxHeight={550}
                isInfo={true}
                idData={idData}
                headerData={headerPendingEmployee}
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
    );
};

export default ApprovedContainer;
