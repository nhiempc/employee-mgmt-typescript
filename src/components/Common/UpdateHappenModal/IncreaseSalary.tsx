import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Button,
    Collapse,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    SUCCESS_CODE,
    errorMessage,
    headerIncreaseSalary,
    initSalaryForm,
    salaryValidationSchema
} from '../../../common';
import ListTemplate from '../ListTemplate';
// styles
import currencyFormatter from 'currency-formatter';
import { FastField, Formik } from 'formik';
import moment from 'moment';
import usePagination from '../../../hooks/usePagination';
import { ISalary, initSalay } from '../../../models/ISalary';
import { useAppDispatch, useAppSelector } from '../../../reduxSaga/hooks';
import {
    isLoadingSelector,
    salaryActions,
    salaryHistoryCountSelector,
    salaryHistorySelector
} from '../../../reduxSaga/slices/salary.slice';
import { employeeApi, increaseSalaryApi } from '../../../services';
import InputField from '../CustomFields/InputField/InputField';
import DeleteModal from '../DeleteModal';
import PaginationBase from '../Pagination';
import SendLeaderModal from '../SendLeaderModal';
import CustomizedSnackbars, {
    AlertColor
} from '../SnackBarCustom/SnackBarCustom';
import useStyles, { InputLabelProps, InputProps } from './styles';
import { formatDate } from '../../../helpers/common';
import IncreaseSalaryModal from '../IncreaseSalaryModal';

type IProps = {
    employeeId: number;
};

const IncreaseSalary: React.FunctionComponent<IProps> = ({ employeeId }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 5
    });
    const increaseSalaryHistory = useAppSelector(salaryHistorySelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const increaseSalaryCount = useAppSelector(salaryHistoryCountSelector);

    const [openIncreaseSalary, setOpenIncreaseSalary] =
        useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<ISalary>(initSalaryForm);
    const [salaryData, setSalaryData] = useState<ISalary>(initSalay);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [isOpenIncreaseSalaryModal, setIsOpenIncreaseSalaryModal] =
        useState<boolean>(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] =
        useState<boolean>(false);
    const [increaseSalaryList, setIncreaseSalaryList] = useState<ISalary[]>([
        ...increaseSalaryHistory
    ]);
    const [salaryCount, setSalaryCount] = useState<number>(increaseSalaryCount);
    const [btnClicked, setBtnClicked] = useState<string>('');

    useEffect(() => {
        const payload = {
            employeeId: employeeId,
            page,
            perPage
        };
        dispatch(salaryActions.fetchSalaryHistory(payload));
    }, [dispatch, employeeId, page, perPage]);

    useEffect(() => {
        const payload = {
            employeeId: employeeId
        };
        dispatch(salaryActions.fetchSalaryHistoryCount(payload));
    }, [dispatch, employeeId]);

    useEffect(() => {
        setIncreaseSalaryList(increaseSalaryHistory);
    }, [increaseSalaryHistory]);

    useEffect(() => {
        setSalaryCount(increaseSalaryCount);
    }, [increaseSalaryCount]);

    let totalPageNum = 0;

    if (salaryCount % perPage === 0) {
        totalPageNum = salaryCount / perPage;
    } else {
        totalPageNum = Math.floor(salaryCount / perPage + 1);
    }

    const rowData: any[][] = [];

    const idData: number[] = [];

    if (increaseSalaryList && increaseSalaryList.length > 0) {
        increaseSalaryList.map((salary: any) => {
            rowData.push([
                salary.count,
                salary.salaryScale,
                !salary.salary
                    ? currencyFormatter.format(0, { code: 'VND' })
                    : currencyFormatter.format(salary.salary, { code: 'VND' }),

                moment(salary.date).format('DD/MM/YYYY'),
                salary.reason,
                salary.note
            ]);
            idData.push(Number(salary.salaryId));
            return rowData;
        });
    }

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleClickIncreaseSalary = () => {
        setOpenIncreaseSalary(!openIncreaseSalary);
    };

    const handleEditIncreaseSalary = (id: number) => {
        const editItem = increaseSalaryHistory.filter(
            (item: any) => item.salaryId === id
        );
        const newData = { ...editItem[0], date: formatDate(editItem[0].date) };
        setIsEdit(true);
        setDataEdit({ ...dataEdit, ...newData });
    };

    const handleAdd = (salaryData: ISalary) => {
        increaseSalaryApi
            .addIncreaseSalary(employeeId, salaryData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Thêm đề xuất tăng lương thành công'
                    );
                    dispatch(salaryActions.setSalaryHistory(respone.data));
                    dispatch(
                        salaryActions.setSalaryHistoryCount(respone.data.length)
                    );
                    setIsOpenIncreaseSalaryModal(true);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleUpdate = (salaryData: ISalary) => {
        increaseSalaryApi
            .updateIncreaseSalary(Number(dataEdit.salaryId), salaryData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Cập nhật thông tin tăng lương thành công'
                    );
                    dispatch(salaryActions.updateSalary(respone.data));
                    setIsEdit(false);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleDelete = () => {
        increaseSalaryApi
            .deleteIncreaseSalary(Number(deleteId))
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Xóa thông tin tăng lương thành công'
                    );
                    dispatch(salaryActions.deleteSalary(Number(deleteId)));
                    setIsOpenDeleteModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenDeleteModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenDeleteModal(false);
            });
    };

    const handleSendLeader = (registerInfo: any) => {
        employeeApi
            .sendLeader(employeeId, registerInfo)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Trình lãnh đạo thành công');
                    setIsOpenSendLeaderModal(false);
                    setIsOpenIncreaseSalaryModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenSendLeaderModal(false);
                    setIsOpenIncreaseSalaryModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenSendLeaderModal(false);
                setIsOpenIncreaseSalaryModal(false);
            });
    };

    const handleReset = () => {
        setDataEdit(initSalaryForm);
    };

    const handleOpenDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleCloseIncreaseSalaryModal = () => {
        setIsOpenIncreaseSalaryModal(false);
    };

    const handleOpenSendLeaderModal = () => {
        setIsOpenSendLeaderModal(true);
    };

    const handleCloseSendLeaderModal = () => {
        setIsOpenSendLeaderModal(false);
    };

    return (
        <Formik
            initialValues={dataEdit}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                setDataEdit(initSalaryForm);
                resetForm();
                if (btnClicked === 'add') {
                    setSalaryData(values);
                    handleAdd(values);
                } else {
                    handleUpdate(values);
                }
            }}
            validationSchema={salaryValidationSchema}
        >
            {(formikProps) => {
                const { errors, handleSubmit } = formikProps;
                return (
                    <Grid container>
                        <Grid item xs={12}>
                            <List
                                sx={{
                                    width: '100%',
                                    paddingTop: '16px',
                                    paddingBottom: 0
                                }}
                            >
                                <ListItemButton
                                    onClick={handleClickIncreaseSalary}
                                    className={classes.listHeader}
                                >
                                    <ListItemText primary='Tăng lương' />
                                    {openIncreaseSalary ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                                <Collapse
                                    in={openIncreaseSalary}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            width: '100%',
                                            margin: '0 auto',
                                            paddingRight: '16px'
                                        }}
                                    >
                                        <Grid
                                            item
                                            xs={1}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Bậc{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.salaryScale
                                                        ? true
                                                        : false
                                                }
                                                name='salaryScale'
                                                component={InputField}
                                                label='Bậc lương'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                inputProps={InputProps}
                                                type='number'
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Lương mới{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.salary ? true : false
                                                }
                                                name='salary'
                                                component={InputField}
                                                label='Lương'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                inputProps={InputProps}
                                                type='number'
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Ngày đăng ký{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.date ? true : false
                                                }
                                                name='date'
                                                component={InputField}
                                                label='Ngày'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                inputProps={InputProps}
                                                type='date'
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={5}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Ghi chú{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.note ? true : false
                                                }
                                                name='note'
                                                component={InputField}
                                                label='Ghi chú'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                inputProps={InputProps}
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Lý do tăng lương{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.reason ? true : false
                                                }
                                                name='reason'
                                                component={InputField}
                                                label='Lý do'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                multiline={true}
                                                inputProps={InputProps}
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={5}
                                            className={classes.actionBtnGroup}
                                        >
                                            {!isEdit && (
                                                <Button
                                                    variant='contained'
                                                    onClick={() => {
                                                        setBtnClicked('add');
                                                        handleSubmit();
                                                    }}
                                                >
                                                    Thêm
                                                </Button>
                                            )}
                                            {isEdit && (
                                                <Button
                                                    type='submit'
                                                    variant='contained'
                                                    color='warning'
                                                    onClick={() => {
                                                        setBtnClicked('edit');
                                                        handleSubmit();
                                                    }}
                                                >
                                                    Cập nhật
                                                </Button>
                                            )}
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={handleReset}
                                            >
                                                Nhập lại
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        sx={{ width: '100%', padding: '16px' }}
                                    >
                                        <ListTemplate
                                            maxHeight={250}
                                            headerData={headerIncreaseSalary}
                                            rowData={rowData}
                                            idData={idData}
                                            isEdit={true}
                                            isDelete={true}
                                            isLoading={isLoading}
                                            handleEdit={
                                                handleEditIncreaseSalary
                                            }
                                            handleDelete={handleOpenDeleteModal}
                                        />
                                        <PaginationBase
                                            perPage={perPage}
                                            totalPage={totalPageNum}
                                            pageIndex={page}
                                            changePage={_changePage}
                                            changePerPage={_changePerPage}
                                        />
                                    </Grid>
                                </Collapse>
                            </List>
                        </Grid>
                        <CustomizedSnackbars
                            contentSnack={alertContent}
                            severity={severity}
                            open={open}
                            setOpen={setOpen}
                        />
                        <DeleteModal
                            isOpen={isOpenDeleteModal}
                            handleClose={handleCloseDeleteModal}
                            title={'Xác nhận xóa'}
                            handleDelete={handleDelete}
                        />

                        <IncreaseSalaryModal
                            isOpen={isOpenIncreaseSalaryModal}
                            title={'Đơn đề xuất tăng lương'}
                            handleClose={handleCloseIncreaseSalaryModal}
                            increaseSalaryData={salaryData}
                            employeeId={employeeId}
                            handleSendLeader={handleOpenSendLeaderModal}
                        />

                        <SendLeaderModal
                            isOpen={isOpenSendLeaderModal}
                            title={'Trình lãnh đạo'}
                            status={16}
                            handleClose={handleCloseSendLeaderModal}
                            handleSendLeader={handleSendLeader}
                        />
                    </Grid>
                );
            }}
        </Formik>
    );
};

export default IncreaseSalary;
