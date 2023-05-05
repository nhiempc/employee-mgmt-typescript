export type IPromote = {
    createTime?: string | null;
    modifyTime?: string | null;
    promotionId?: number;
    employeeId?: number;
    status: number;
    count: number;
    oldPosition: string | null | undefined;
    newPosition: string | null | undefined;
    reason: string | null | undefined;
    date: string | null | undefined;
    note: string | null | undefined;
};
export const initPromote = {
    promotionId: 0,
    employeeId: 0,
    status: 0,
    count: 0,
    oldPosition: '',
    newPosition: '',
    reason: '',
    date: '',
    note: ''
};
