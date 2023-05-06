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
    headerProposalConsultation,
    initProposalConsultationForm,
    proposalValidationSchema
} from '../../../common';
import ListTemplate from '../ListTemplate';
// styles
import { FastField, Formik } from 'formik';
import moment from 'moment';
import { formatDate } from '../../../helpers/common';
import usePagination from '../../../hooks/usePagination';
import {
    IProposalConsultation,
    initProposalConsultation
} from '../../../models/IProposalConsultation';
import { useAppDispatch, useAppSelector } from '../../../reduxSaga/hooks';
import {
    isLoadingSelector,
    proposalActions,
    proposalHistoryCountSelector,
    proposalHistorySelector
} from '../../../reduxSaga/slices/proposal.slice';
import { employeeApi, proposalConsultationApi } from '../../../services';
import InputField from '../CustomFields/InputField/InputField';
import DeleteModal from '../DeleteModal';
import PaginationBase from '../Pagination';
import ProposalConsultationModal from '../ProposalConsultationModal';
import SendLeaderModal from '../SendLeaderModal';
import CustomizedSnackbars, {
    AlertColor
} from '../SnackBarCustom/SnackBarCustom';
import useStyles, { InputLabelProps, InputProps } from './styles';

type IProps = {
    employeeId: number;
};

const ProposalConsultation: React.FunctionComponent<IProps> = ({
    employeeId
}) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 5
    });
    const proposalHistory = useAppSelector(proposalHistorySelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const proposalCount = useAppSelector(proposalHistoryCountSelector);

    const [openProposalConsultation, setOpenProposalConsultation] =
        useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<IProposalConsultation>(
        initProposalConsultationForm
    );
    const [proposalConsultationData, setProposalConsultationData] =
        useState<IProposalConsultation>(initProposalConsultation);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [
        isOpenProposalConsultationModal,
        setIsOpenProposalConsultationModal
    ] = useState<boolean>(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] =
        useState<boolean>(false);
    const [proposalList, setProposalList] = useState<IProposalConsultation[]>([
        ...proposalHistory
    ]);
    const [proposalTotal, setProposalTotal] = useState<number>(proposalCount);
    const [btnClicked, setBtnClicked] = useState<string>('');

    useEffect(() => {
        const payload = {
            employeeId: employeeId,
            page,
            perPage
        };
        dispatch(proposalActions.fetchProposalHistory(payload));
    }, [dispatch, employeeId, page, perPage]);

    useEffect(() => {
        const payload = {
            employeeId: employeeId
        };
        dispatch(proposalActions.fetchProposalHistoryCount(payload));
    }, [dispatch, employeeId]);

    useEffect(() => {
        setProposalList(proposalHistory);
    }, [proposalHistory]);

    useEffect(() => {
        setProposalTotal(proposalCount);
    }, [proposalCount]);

    let totalPageNum = 0;
    if (proposalTotal % perPage === 0) {
        totalPageNum = proposalTotal / perPage;
    } else {
        totalPageNum = Math.floor(proposalTotal / perPage + 1);
    }

    const rowData: any[][] = [];

    const idData: number[] = [];

    if (proposalList && proposalList.length > 0) {
        proposalList.map((item: any) => {
            rowData.push([
                item.type,
                moment(item.date).format('DD/MM/YYYY'),
                item.note,
                item.content
            ]);
            idData.push(Number(item.proposalConsultationId));
            return rowData;
        });
    }

    const handleShowAlert = (severityValue: AlertColor, content: string) => {
        setSeverity(severityValue);
        setAlertContent(content);
        setOpen(true);
    };

    const handleClickProposalConsultation = () => {
        setOpenProposalConsultation(!openProposalConsultation);
    };

    const handleEditProposalConsultation = (id: number) => {
        const editItem = proposalHistory.filter(
            (item: any) => item.proposalConsultationId === id
        );
        const newData = { ...editItem[0], date: formatDate(editItem[0].date) };
        setIsEdit(true);
        setDataEdit({ ...dataEdit, ...newData });
    };

    const handleAdd = (proposalData: IProposalConsultation) => {
        proposalConsultationApi
            .addProposalConsultation(employeeId, proposalData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Thêm đề xuất tham mưu thành công'
                    );
                    setIsOpenProposalConsultationModal(true);
                    dispatch(proposalActions.setProposalHistory(respone.data));
                    dispatch(
                        proposalActions.setProposalHistoryCount(
                            respone.data.length
                        )
                    );
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleUpdate = (proposalData: IProposalConsultation) => {
        proposalConsultationApi
            .updateProposalConsultation(
                Number(dataEdit.proposalConsultationId),
                proposalData
            )
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Cập nhật thông tin đề xuất tham mưu thành công'
                    );
                    dispatch(proposalActions.updateProposal(respone.data));
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
        proposalConsultationApi
            .deleteProposalConsultation(Number(deleteId))
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert('success', 'Xóa đề xuất thành công');
                    dispatch(proposalActions.deleteProposal(Number(deleteId)));
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
                    setIsOpenProposalConsultationModal(false);
                } else {
                    handleShowAlert('warning', respone.message);
                    setIsOpenSendLeaderModal(false);
                    setIsOpenProposalConsultationModal(false);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
                setIsOpenSendLeaderModal(false);
                setIsOpenProposalConsultationModal(false);
            });
    };

    const handleReset = () => {
        setDataEdit(initProposalConsultationForm);
    };

    const handleOpenDeleteModal = (id: number) => {
        setDeleteId(id);
        setIsOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const handleCloseProposalConsultationModal = () => {
        setIsOpenProposalConsultationModal(false);
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
                setDataEdit(initProposalConsultationForm);
                resetForm();
                if (btnClicked === 'add') {
                    setProposalConsultationData(values);
                    handleAdd(values);
                } else {
                    handleUpdate(values);
                }
            }}
            validationSchema={proposalValidationSchema}
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
                                    onClick={handleClickProposalConsultation}
                                    className={classes.listHeader}
                                >
                                    <ListItemText primary='Đề xuất tham mưu' />
                                    {openProposalConsultation ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                                <Collapse
                                    in={openProposalConsultation}
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
                                            xs={3}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Loại tham mưu{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.type ? true : false
                                                }
                                                name='type'
                                                component={InputField}
                                                label='Loại tham mưu'
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
                                                label='Ngày đăng ký'
                                                fullWidth={true}
                                                InputLabelProps={
                                                    InputLabelProps
                                                }
                                                type='date'
                                                inputProps={InputProps}
                                                variant='outlined'
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
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
                                            xs={6}
                                            className={classes.infoItem}
                                        >
                                            <Typography variant='body2'>
                                                Nội dung{' '}
                                                <span style={{ color: 'red' }}>
                                                    *
                                                </span>
                                            </Typography>
                                            <FastField
                                                error={
                                                    errors.content
                                                        ? true
                                                        : false
                                                }
                                                name='content'
                                                component={InputField}
                                                label='Nội dung'
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
                                            xs={6}
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
                                            headerData={
                                                headerProposalConsultation
                                            }
                                            idData={idData}
                                            rowData={rowData}
                                            isEdit={true}
                                            isDelete={true}
                                            isLoading={isLoading}
                                            handleEdit={
                                                handleEditProposalConsultation
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
                        <ProposalConsultationModal
                            isOpen={isOpenProposalConsultationModal}
                            title={'Đề xuất tham mưu'}
                            handleClose={handleCloseProposalConsultationModal}
                            proposalConsultationData={proposalConsultationData}
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

export default ProposalConsultation;
