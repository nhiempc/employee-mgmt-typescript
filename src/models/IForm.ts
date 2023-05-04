import { ICV } from './ICV';
import { IResume } from './IResume';

export type IForm = {
    employeeId: number;
    resume: IResume;
    cv: ICV;
};
