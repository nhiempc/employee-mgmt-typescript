import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import {
    STATUS,
    SUCCESS_CODE,
    approvedEmployeeStatus,
    errorMessage,
    headerPendingEmployee
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import { useEffect, useState } from 'react';
import CustomizedSnackbars, {
    AlertColor
} from '../Common/SnackBarCustom/SnackBarCustom';
import { IForm, initForm } from '../../models/IForm';
import { IEmployee, initEmployee } from '../../models/IEmployee';
import ViewProfileModal from '../Common/ViewProfileModal';
import { employeeApi } from '../../services';

const ApprovedContainer = () => {
    const dispatch = useAppDispatch();
    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 10
    });
    const dataEmployees = useAppSelector(employeeByStatusSelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const totalEmployee = useAppSelector(totalEmployeeSelector);

    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenViewProfileModal, setIsOpenViewProfileModal] =
        useState<boolean>(false);
    const [profileData, setProfileData] = useState<IForm>(initForm);
    const [employee, setEmployee] = useState<IEmployee>(initEmployee);

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

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

    const handleShowProfile = (employeeId: number) => {
        employeeApi
            .getForm(employeeId)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Lấy thông tin hồ sơ thành công'
                    );
                    setIsOpenViewProfileModal(true);
                    setProfileData(respone.data);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
        employeeApi.getEmployeeById(employeeId).then((respone) => {
            if (respone) {
                setEmployee(respone.data);
            }
        });
    };

    const handleCloseViewProfileModal = () => {
        setIsOpenViewProfileModal(false);
    };

    return (
        <>
            <Box sx={{ padding: '24px' }}>
                <ListTemplate
                    maxHeight={550}
                    isInfo={true}
                    idData={idData}
                    headerData={headerPendingEmployee}
                    rowData={rowData}
                    isLoading={isLoading}
                    handleShowInfo={handleShowProfile}
                />
                <PaginationBase
                    perPage={perPage}
                    totalPage={totalPageNum}
                    pageIndex={page}
                    changePage={_changePage}
                    changePerPage={_changePerPage}
                />
            </Box>
            <ViewProfileModal
                isOpen={isOpenViewProfileModal}
                title={'Chi tiết hồ sơ'}
                profileData={profileData}
                employee={employee}
                handleClose={handleCloseViewProfileModal}
            />

            <CustomizedSnackbars
                contentSnack={alertContent}
                severity={severity}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default ApprovedContainer;
