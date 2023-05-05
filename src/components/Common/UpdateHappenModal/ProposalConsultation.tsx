import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Button,
    Collapse,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    SUCCESS_CODE,
    errorMessage,
    headerProposalConsultation,
    initProposalConsultationForm
} from '../../../common';
import ListTemplate from '../ListTemplate';
// styles
import moment from 'moment';
import usePagination from '../../../hooks/usePagination';
import DeleteModal from '../DeleteModal';
import PaginationBase from '../Pagination';
import SendLeaderModal from '../SendLeaderModal';
import useStyles, { InputLabelProps, InputProps } from './styles';
import CustomizedSnackbars, {
    AlertColor
} from '../SnackBarCustom/SnackBarCustom';
import { employeeApi, proposalConsultationApi } from '../../../services';

type IProps = {
    employeeId: number;
};

const ProposalConsultation: React.FunctionComponent<IProps> = ({
    employeeId
}) => {
    const { classes } = useStyles();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 5
    });

    const [openProposalConsultation, setOpenProposalConsultation] =
        useState(false);
    const [dataEdit, setDataEdit] = useState(initProposalConsultationForm);
    const [proposalConsultationData, setProposalConsultationData] = useState(
        {}
    );
    const [deleteId, setDeleteId] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [
        isOpenProposalConsultationModal,
        setIsOpenProposalConsultationModal
    ] = useState(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] = useState(false);
    const [proposalConsultationHistory, setProposalConsultationHistory] =
        useState([]);
    const [proposalConsultationCount, setProposalConsultationCount] =
        useState(0);

    useEffect(() => {
        proposalConsultationApi
            .getProposalConsultationHistory(employeeId, page, perPage)
            .then((respone) => {
                if (respone) {
                    setProposalConsultationHistory(respone.data);
                }
            });
    }, [employeeId, page, perPage]);

    useEffect(() => {
        proposalConsultationApi
            .getProposalConsultationCount(employeeId)
            .then((respone) => {
                if (respone) {
                    setProposalConsultationCount(respone.data.length);
                }
            });
    }, [employeeId]);

    let totalPageNum = 0;
    if (proposalConsultationCount % perPage === 0) {
        totalPageNum = proposalConsultationCount / perPage;
    } else {
        totalPageNum = Math.floor(proposalConsultationCount / perPage + 1);
    }

    const rowData: any[][] = [];

    const idData: number[] = [];

    if (proposalConsultationHistory && proposalConsultationHistory.length > 0) {
        proposalConsultationHistory.map((item: any) => {
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
        const editItem = proposalConsultationHistory.filter(
            (item: any) => item.proposalConsultationId === id
        );
        setIsEdit(true);
        setDataEdit({ ...editItem });
    };

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        let _name = name.substring(0, name.length - 2);
        setDataEdit({ ...dataEdit, [_name]: value });
    };

    const handleAdd = () => {
        setProposalConsultationData(dataEdit);
        proposalConsultationApi
            .addProposalConsultation(employeeId, dataEdit)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Thêm đề xuất tham mưu thành công'
                    );
                    setIsOpenProposalConsultationModal(true);
                    setDataEdit(initProposalConsultationForm);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleUpdate = () => {
        const proposalConsultationData = {
            type: dataEdit.type,
            content: dataEdit.content,
            date: moment(dataEdit.date).format('YYYY-MM-DD'),
            note: dataEdit.note
        };
        proposalConsultationApi
            .updateProposalConsultation(
                dataEdit.proposalConsultationId,
                proposalConsultationData
            )
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Cập nhật thông tin đề xuất tham mưu thành công'
                    );
                    setDataEdit(initProposalConsultationForm);
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
                    handleShowAlert(
                        'success',
                        'Xóa thông tin tăng lương thành công'
                    );
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
        setDataEdit({});
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
                            <Grid item xs={3} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Loại tham mưu{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    size='small'
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    label='Loại'
                                    InputLabelProps={InputLabelProps}
                                    name='typePC'
                                    id='typePC'
                                    value={dataEdit.type ?? ''}
                                    onChange={handleChange}
                                ></TextField>
                            </Grid>
                            <Grid item xs={3} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ngày đăng ký{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    type='date'
                                    inputProps={InputProps}
                                    variant='outlined'
                                    label='Ngày đăng ký'
                                    InputLabelProps={InputLabelProps}
                                    name='datePC'
                                    id='datePC'
                                    value={
                                        dataEdit.date
                                            ? moment(dataEdit.date).format(
                                                  'YYYY-MM-DD'
                                              )
                                            : ''
                                    }
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={6} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ghi chú{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    label='Ghi chú'
                                    InputLabelProps={InputLabelProps}
                                    name='notePC'
                                    id='notePC'
                                    value={dataEdit.note ?? ''}
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={6} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Nội dung{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    label='Nội dung'
                                    InputLabelProps={InputLabelProps}
                                    name='contentPC'
                                    id='contentPC'
                                    value={dataEdit.content ?? ''}
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                className={classes.actionBtnGroup}
                            >
                                {!isEdit && (
                                    <Button
                                        variant='contained'
                                        onClick={handleAdd}
                                    >
                                        Thêm
                                    </Button>
                                )}
                                {isEdit && (
                                    <Button
                                        variant='contained'
                                        color='warning'
                                        onClick={handleUpdate}
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
                        <Grid container sx={{ width: '100%', padding: '16px' }}>
                            <ListTemplate
                                maxHeight={250}
                                headerData={headerProposalConsultation}
                                idData={idData}
                                rowData={rowData}
                                isEdit={true}
                                isDelete={true}
                                handleEdit={handleEditProposalConsultation}
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
            {/* <ProposalConsultationModal
                isOpen={isOpenProposalConsultationModal}
                title={'Đề xuất tham mưu'}
                handleClose={handleCloseProposalConsultationModal}
                proposalConsultationData={proposalConsultationData}
                employeeId={employeeId}
                handleSendLeader={handleOpenSendLeaderModal}
            /> */}
            <SendLeaderModal
                isOpen={isOpenSendLeaderModal}
                title={'Trình lãnh đạo'}
                status={16}
                handleClose={handleCloseSendLeaderModal}
                handleSendLeader={handleSendLeader}
            />
        </Grid>
    );
};

export default ProposalConsultation;
