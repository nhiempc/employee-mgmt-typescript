import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import {
    GENDER,
    STATUS,
    SUCCESS_CODE,
    errorMessage,
    headerApprovedEmployee,
    manageEmployeeStatus
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CustomizedSnackbars, {
    AlertColor
} from '../Common/SnackBarCustom/SnackBarCustom';
import { employeeApi } from '../../services';
import UpdateHappenModal from '../Common/UpdateHappenModal';
import TerminateRequestModal from '../Common/TerminateRequestModal';

const ManageEmployeeContainer = () => {
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
    const [openUpdateHappenModal, setOpenUpdateHappenModal] =
        useState<boolean>(false);
    const [openTerminateRequestModal, setOpenTerminateRequestModal] =
        useState<boolean>(false);
    const [employeeId, setEmployeeId] = useState<number>(0);

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
            status: manageEmployeeStatus,
            page,
            perPage
        };
        dispatch(employeeActions.fetchEmployeeByStatus(payload));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const payload = {
            status: manageEmployeeStatus
        };
        dispatch(employeeActions.fetchEmployeeCount(payload));
    }, [dispatch]);

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleOpenUpdateHappenModal = (employeeId: number) => {
        setOpenUpdateHappenModal(true);
        setEmployeeId(employeeId);
    };

    const handleCloseUpdateHappenModal = () => {
        setOpenUpdateHappenModal(false);
    };

    const handleOpenTerminateRequestModal = (employeeId: number) => {
        setOpenTerminateRequestModal(true);
        setEmployeeId(employeeId);
    };

    const handleCloseTerminateRequestModal = () => {
        setOpenTerminateRequestModal(false);
    };

    const handleSendTerminateRequest = (terminateRequest: any) => {
        employeeApi
            .sendTerminateRequest(employeeId, terminateRequest)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Gửi yêu cầu chấm dứt thành công'
                    );
                    dispatch(
                        employeeActions.fetchEmployeeByStatus({
                            status: manageEmployeeStatus,
                            page,
                            perPage
                        })
                    );
                    setOpenTerminateRequestModal(false);
                    setOpenUpdateHappenModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setOpenTerminateRequestModal(false);
                    setOpenUpdateHappenModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setOpenTerminateRequestModal(false);
                setOpenUpdateHappenModal(false);
            });
    };

    return (
        <>
            <Box sx={{ padding: '24px' }}>
                <ListTemplate
                    maxHeight={550}
                    isInfo={true}
                    idData={idData}
                    headerData={headerApprovedEmployee}
                    rowData={rowData}
                    isLoading={isLoading}
                    handleShowInfo={handleOpenUpdateHappenModal}
                />
                <PaginationBase
                    perPage={perPage}
                    totalPage={totalPageNum}
                    pageIndex={page}
                    changePage={_changePage}
                    changePerPage={_changePerPage}
                />
            </Box>
            <UpdateHappenModal
                isOpen={openUpdateHappenModal}
                title={'Cập nhật diễn biến'}
                handleClose={handleCloseUpdateHappenModal}
                employeeId={employeeId}
                handleTerminate={handleOpenTerminateRequestModal}
            />
            {employeeId && (
                <TerminateRequestModal
                    isOpen={openTerminateRequestModal}
                    title={'Biểu mẫu nghỉ việc'}
                    handleClose={handleCloseTerminateRequestModal}
                    employeeId={employeeId}
                    handleSendTerminateRequest={handleSendTerminateRequest}
                />
            )}
            <CustomizedSnackbars
                contentSnack={alertContent}
                severity={severity}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default ManageEmployeeContainer;
