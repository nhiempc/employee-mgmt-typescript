import { initResume } from '../common';
import { ICV, initCV } from './ICV';
import { IResume } from './IResume';

export type IForm = {
    employeeId: number;
    resume: IResume;
    cv: ICV;
};

export const initForm = {
    employeeId: 0,
    cv: initCV,
    resume: initResume
};
