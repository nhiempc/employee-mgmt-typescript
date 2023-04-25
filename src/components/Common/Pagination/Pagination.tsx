import { useState, useEffect } from 'react';
// material
import { IconButton, MenuItem, Select, TextField } from '@mui/material';
// material icons
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// styles
import useStyles from './styles';

type IProps = {
    perPage: number;
    totalPage: number;
    pageIndex: number;
    changePage: (value: number) => void;
    changePerPage: (value: number) => void;
};

const PaginationBase = ({
    perPage,
    totalPage,
    pageIndex,
    changePage,
    changePerPage
}: IProps) => {
    const [page, setPage] = useState(1);

    const { classes } = useStyles();

    const _onChangePerPage = (event: any) => {
        changePerPage(Number(event.target.value));
    };

    const _onChangePage = (value: number) => () => {
        setPage(value);
        changePage(value);
    };

    const _onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reg = new RegExp('^[0-9]+$');
        const { value } = event.target;
        if (reg.test(value)) {
            setPage(Number(event.target.value));
        }
    };

    useEffect(() => {
        if (pageIndex >= 1) {
            setPage(pageIndex);
        }
    }, [pageIndex]);

    const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changePage(page);
        }
    };

    return (
        <div className={classes.rootPanigation}>
            <div>
                Số lượng bản ghi/trang
                <Select
                    value={perPage}
                    size='small'
                    onChange={_onChangePerPage}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </div>
            <div className={classes.pagination}>
                <IconButton
                    disabled={page === 1}
                    color='primary'
                    aria-label='prev'
                    onClick={_onChangePage(Number(page - 1))}
                >
                    <NavigateBeforeIcon fontSize='small' />
                </IconButton>
                Trang
                <div className={classes.pageNumber}>
                    <TextField
                        id='number-page'
                        value={page}
                        size='small'
                        label=''
                        variant='outlined'
                        className={classes.textPage}
                        onChange={_onChangeInput}
                        onKeyDown={_onKeyDown}
                    />{' '}
                    trên {totalPage}
                </div>
                <IconButton
                    disabled={page >= totalPage}
                    color='primary'
                    aria-label='next'
                    onClick={_onChangePage(Number(page + 1))}
                >
                    <NavigateNextIcon fontSize='small' />
                </IconButton>
            </div>
        </div>
    );
};

export default PaginationBase;
