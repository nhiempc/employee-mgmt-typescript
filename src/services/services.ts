import {
    GET_EMPLOYEES,
    GET_INCREASE_SALARY,
    GET_PROMOTE,
    GET_PROPOSAL_CONSULTATION,
    GET_TOTAL_RECORD
} from '../common';
import { HttpMethod, protectedFetcher } from '../helpers/fetchHelper';
import { IEmployee, IEmployeeInfo, INewEmployee } from '../models/IEmployee';
import { IForm } from '../models/IForm';
import { IRegister } from '../models/IRegister';
import { IDataList } from '../models/IResponse';

export const employeeApi = {
    getEmployeeByStatus(
        status: number[],
        page: number = 1,
        perPage: number = 10
    ): Promise<IDataList<IEmployeeInfo>> {
        let _status = status.toString();
        return protectedFetcher(
            `${GET_EMPLOYEES}?statuses=${_status}&page=${page}&size=${perPage}`,
            HttpMethod.GET
        );
    },
    getEmployeeCount(status: number[]): Promise<IDataList<number>> {
        let _status = status.toString();
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_TOTAL_RECORD}?statuses=${_status}`,
            HttpMethod.GET
        );
    },
    getEmployeeById(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}`,
            HttpMethod.GET
        );
    },
    saveEmployee(employee: INewEmployee) {
        return protectedFetcher(
            `${GET_EMPLOYEES}`,
            HttpMethod.POST,
            JSON.stringify(employee)
        );
    },
    updateEmployee(employeeId: number, employee: IEmployee) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}`,
            HttpMethod.PUT,
            JSON.stringify(employee)
        );
    },
    deleteEmployee(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify({
                status: 14
            })
        );
    },
    saveProfile(employeeId: number, newForm: IForm) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/form`,
            HttpMethod.PUT,
            JSON.stringify(newForm)
        );
    },
    sendLeader(employeeId: number, registerInfo: IRegister) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify(registerInfo)
        );
    },
    getForm(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/form`,
            HttpMethod.GET
        );
    }
};

export const increaseSalaryApi = {
    getIncreaseSalaryHistory(
        employeeId: number,
        page: number = 1,
        perPage: number = 5
    ) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_INCREASE_SALARY}?page=${page}&size=${perPage}`,
            HttpMethod.GET
        );
    },
    getIncreaseSalaryCount(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_INCREASE_SALARY}`,
            HttpMethod.GET
        );
    }
};

export const promoteApi = {
    getPromoteHistoryHistory(
        employeeId: number,
        page: number = 1,
        perPage: number = 5
    ) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROMOTE}?page=${page}&size=${perPage}`,
            HttpMethod.GET
        );
    },
    getPromoteCount(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROMOTE}`,
            HttpMethod.GET
        );
    }
};

export const proposalConsultationApi = {
    getProposalConsultationHistory(
        employeeId: number,
        page: number = 1,
        perPage: number = 5
    ) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROPOSAL_CONSULTATION}?page=${page}&size=${perPage}`,
            HttpMethod.GET
        );
    },
    getProposalConsultationCount(employeeId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROPOSAL_CONSULTATION}`,
            HttpMethod.GET
        );
    }
};
