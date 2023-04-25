import usePagination from '../../hooks/usePagination';
import ListTemplate from '../Common/ListTemplate/ListTemplate';
import PaginationBase from '../Common/Pagination/Pagination';
import { Box } from '@mui/system';
import { headerApprovedEmployee } from '../../common';

const FinishEmployeeContainer = () => {
    const { page, perPage, _changePage, _changePerPage } = usePagination({
        pageCount: 10
    });

    const rowData: any[][] = [];
    const idData: number[] = [];
    let totalPageNum = 0;

    return (
        <Box sx={{ padding: '24px' }}>
            <ListTemplate
                maxHeight={550}
                idData={idData}
                headerData={headerApprovedEmployee}
                rowData={rowData}
            />
            <PaginationBase
                perPage={perPage}
                totalPage={totalPageNum}
                pageIndex={page}
                changePage={_changePage}
                changePerPage={_changePerPage}
            />
        </Box>
    );
};

export default FinishEmployeeContainer;
