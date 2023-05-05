export type ISalary = {
    createTime?: string | null;
    modifyTime?: string | null;
    salaryId?: number;
    employeeId?: number;
    status: number;
    count: number;
    salary: null | number;
    salaryScale: null | number;
    reason: string | null | undefined;
    date: string | null | undefined;
    note: string | null | undefined;
};
export const initSalay = {
    salaryId: 0,
    employeeId: 0,
    status: 0,
    count: 0,
    salary: null,
    salaryScale: null,
    reason: '',
    date: '',
    note: ''
};
