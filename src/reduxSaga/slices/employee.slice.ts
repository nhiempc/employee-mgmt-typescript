import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEmployeeInfo } from '../../models/IEmployee';
import { RootState } from '../store';

export interface EmployeeState {
    employeeByStatus: IEmployeeInfo[];
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

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
