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
    totalEmployee: 0
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
        addFamilyMember(state, action: PayloadAction<IFamilyRelations>) {
            state.newEmployee.familyRelations.push(action.payload);
        },
        deleteEmployee(state, action: PayloadAction<number>) {
            let index = state.employeeByStatus.findIndex(
                (item) => item.employeeId === action.payload
            );
            state.employeeByStatus.splice(index, 1);
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

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
