import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import {
    STATUS,
    SUCCESS_CODE,
    errorMessage,
    headerNewEmployee,
    newEmployeeStatus
} from '../../common';
import usePagination from '../../hooks/usePagination';
import { initCV } from '../../models/ICV';
import {
    IEmployee,
    INewEmployee,
    initEmployeeInfo
} from '../../models/IEmployee';
import { IForm } from '../../models/IForm';
import { initResume } from '../../models/IResume';
import { useAppDispatch, useAppSelector } from '../../reduxSaga/hooks';
import {
    employeeActions,
    employeeByStatusSelector,
    isLoadingSelector,
    totalEmployeeSelector
} from '../../reduxSaga/slices/employee.slice';
import { employeeApi } from '../../services';
import AddEmployeeModalContainer from '../Common/AddEmployeeModal/AddEmployeeModalContainer';
import DeleteModal from '../Common/DeleteModal';
import EditEmployeeModalContainer from '../Common/EditEmployeeModal/EditEmployeeModalContainer';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import ProfileModal from '../Common/ProfileModal';
import SendLeaderModal from '../Common/SendLeaderModal';
import CustomizedSnackbars from '../Common/SnackBarCustom';
import { AlertColor } from '../Common/SnackBarCustom/SnackBarCustom';
import ViewProfileModal from '../Common/ViewProfileModal';
import { useStyles } from './style';
import { IRegister } from '../../models/IRegister';

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

    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenProfileModal, setIsOpenProfileModal] =
        useState<boolean>(false);
    const [isOpenViewProfileModal, setIsOpenViewProfileModal] = useState(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [newEmployee, setNewEmployee] = useState<IEmployee>({
        employeeInfo: initEmployeeInfo,
        certificates: [],
        familyRelations: []
    });
    const [profileData, setProfileData] = useState<IForm>({
        employeeId: 0,
        cv: initCV,
        resume: initResume
    });
    const [employee, setEmployee] = useState<IEmployee>({
        employeeInfo: initEmployeeInfo,
        certificates: [],
        familyRelations: []
    });

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

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleCloseProfileModal = () => {
        setIsOpenProfileModal(false);
    };

    const handleCloseViewProfileModal = () => {
        setIsOpenViewProfileModal(false);
    };

    const handleOpenSendLeaderModal = () => {
        setIsOpenSendLeaderModal(true);
    };

    const handleCloseSendLeaderModal = () => {
        setIsOpenSendLeaderModal(false);
    };

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleAddEmployee = (newEmployee: INewEmployee) => {
        employeeApi
            .saveEmployee(newEmployee)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Thêm mới nhân viên thành công');
                    setNewEmployee(respone.data);
                } else {
                    handleShowAlert('warning', respone.message);
                    setOpenAddModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setOpenAddModal(false);
            });
    };

    const handleDeleteEmployeeClick = (employeeId: number) => {
        setDeleteId(employeeId);
        setIsOpenDeleteModal(true);
    };

    const handleDeleteEmployee = () => {
        employeeApi
            .deleteEmployee(deleteId)
            .then((respone: any) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Xóa nhân viên thành công');
                    setIsOpenDeleteModal(false);
                    dispatch(employeeActions.deleteEmployee(deleteId));
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenDeleteModal(false);
                }
            })
            .catch((err: any) => {
                handleShowAlert('error', errorMessage);
                setIsOpenDeleteModal(false);
            });
    };

    const handleSaveProfile = (employeeId: number, formData: IForm) => {
        employeeApi
            .saveProfile(employeeId, formData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Lưu thông tin hồ sơ thành công'
                    );
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleSendLeader = (registerInfo: IRegister) => {
        const employeeId = Number(newEmployee.employeeInfo.employeeId);
        employeeApi
            .sendLeader(employeeId, registerInfo)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Trình lãnh đạo thành công');
                    setIsOpenSendLeaderModal(false);
                    setIsOpenProfileModal(false);
                    setOpenAddModal(false);
                    setOpenEditModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenSendLeaderModal(false);
                    setIsOpenProfileModal(false);
                    setOpenAddModal(false);
                    setOpenEditModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenSendLeaderModal(false);
                setIsOpenProfileModal(false);
                setOpenAddModal(false);
                setOpenEditModal(false);
            });
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

    const handleRegister = () => {
        setIsOpenProfileModal(true);
    };

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
                    handleDelete={handleDeleteEmployeeClick}
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
            <AddEmployeeModalContainer
                title={'Tạo mới nhân viên'}
                isOpen={openAddModal}
                handleClose={handleCloseAddEmployeeInfo}
                handleSave={handleAddEmployee}
                handleRegister={handleRegister}
            />
            <EditEmployeeModalContainer
                title={'Chỉnh sửa nhân viên'}
                isOpen={openEditModal}
                handleClose={handleCloseEditEmployeeInfo}
                handleUpdate={handleUpdateEmployeeInfo}
                handleRegister={handleRegister}
            />
            <ProfileModal
                isOpen={isOpenProfileModal}
                title={'Thông tin hồ sơ'}
                employeeData={newEmployee}
                handleClose={handleCloseProfileModal}
                handleSaveProfile={handleSaveProfile}
                handleOpenSendLeaderModal={handleOpenSendLeaderModal}
            />
            <ViewProfileModal
                isOpen={isOpenViewProfileModal}
                title={'Chi tiết hồ sơ'}
                profileData={profileData}
                employee={employee}
                handleClose={handleCloseViewProfileModal}
            />
            <SendLeaderModal
                isOpen={isOpenSendLeaderModal}
                title={'Trình lãnh đạo'}
                status={3}
                handleClose={handleCloseSendLeaderModal}
                handleSendLeader={handleSendLeader}
            />
            <DeleteModal
                isOpen={isOpenDeleteModal}
                title={'Bạn có muốn xóa?'}
                handleDelete={handleDeleteEmployee}
                handleClose={handleCloseDeleteModal}
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

export default NewEmployeeContainer;
