import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initState = {
    employeeNew: {
        employeeInfo: { status: 1, photoUrl: '' },
        certificates: [],
        familyRelations: []
    },
    employeeEdit: {},
    employeeById: {},
    employeeByStatus: [],
    isLoading: false
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initState,
    reducers: {
        getEmployeeById(state, action) {
            state.employeeById = action.payload;
        },
        getEmployeeByStatus(state, action) {
            state.employeeByStatus = action.payload;
        },
        setEmployeeEdit(state, action) {
            state.employeeEdit = action.payload;
        },
        setEmployeeNew(state, action) {
            state.employeeNew = action.payload;
        },
        getEmployeeSuccess(state, action) {
            state.isLoading = false;
        },
        getEmployeeFail(state, action) {
            state.isLoading = true;
        }
    }
});

// Actions
export const employeeActions = employeeSlice.actions;

// Selectors
export const employeeNewSelector = (state: RootState) => state.employee.employeeNew;
export const employeeEditSelector = (state: RootState) => state.employee.employeeEdit;
export const employeeByIdSelector = (state: RootState) => state.employee.employeeById;
export const employeeByStatusSelector = (state: RootState) =>
    state.employee.employeeByStatus;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
