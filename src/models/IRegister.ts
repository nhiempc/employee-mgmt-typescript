import moment from 'moment';

export type IRegister = {
    registerDate: string | null | undefined;
    status: number;
    registerName: string | null | undefined;
    registerPosition: string | null | undefined;
    registerContent: string | null | undefined;
};

export const initRegister = {
    registerDate: moment().format('YYYY-MM-DD'),
    status: 0,
    registerName: '',
    registerPosition: '',
    registerContent: ''
};
