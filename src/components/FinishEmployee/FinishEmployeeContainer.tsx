import { Box } from '@mui/system';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    GENDER,
    STATUS,
    SUCCESS_CODE,
    errorMessage,
    finishEmployeeStatus,
    headerApprovedEmployee
} from '../../common';
import usePagination from '../../hooks/usePagination';
import { IEmployee, initEmployee } from '../../models/IEmployee';
import { IForm, initForm } from '../../models/IForm';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import { employeeApi } from '../../services';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import CustomizedSnackbars, {
    AlertColor
} from '../Common/SnackBarCustom/SnackBarCustom';
import StoreProfileModal from '../Common/StoreProfileModal';
import ViewProfileModal from '../Common/ViewProfileModal';

const FinishEmployeeContainer = () => {
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
    const [isOpenSaveProfileModal, setIsOpenSaveProfileModal] =
        useState<boolean>(false);
    const [profileData, setProfileData] = useState<IForm>(initForm);
    const [employee, setEmployee] = useState<IEmployee>(initEmployee);

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
                employee.code ?? '-',
                employee.fullName ?? '-',
                moment(employee.dateOfBirth).format('DD/MM/YYYY') ===
                'Invalid date'
                    ? '-'
                    : moment(employee.dateOfBirth).format('DD/MM/YYYY'),
                GENDER[employee.gender] ?? '-',
                employee.address ?? '-',
                STATUS[employee.status] ?? '-'
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

    useEffect(() => {
        if (employee.employeeInfo) {
            dispatch(
                employeeActions.addCurrentStatus(employee.employeeInfo.status)
            );
        } else {
            return;
        }
    }, [dispatch, employee.employeeInfo]);

    const handleCloseViewProfileModal = () => {
        setIsOpenViewProfileModal(false);
    };

    const handleOpenSaveProfileModal = () => {
        setIsOpenSaveProfileModal(true);
    };

    const handleCloseSaveProfileModal = () => {
        setIsOpenSaveProfileModal(false);
    };

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

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

    const handleSaveProfile = (storeData: any) => {
        employeeApi
            .storeProfile(Number(employee.employeeInfo.employeeId), storeData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Lưu trữ thông tin hồ sơ thành công'
                    );
                    dispatch(employeeActions.updateEmployee(respone.data));
                    setIsOpenViewProfileModal(false);
                    setIsOpenSaveProfileModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenViewProfileModal(false);
                    setIsOpenSaveProfileModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenViewProfileModal(false);
                setIsOpenSaveProfileModal(false);
            });
    };

    return (
        <>
            <Box sx={{ padding: '24px' }}>
                <ListTemplate
                    maxHeight={550}
                    isInfo={true}
                    editConditionalArr={[STATUS[9], STATUS[11]]}
                    idData={idData}
                    headerData={headerApprovedEmployee}
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
                handleStoreProfile={handleOpenSaveProfileModal}
            />
            <StoreProfileModal
                isOpen={isOpenSaveProfileModal}
                title={'Lưu hồ sơ'}
                handleClose={handleCloseSaveProfileModal}
                handleSaveProfile={handleSaveProfile}
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

export default FinishEmployeeContainer;
