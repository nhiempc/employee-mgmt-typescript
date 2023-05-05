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
    headerPromote,
    initPromote
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
import { employeeApi, promoteApi } from '../../../services';

type IProps = {
    employeeId: number;
};

const Promote: React.FunctionComponent<IProps> = ({ employeeId }) => {
    const { classes } = useStyles();

    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 5
    });

    const [openPromote, setOpenPromote] = useState(false);
    const [dataEdit, setDataEdit] = useState(initPromote);
    const [promoteData, setPromoteData] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [alertContent, setAlertContent] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isOpenPromoteModal, setIsOpenPromoteModal] = useState(false);
    const [isOpenSendLeaderModal, setIsOpenSendLeaderModal] = useState(false);
    const [promoteHistory, setPromoteHistory] = useState<any>([]);
    const [promoteCount, setPromoteCount] = useState(0);

    useEffect(() => {
        promoteApi
            .getPromoteHistoryHistory(employeeId, page, perPage)
            .then((respone) => {
                if (respone) {
                    setPromoteHistory(respone.data);
                }
            });
    }, [employeeId, page, perPage]);

    useEffect(() => {
        promoteApi.getPromoteCount(employeeId).then((respone) => {
            if (respone) {
                setPromoteCount(respone.data.length);
            }
        });
    }, [employeeId]);

    let totalPageNum = 0;

    if (promoteCount % perPage === 0) {
        totalPageNum = promoteCount / perPage;
    } else {
        totalPageNum = Math.floor(promoteCount / perPage + 1);
    }

    const rowData: any[][] = [];

    const idData: number[] = [];

    if (promoteHistory && promoteHistory.length > 0) {
        promoteHistory.map((promote: any) => {
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
        setIsEdit(true);
        setDataEdit({ ...editItem });
    };

    const handleChange = (e: any) => {
        let { name, value } = e.target;
        let _name = name.substring(0, name.length - 1);
        setDataEdit({
            ...dataEdit,
            [_name]: value
        });
    };

    const handleAdd = () => {
        setPromoteData(dataEdit);
        promoteApi
            .addPromote(employeeId, dataEdit)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Thêm đề xuất thăng chức thành công'
                    );
                    setIsOpenPromoteModal(true);
                    setDataEdit(initPromote);
                } else {
                    handleShowAlert('warning', respone.message);
                }
            })
            .catch((err) => {
                handleShowAlert('error', errorMessage);
            });
    };

    const handleUpdate = () => {
        const promoteData = {
            newPosition: dataEdit.newPosition,
            reason: dataEdit.reason,
            date: moment(dataEdit.date).format('YYYY-MM-DD'),
            note: dataEdit.note
        };
        promoteApi
            .updatePromote(dataEdit.promotionId, promoteData)
            .then((respone) => {
                if (respone && respone.code === SUCCESS_CODE) {
                    handleShowAlert(
                        'success',
                        'Cập nhật thông tin thăng chức thành công'
                    );
                    setDataEdit(initPromote);
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
        setDataEdit({});
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
                        {openPromote ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPromote} timeout='auto' unmountOnExit>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                width: '100%',
                                margin: '0 auto',
                                paddingRight: '16px'
                            }}
                        >
                            <Grid item xs={4} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ngày thăng chức{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    label='Ngày'
                                    InputLabelProps={InputLabelProps}
                                    fullWidth
                                    type='date'
                                    id='dateP'
                                    name='dateP'
                                    inputProps={InputProps}
                                    variant='outlined'
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

                            <Grid item xs={4} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Chức vụ mới{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    label='Chức vụ mới'
                                    InputLabelProps={InputLabelProps}
                                    fullWidth
                                    inputProps={InputProps}
                                    id='newPositionP'
                                    name='newPositionP'
                                    variant='outlined'
                                    value={dataEdit.newPosition ?? ''}
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={4} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Ghi chú{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    label='Ghi chú'
                                    InputLabelProps={InputLabelProps}
                                    fullWidth
                                    inputProps={InputProps}
                                    variant='outlined'
                                    id='noteP'
                                    name='noteP'
                                    value={dataEdit.note ?? ''}
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid item xs={8} className={classes.infoItem}>
                                <Typography variant='body2'>
                                    Lý do{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    label='Lý do'
                                    InputLabelProps={InputLabelProps}
                                    fullWidth
                                    multiline
                                    inputProps={InputProps}
                                    id='reasonP'
                                    name='reasonP'
                                    variant='outlined'
                                    value={dataEdit.reason ?? ''}
                                    onChange={handleChange}
                                    size='small'
                                ></TextField>
                            </Grid>
                            <Grid
                                item
                                xs={4}
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
                                headerData={headerPromote}
                                idData={idData}
                                rowData={rowData}
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
            {/* <PromoteModal
                isOpen={isOpenPromoteModal}
                title={'Đề xuất thăng chức'}
                handleClose={handleClosePromoteModal}
                promoteData={promoteData}
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

export default Promote;
