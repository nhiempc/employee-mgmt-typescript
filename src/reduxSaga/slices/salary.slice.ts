import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISalary } from '../../models/ISalary';
import { RootState } from '../store';

export interface SalaryState {
    salaryHistory: ISalary[];
    isLoading: boolean;
    count: number;
}

const initState: SalaryState = {
    salaryHistory: [],
    isLoading: false,
    count: 0
};

export interface FetchSalaryHistoryPayload {
    employeeId: number;
    page: number;
    perPage: number;
}

export interface FetchSalaryHistoryCountPayload {
    employeeId: number;
}

const salarySlice = createSlice({
    name: 'salary',
    initialState: initState,
    reducers: {
        fetchSalaryHistory(
            state,
            action: PayloadAction<FetchSalaryHistoryPayload>
        ) {
            state.isLoading = true;
        },
        fetchSalaryHistoryCount(
            state,
            action: PayloadAction<FetchSalaryHistoryCountPayload>
        ) {
            state.isLoading = true;
        },
        fetchSalaryHistorySuccess(state) {
            state.isLoading = false;
        },
        fetchSalaryHistoryFail(state) {
            state.isLoading = true;
        },
        setSalaryHistory(state, action: PayloadAction<ISalary[]>) {
            state.salaryHistory = action.payload;
        },
        setSalaryHistoryCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        addSalary(state, action: PayloadAction<ISalary>) {
            state.salaryHistory.push(action.payload);
        }
    }
});

// Actions
export const salaryActions = salarySlice.actions;

// Selectors
export const salaryHistorySelector = (state: RootState) =>
    state.salary.salaryHistory;
export const isLoadingSelector = (state: RootState) => state.salary.isLoading;
export const salaryHistoryCountSelector = (state: RootState) =>
    state.salary.count;

// Reducer
const salaryReducer = salarySlice.reducer;
export default salaryReducer;
