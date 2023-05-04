import { ComponentType } from 'react';

export type IOrder = 'asc' | 'desc';

export type IPagination = {
    perPage: number;
    totalPage: number;
    pageIndex: number;
    order: IOrder;
    orderBy: string;
    handleRequestSort: (property: string) => () => void;
    changePage: (value: number) => void;
    changePerPage: (value: number) => void;
};

export type IHistory = {
    push(url: string): void;
    replace(url: string): void;
};

type ICommon = {
    exact?: boolean;
    path?: string;
    guard?:
        | React.LazyExoticComponent<ComponentType<unknown>>
        | ComponentType<unknown>;
    layout?: React.FunctionComponent;
    component?: any;
    requireRoles?: string[] | [];
};

export type IRoutes = ICommon & {
    routes?: ICommon[];
};
