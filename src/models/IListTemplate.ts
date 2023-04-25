import { IOrder } from './ICommon';

export type IListTemplate = {
    headerData: string[];
    rowData: any[][];
    idData: number[];
    isInfo?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    handleRequestSort?: (e: any, f: string) => void;
    handleShowInfo?: (id: number | undefined) => void;
    handleEdit?: (id: number | undefined) => void;
    handleDelete?: (id: number | undefined) => void;
    order?: IOrder;
    orderBy?: string;
    maxHeight?: number;
    editConditionalArr?: string[]
    infoConditionalArr?: string[]
    deleteConditionalArr?: string[]
    isLoading?: boolean
};
