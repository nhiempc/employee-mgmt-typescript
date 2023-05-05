import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initEmployeeInfo } from '../../common';
import {
    ICertificates,
    IEmployeeInfo,
    IFamilyRelations,
    INewEmployee,
    INewEmployeeInfo
} from '../../models/IEmployee';
import { RootState } from '../store';

export interface EmployeeState {
    employeeByStatus: IEmployeeInfo[];
    newEmployee: INewEmployee;
    isLoading: boolean;
    totalEmployee: number;
    currentStatus: number | null;
}

export interface FetchEmployeePayload {
    status: number[];
    page: number;
    perPage: number;
}

export interface FetchEmployeeCountPayload {
    status: number[];
}

const initState: EmployeeState = {
    employeeByStatus: [],
    newEmployee: {
        employeeInfo: {
            ...initEmployeeInfo
        },
        certificates: [],
        familyRelations: []
    },
    isLoading: false,
    totalEmployee: 0,
    currentStatus: null
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initState,
    reducers: {
        fetchEmployeeByStatus(
            state,
            action: PayloadAction<FetchEmployeePayload>
        ) {
            state.isLoading = true;
        },
        fetchEmployeeCount(
            state,
            action: PayloadAction<FetchEmployeeCountPayload>
        ) {
            state.isLoading = true;
        },
        fetchEmployeeSuccess(state) {
            state.isLoading = false;
        },
        fetchEmployeeFail(state) {
            state.isLoading = true;
        },
        setEmployeeByStatus(state, action: PayloadAction<IEmployeeInfo[]>) {
            state.employeeByStatus = action.payload;
        },
        setEmployeeCount(state, action: PayloadAction<number>) {
            state.totalEmployee = action.payload;
        },
        setNewEmployeeInfo(state, action: PayloadAction<INewEmployeeInfo>) {
            state.newEmployee.employeeInfo = action.payload;
        },
        addCertificates(state, action: PayloadAction<ICertificates>) {
            state.newEmployee.certificates.push(action.payload);
        },
        deleteCertificate(state, action: PayloadAction<number>) {
            const certificateRest = state.newEmployee.certificates.filter(
                (item) => item.certificateId !== action.payload
            );
            state.newEmployee.certificates = certificateRest;
        },
        addFamilyMember(state, action: PayloadAction<IFamilyRelations>) {
            state.newEmployee.familyRelations.push(action.payload);
        },
        deleteFamilyMember(state, action: PayloadAction<number>) {
            const familyMembersRest = state.newEmployee.familyRelations.filter(
                (item) => item.familyId !== action.payload
            );
            state.newEmployee.familyRelations = familyMembersRest;
        },
        deleteEmployee(state, action: PayloadAction<number>) {
            let index = state.employeeByStatus.findIndex(
                (item) => item.employeeId === action.payload
            );
            state.employeeByStatus.splice(index, 1);
        },
        updateEmployee(state, action: PayloadAction<IEmployeeInfo>) {
            let employeeId = action.payload.employeeId;
            let index = state.employeeByStatus.findIndex(
                (item) => item.employeeId === employeeId
            );
            const newList = [...state.employeeByStatus];
            newList[index] = action.payload;
            state.employeeByStatus = newList;
        },
        addCurrentStatus(state, action: PayloadAction<number>) {
            state.currentStatus = action.payload;
        }
    }
});

// Actions
export const employeeActions = employeeSlice.actions;

// Selectors
export const employeeByStatusSelector = (state: RootState) =>
    state.employee.employeeByStatus;
export const isLoadingSelector = (state: RootState) => state.employee.isLoading;
export const totalEmployeeSelector = (state: RootState) =>
    state.employee.totalEmployee;
export const newEmployeeSelector = (state: RootState) =>
    state.employee.newEmployee;
export const statusSelector = (state: RootState) =>
    state.employee.currentStatus;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
