import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import {
    STATUS,
    SUCCESS_CODE,
    errorMessage,
    headerPendingEmployee,
    pendingEmployeeStatus
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import { useEffect, useState } from 'react';
import CustomizedSnackbars from '../Common/SnackBarCustom/SnackBarCustom';
import { AlertColor } from '../Common/SnackBarCustom/SnackBarCustom';
import RejectModal from '../Common/RejectModal';
import { IForm, initForm } from '../../models/IForm';
import { IEmployee, initEmployee } from '../../models/IEmployee';
import PendingProfileModal from '../Common/PendingProfileModal';
import { employeeApi } from '../../services';
import ApprovalModal from '../Common/ApprovalModal';
import RequiredSupplementModal from '../Common/RequiredSupplementModal';

const PendingContainer = () => {
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
    const [isOpenViewProfileModal, setIsOpenViewProfileModal] = useState(false);
    const [isOpenRejectModal, setIsOpenRejectModal] = useState<boolean>(false);
    const [isOpenApprovalModal, setIsOpenApprovalModal] =
        useState<boolean>(false);
    const [isOpenRequiredSupplementModal, setIsOpenRequiredSupplementModal] =
        useState<boolean>(false);
    const [profileData, setProfileData] = useState<IForm>(initForm);
    const [employee, setEmployee] = useState<IEmployee>(initEmployee);
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
            status: pendingEmployeeStatus,
            page,
            perPage
        };
        dispatch(employeeActions.fetchEmployeeByStatus(payload));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        const payload = {
            status: pendingEmployeeStatus
        };
        dispatch(employeeActions.fetchEmployeeCount(payload));
    }, [dispatch]);

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleOpenRejectModal = () => {
        setIsOpenRejectModal(true);
    };

    const handleOpenApprovalModal = () => {
        setIsOpenApprovalModal(true);
    };

    const handleOpenRequiredSupplementModal = () => {
        setIsOpenRequiredSupplementModal(true);
    };

    const handleCloseRejectModal = () => {
        setIsOpenRejectModal(false);
    };

    const handleCloseApprovalModal = () => {
        setIsOpenApprovalModal(false);
    };

    const handleCloseRequiredSupplementModal = () => {
        setIsOpenRequiredSupplementModal(false);
    };

    const handleCloseViewProfileModal = () => {
        setIsOpenViewProfileModal(false);
    };

    const handleShowProfile = (employeeId: number) => {
        setEmployeeId(employeeId);
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

    const handleRejectProfile = (rejectData: any) => {
        employeeApi
            .rejectProfile(employeeId, rejectData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Từ chối hồ sơ thành công');
                    setIsOpenRejectModal(false);
                    setIsOpenViewProfileModal(false);
                    dispatch(
                        employeeActions.fetchEmployeeByStatus({
                            status: pendingEmployeeStatus,
                            page,
                            perPage
                        })
                    );
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenRejectModal(false);
                    setIsOpenViewProfileModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenRejectModal(false);
                setIsOpenViewProfileModal(false);
            });
    };

    const handleApprovalProfile = (status: number) => {
        employeeApi
            .approvalProfile(employeeId, status)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Phê duyệt hồ sơ thành công');
                    setIsOpenApprovalModal(false);
                    setIsOpenViewProfileModal(false);
                    dispatch(
                        employeeActions.fetchEmployeeByStatus({
                            status: pendingEmployeeStatus,
                            page,
                            perPage
                        })
                    );
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenApprovalModal(false);
                    setIsOpenViewProfileModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenApprovalModal(false);
                setIsOpenViewProfileModal(false);
            });
    };

    const handleRequiredSupplementProfile = (requiredSupplementData: any) => {
        employeeApi
            .requiredSupplementProfile(employeeId, requiredSupplementData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Đã gửi yêu cầu bổ sung');
                    setIsOpenRequiredSupplementModal(false);
                    setIsOpenViewProfileModal(false);
                    dispatch(
                        employeeActions.fetchEmployeeByStatus({
                            status: pendingEmployeeStatus,
                            page,
                            perPage
                        })
                    );
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenRequiredSupplementModal(false);
                    setIsOpenViewProfileModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenRequiredSupplementModal(false);
                setIsOpenViewProfileModal(false);
            });
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
            <RejectModal
                isOpen={isOpenRejectModal}
                handleClose={handleCloseRejectModal}
                title={'Từ chối phê duyệt'}
                handleSubmit={handleRejectProfile}
            />
            <ApprovalModal
                isOpen={isOpenApprovalModal}
                title={'Xác nhận phê duyệt'}
                handleClose={handleCloseApprovalModal}
                handleSubmit={handleApprovalProfile}
            />
            <RequiredSupplementModal
                isOpen={isOpenRequiredSupplementModal}
                title={'Yêu cầu bổ sung'}
                handleClose={handleCloseRequiredSupplementModal}
                handleSubmit={handleRequiredSupplementProfile}
            />
            <PendingProfileModal
                isOpen={isOpenViewProfileModal}
                title={'Chi tiết hồ sơ'}
                profileData={profileData}
                employee={employee}
                handleClose={handleCloseViewProfileModal}
                handleReject={handleOpenRejectModal}
                handleApprove={handleOpenApprovalModal}
                handleRequiredSupplement={handleOpenRequiredSupplementModal}
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

export default PendingContainer;
