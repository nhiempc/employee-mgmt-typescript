import {
    capitalize,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// styles
import useStyles from './styles';
import { IListTemplate } from '../../../models/IListTemplate';

const ListTemplate = ({
    headerData,
    rowData,
    idData,
    isInfo,
    isEdit,
    isDelete,
    handleRequestSort,
    handleShowInfo,
    handleEdit,
    handleDelete,
    order,
    orderBy,
    maxHeight,
    editConditionalArr,
    infoConditionalArr,
    deleteConditionalArr,
    isLoading = false
}: IListTemplate) => {
    const { classes } = useStyles();
    const headers = headerData ? headerData : [];
    const rows = rowData ? rowData : [];
    let _isEditArray: boolean[] = [];
    let _isInfoArray: boolean[] = [];
    let _isDeleteArray: boolean[] = [];
    if (editConditionalArr) {
        _isEditArray = rows.map((r) =>
            r.some((ai) => editConditionalArr.includes(ai))
        );
    }
    if (infoConditionalArr) {
        _isInfoArray = rows.map((r) =>
            r.some((ai) => infoConditionalArr.includes(ai))
        );
    }
    if (deleteConditionalArr) {
        _isDeleteArray = rows.map((r) =>
            r.some((ai) => deleteConditionalArr.includes(ai))
        );
    }
    const _isInfo = isInfo ? isInfo : false;
    const _isEdit = isEdit ? isEdit : false;
    const _isDelete = isDelete ? isDelete : false;
    const ids = idData ? idData : [];
    const _handleShowInfo = handleShowInfo
        ? handleShowInfo
        : (id: number) => {};
    const _handleEdit = handleEdit ? handleEdit : (id: number) => {};
    const _handleDelete = handleDelete ? handleDelete : (id: number) => {};
    const _handleRequestSort = handleRequestSort
        ? handleRequestSort
        : (
              event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
              sortBy: string
          ) => {};
    const sorting = order ? order : 'asc';
    const sortBy = orderBy ? orderBy : '';

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        },
        '&:last-child': {
            width: '1%',
            whiteSpace: 'nowrap',
            textAlign: 'right'
        }
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));
    return (
        <>
            <TableContainer
                component={Paper}
                sx={{ maxHeight: maxHeight }}
                className={classes.tableContainer}
            >
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <StyledTableRow>
                            {headers &&
                                headers.map((h, i) =>
                                    sortBy === h ? (
                                        <StyledTableCell
                                            key={'h-' + i}
                                            align='left'
                                        >
                                            <TableSortLabel
                                                active={sortBy === h}
                                                direction={
                                                    sorting !== 'asc'
                                                        ? 'desc'
                                                        : 'asc'
                                                }
                                                onClick={
                                                    _handleRequestSort
                                                        ? (event) =>
                                                              _handleRequestSort(
                                                                  event,
                                                                  h
                                                              )
                                                        : () => {}
                                                }
                                            >
                                                {' '}
                                                {capitalize(h)}{' '}
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell
                                            key={'h-' + i}
                                            align='left'
                                        >
                                            {capitalize(h)}
                                        </StyledTableCell>
                                    )
                                )}
                        </StyledTableRow>
                    </TableHead>
                    {!isLoading && (
                        <TableBody>
                            {rows &&
                                rows.map((r, i) => (
                                    <StyledTableRow key={'r-' + i}>
                                        {r.map((c, k) => (
                                            <StyledTableCell
                                                key={'c-' + i + '-' + k}
                                                align='left'
                                            >
                                                {c}
                                            </StyledTableCell>
                                        ))}
                                        <StyledTableCell
                                            key={'c-' + i + '-action'}
                                            align='right'
                                        >
                                            {_isEdit && !isNaN(ids[i]) && (
                                                <EditIcon
                                                    color='info'
                                                    onClick={() =>
                                                        _handleEdit(ids[i])
                                                    }
                                                    sx={{
                                                        cursor: 'pointer',

                                                        padding: '0 2px'
                                                    }}
                                                />
                                            )}

                                            {_isEditArray[i] &&
                                                !isNaN(ids[i]) && (
                                                    <EditIcon
                                                        color='info'
                                                        onClick={() =>
                                                            _handleEdit(ids[i])
                                                        }
                                                        sx={{
                                                            cursor: 'pointer',

                                                            padding: '0 2px'
                                                        }}
                                                    />
                                                )}

                                            {_isInfo && (
                                                <VisibilityIcon
                                                    color='success'
                                                    onClick={() =>
                                                        _handleShowInfo(ids[i])
                                                    }
                                                    sx={{
                                                        cursor: 'pointer',
                                                        padding: '0 2px'
                                                    }}
                                                />
                                            )}

                                            {_isInfoArray[i] && (
                                                <VisibilityIcon
                                                    color='success'
                                                    onClick={() =>
                                                        _handleShowInfo(ids[i])
                                                    }
                                                    sx={{
                                                        cursor: 'pointer',
                                                        padding: '0 2px'
                                                    }}
                                                />
                                            )}

                                            {_isDelete && !isNaN(ids[i]) && (
                                                <DeleteIcon
                                                    color='primary'
                                                    onClick={() =>
                                                        _handleDelete(ids[i])
                                                    }
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#ff1943',
                                                        padding: '0 2px'
                                                    }}
                                                />
                                            )}
                                            {_isDeleteArray[i] && (
                                                <DeleteIcon
                                                    color='primary'
                                                    onClick={() =>
                                                        _handleDelete(ids[i])
                                                    }
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: '#ff1943',
                                                        padding: '0 2px'
                                                    }}
                                                />
                                            )}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    )}
                </Table>
                {rows.length === 0 && isLoading === false && (
                    <div
                        style={{
                            height: 150,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                            Không có dữ liệu
                        </Typography>
                    </div>
                )}
                {isLoading && (
                    <div
                        style={{
                            height: `${maxHeight}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                            Đang tải dữ liệu
                        </Typography>
                    </div>
                )}
            </TableContainer>
        </>
    );
};

export default ListTemplate;
