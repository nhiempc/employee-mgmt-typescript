import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IProposalConsultation } from '../../models/IProposalConsultation';
import { IDataList } from '../../models/IResponse';
import { proposalConsultationApi } from '../../services';
import {
    FetchProposalHistoryCountPayload,
    FetchProposalHistoryPayload,
    proposalActions
} from '../slices/proposal.slice';

function* fetchProposalHistoryWorker(
    action: PayloadAction<FetchProposalHistoryPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<IProposalConsultation> = yield call(
            proposalConsultationApi.getProposalConsultationHistory,
            payload.employeeId,
            payload.page,
            payload.perPage
        );
        const { data } = res;
        if (data) {
            yield put(proposalActions.setProposalHistory(data));
            yield put(proposalActions.fetchProposalHistorySuccess());
        }
    } catch (error) {
        yield put(proposalActions.fetchProposalHistoryFail());
        console.log(error);
    }
}

function* fetchProposalHistoryCountWorker(
    action: PayloadAction<FetchProposalHistoryCountPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<IProposalConsultation> = yield call(
            proposalConsultationApi.getProposalConsultationCount,
            payload.employeeId
        );
        const { data } = res;
        yield put(
            proposalActions.setProposalHistoryCount(Number(data?.length))
        );
    } catch (error) {
        yield put(proposalActions.setProposalHistoryCount(0));
    }
}

export default function* proposalSaga() {
    yield takeLatest(
        proposalActions.fetchProposalHistory.type,
        fetchProposalHistoryWorker
    );
    yield takeLatest(
        proposalActions.fetchProposalHistoryCount.type,
        fetchProposalHistoryCountWorker
    );
}
