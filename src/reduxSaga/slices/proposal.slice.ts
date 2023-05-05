import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProposalConsultation } from '../../models/IProposalConsultation';
import { RootState } from '../store';

export interface ProposalState {
    proposalHistory: IProposalConsultation[];
    isLoading: boolean;
    count: number;
}

const initState: ProposalState = {
    proposalHistory: [],
    isLoading: false,
    count: 0
};

export interface FetchProposalHistoryPayload {
    employeeId: number;
    page: number;
    perPage: number;
}

export interface FetchProposalHistoryCountPayload {
    employeeId: number;
}

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: initState,
    reducers: {
        fetchProposalHistory(
            state,
            action: PayloadAction<FetchProposalHistoryPayload>
        ) {
            state.isLoading = true;
        },
        fetchProposalHistoryCount(
            state,
            action: PayloadAction<FetchProposalHistoryCountPayload>
        ) {
            state.isLoading = true;
        },
        fetchProposalHistorySuccess(state) {
            state.isLoading = false;
        },
        fetchProposalHistoryFail(state) {
            state.isLoading = true;
        },
        setProposalHistory(
            state,
            action: PayloadAction<IProposalConsultation[]>
        ) {
            state.proposalHistory = action.payload;
        },
        setProposalHistoryCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        addProposal(state, action: PayloadAction<IProposalConsultation>) {
            state.proposalHistory.push(action.payload);
        },
        deleteProposal(state, action: PayloadAction<number>) {
            const rest = state.proposalHistory.filter(
                (item) => item.proposalConsultationId !== action.payload
            );
            state.proposalHistory = rest;
            state.count = state.count - 1;
        },
        updateProposal(state, action: PayloadAction<IProposalConsultation>) {
            let id = action.payload.proposalConsultationId;
            let index = state.proposalHistory.findIndex(
                (item) => item.proposalConsultationId === id
            );
            const newList = [...state.proposalHistory];
            newList[index] = action.payload;
            state.proposalHistory = newList;
        }
    }
});

// Actions
export const proposalActions = proposalSlice.actions;

// Selectors
export const proposalHistorySelector = (state: RootState) =>
    state.proposal.proposalHistory;
export const isLoadingSelector = (state: RootState) => state.proposal.isLoading;
export const proposalHistoryCountSelector = (state: RootState) =>
    state.proposal.count;

// Reducer
const proposalReducer = proposalSlice.reducer;
export default proposalReducer;
