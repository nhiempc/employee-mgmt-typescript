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
    headerPromote,
    initPromoteForm,
    promoteValidationSchema
} from '../../../common';
import ListTemplate from '../ListTemplate';
// styles
import { FastField, Formik } from 'formik';
import moment from 'moment';
import { formatDate } from '../../../helpers/common';
import usePagination from '../../../hooks/usePagination';
import { IPromote, initPromote } from '../../../models/IPromote';
import { useAppDispatch, useAppSelector } from '../../../reduxSaga/hooks';
import {
    isLoadingSelector,
    promoteActions,
    promoteHistoryCountSelector,
    promoteHistorySelector
} from '../../../reduxSaga/slices/promote.slice';
import { employeeApi, promoteApi } from '../../../services';
import InputField from '../CustomFields/InputField/InputField';
import DeleteModal from '../DeleteModal';
import PaginationBase from '../Pagination';
import PromoteModal from '../PromoteModal';
import SendLeaderModal from '../SendLeaderModal';
import CustomizedSnackbars, {
    AlertColor
} from '../SnackBarCustom/SnackBarCustom';
import useStyles, { InputLabelProps, InputProps } from './styles';

type IProps = {
    employeeId: number;
};

const Promote: React.FunctionComponent<IProps> = ({ employeeId }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 5
    });
    const promoteHistory = useAppSelector(promoteHistorySelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const promoteCount = useAppSelector(promoteHistoryCountSelector);

    const [openPromote, setOpenPromote] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<IPromote>(initPromoteForm);
    const [promoteData, setPromoteData] = useState<IPromote>(initPromote);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenPromoteModal, setIsOpenPromoteModal] =
        useState<boolean>(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] =
        useState<boolean>(false);
    const [promoteList, setPromoteList] = useState<IPromote[]>([
        ...promoteHistory
    ]);
    const [promoteTotal, setPromoteTotal] = useState<number>(promoteCount);
    const [btnClicked, setBtnClicked] = useState<string>('');

    useEffect(() => {
        const payload = {
            employeeId: employeeId,
            page,
            perPage
        };
        dispatch(promoteActions.fetchPromoteHistory(payload));
    }, [dispatch, employeeId, page, perPage]);

    useEffect(() => {
        const payload = {
            employeeId: employeeId
        };
        dispatch(promoteActions.fetchPromoteHistoryCount(payload));
    }, [dispatch, employeeId]);

    useEffect(() => {
        setPromoteList(promoteHistory);
    }, [promoteHistory]);

    useEffect(() => {
        setPromoteTotal(promoteCount);
    }, [promoteCount]);

    let totalPageNum = 0;

    if (promoteTotal % perPage === 0) {
        totalPageNum = promoteTotal / perPage;
    } else {
        totalPageNum = Math.floor(promoteTotal / perPage + 1);
    }

    const rowData: any[][] = [];

    const idData: number[] = [];

    if (promoteList && promoteList.length > 0) {
        promoteList.map((promote: any) => {
            rowData.push([
                promote.count,
                moment(promote.date).format('DD/MM/YYYY'),
                promote.oldPosition ?? 'Nhân viên',
                promote.newPosition,
                promote.reason,
                promote.note
            ]);
            idData.push(Number(promote.promotionId));
            return rowData;
        });
    }

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleEditPromote = (id: number) => {
        const editItem = promoteHistory.filter(
            (item: any) => item.promotionId === id
        );
        const newData = { ...editItem[0], date: formatDate(editItem[0].date) };
        setIsEdit(true);
        setDataEdit({ ...dataEdit, ...newData });
    };

    const handleAdd = (promoteData: IPromote) => {
        promoteApi
            .addPromote(employeeId, promoteData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Thêm đề xuất thăng chức thành công'
                    );
                    dispatch(promoteActions.setPromoteHistory(respone.data));
                    dispatch(
                        promoteActions.setPromoteHistoryCount(
                            respone.data.length
                        )
                    );
                    setIsOpenPromoteModal(true);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleUpdate = (promoteData: IPromote) => {
        promoteApi
            .updatePromote(Number(dataEdit.promotionId), promoteData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Cập nhật thông tin thăng chức thành công'
                    );
                    dispatch(promoteActions.updatePromote(respone.data));
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
        promoteApi
            .deletePromote(Number(deleteId))
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Xóa thông tin thăng chức thành công'
                    );
                    dispatch(promoteActions.deletePromote(Number(deleteId)));
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
                    setIsOpenPromoteModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenSendLeaderModal(false);
                    setIsOpenPromoteModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenSendLeaderModal(false);
                setIsOpenPromoteModal(false);
            });
    };

    const handleReset = () => {
        setDataEdit(initPromote);
    };

    const handleClickPromote = () => {
        setOpenPromote(!openPromote);
    };

    const handleOpenDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleClosePromoteModal = () => {
        setIsOpenPromoteModal(false);
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
                setDataEdit(initPromoteForm);
                resetForm();
                if (btnClicked === 'add') {
                    setPromoteData(values);
                    handleAdd(values);
                } else {
                    handleUpdate(values);
                }
            }}
            validationSchema={promoteValidationSchema}
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
                                    onClick={handleClickPromote}
                                    className={classes.listHeader}
                                >
                                    <ListItemText primary='Thăng chức' />
                                    {openPromote ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                                <Collapse
                                    in={openPromote}
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
                                            xs={4}
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
                                                label='Ngày đăng ký'
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
                                            xs={4}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Chức vụ mới{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.newPosition
                                                        ? true
                                                        : false
                                                }
                                                name='newPosition'
                                                component={InputField}
                                                label='Chức vụ mới'
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
                                            xs={4}
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
                                            xs={8}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Lý do{' '}
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
                                            xs={4}
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
                                            headerData={headerPromote}
                                            idData={idData}
                                            rowData={rowData}
                                            isLoading={isLoading}
                                            isEdit={true}
                                            isDelete={true}
                                            handleEdit={handleEditPromote}
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
                        <PromoteModal
                            isOpen={isOpenPromoteModal}
                            title={'Đề xuất thăng chức'}
                            handleClose={handleClosePromoteModal}
                            promoteData={promoteData}
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

export default Promote;
