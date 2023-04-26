import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import {
    GENDER,
    STATUS,
    finishEmployeeStatus,
    headerApprovedEmployee
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import moment from 'moment';
import { useEffect } from 'react';

const FinishEmployeeContainer = () => {
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
                moment(employee.dateOfBirth).format('DD/MM/YYYY') ===
                'Invalid date'
                    ? moment().format('DD/MM/YYYY')
                    : moment(employee.dateOfBirth).format('DD/MM/YYYY'),
                GENDER[employee.gender] ?? 'Nam',
                employee.address ?? 'Không có địa chỉ',
                STATUS[employee.status] ?? 'Không có trạng thái'
            ]);
            idData.push(Number(employee.employeeId));
            return rowData;
        });
    }

    useEffect(() => {
        const payload = {
            status: finishEmployeeStatus,
            page,
            perPage
        };
        dispatch(employeeActions.fetchEmployeeByStatus(payload));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const payload = {
            status: finishEmployeeStatus
        };
        dispatch(employeeActions.fetchEmployeeCount(payload));
    }, [dispatch]);

    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                maxHeight={550}
                isInfo={true}
                editConditionalArr={[STATUS[9], STATUS[11]]}
                idData={idData}
                headerData={headerApprovedEmployee}
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

export default FinishEmployeeContainer;
