import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICV, initCV } from '../../models/ICV';
import { IForm } from '../../models/IForm';
import { IResume, initResume } from '../../models/IResume';
import { RootState } from '../store';

export interface FormState {
    newForm: IForm;
}

const initState: FormState = {
    newForm: {
        employeeId: 0,
        resume: initResume,
        cv: initCV
    }
};

const formSlice = createSlice({
    name: 'form',
    initialState: initState,
    reducers: {
        addResume(state, action: PayloadAction<IResume>) {
            state.newForm.resume = action.payload;
        },
        addCV(state, action: PayloadAction<ICV>) {
            state.newForm.cv = action.payload;
        }
    }
});

// Actions
export const formActions = formSlice.actions;

// Selectors
export const newFormSelector = (state: RootState) => state.form.newForm;

// Reducer
const formReducer = formSlice.reducer;
export default formReducer;
