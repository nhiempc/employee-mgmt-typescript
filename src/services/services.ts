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
    },
    rejectProfile(employeeId: number, rejectData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify(rejectData)
        );
    },
    approvalProfile(employeeId: number, status: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify({ status: status })
        );
    },
    requiredSupplementProfile(employeeId: number, requiredSupplementData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify(requiredSupplementData)
        );
    },
    sendTerminateRequest(employeeId: number, terminateRequest: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/status`,
            HttpMethod.PUT,
            JSON.stringify(terminateRequest)
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
    },
    addIncreaseSalary(employeeId: number, increaseSalaryData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_INCREASE_SALARY}`,
            HttpMethod.POST,
            JSON.stringify(increaseSalaryData)
        );
    },
    updateIncreaseSalary(salaryId: number, increaseSalaryData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_INCREASE_SALARY}/${salaryId}`,
            HttpMethod.PUT,
            JSON.stringify(increaseSalaryData)
        );
    },
    deleteIncreaseSalary(salaryId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_INCREASE_SALARY}/${salaryId}`,
            HttpMethod.DELETE
        );
    }
};

export const promoteApi = {
    getPromoteHistory(
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
    },
    addPromote(employeeId: number, promoteData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROMOTE}`,
            HttpMethod.POST,
            JSON.stringify(promoteData)
        );
    },
    updatePromote(promoteId: number, promoteData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_PROMOTE}/${promoteId}`,
            HttpMethod.PUT,
            JSON.stringify(promoteData)
        );
    },
    deletePromote(promoteId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_PROMOTE}/${promoteId}`,
            HttpMethod.DELETE
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
    },
    addProposalConsultation(employeeId: number, proposalConsultationData: any) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${employeeId}/${GET_PROPOSAL_CONSULTATION}`,
            HttpMethod.POST,
            JSON.stringify(proposalConsultationData)
        );
    },
    updateProposalConsultation(
        proposalConsultationId: number,
        proposalConsultationData: any
    ) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_PROPOSAL_CONSULTATION}/${proposalConsultationId}`,
            HttpMethod.PUT,
            JSON.stringify(proposalConsultationData)
        );
    },
    deleteProposalConsultation(proposalConsultationId: number) {
        return protectedFetcher(
            `${GET_EMPLOYEES}/${GET_PROPOSAL_CONSULTATION}/${proposalConsultationId}`,
            HttpMethod.DELETE
        );
    }
};
