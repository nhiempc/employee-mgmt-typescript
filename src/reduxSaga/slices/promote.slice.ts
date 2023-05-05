import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPromote } from '../../models/IPromote';
import { RootState } from '../store';

export interface PromoteState {
    promoteHistory: IPromote[];
    isLoading: boolean;
    count: number;
}

const initState: PromoteState = {
    promoteHistory: [],
    isLoading: false,
    count: 0
};

export interface FetchPromoteHistoryPayload {
    employeeId: number;
    page: number;
    perPage: number;
}

export interface FetchPromoteHistoryCountPayload {
    employeeId: number;
}

const promoteSlice = createSlice({
    name: 'promote',
    initialState: initState,
    reducers: {
        fetchPromoteHistory(
            state,
            action: PayloadAction<FetchPromoteHistoryPayload>
        ) {
            state.isLoading = true;
        },
        fetchPromoteHistoryCount(
            state,
            action: PayloadAction<FetchPromoteHistoryCountPayload>
        ) {
            state.isLoading = true;
        },
        fetchPromoteHistorySuccess(state) {
            state.isLoading = false;
        },
        fetchPromoteHistoryFail(state) {
            state.isLoading = true;
        },
        setPromoteHistory(state, action: PayloadAction<IPromote[]>) {
            state.promoteHistory = action.payload;
        },
        setPromoteHistoryCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        addPromote(state, action: PayloadAction<IPromote>) {
            state.promoteHistory.push(action.payload);
        }
    }
});

// Actions
export const promoteActions = promoteSlice.actions;

// Selectors
export const promoteHistorySelector = (state: RootState) =>
    state.promote.promoteHistory;
export const isLoadingSelector = (state: RootState) => state.promote.isLoading;
export const promoteHistoryCountSelector = (state: RootState) =>
    state.promote.count;

// Reducer
const promoteReducer = promoteSlice.reducer;
export default promoteReducer;
