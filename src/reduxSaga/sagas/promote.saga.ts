import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IPromote } from '../../models/IPromote';
import { IDataList } from '../../models/IResponse';
import { promoteApi } from '../../services';
import {
    FetchPromoteHistoryCountPayload,
    FetchPromoteHistoryPayload,
    promoteActions
} from '../slices/promote.slice';

function* fetchPromoteHistoryWorker(
    action: PayloadAction<FetchPromoteHistoryPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<IPromote> = yield call(
            promoteApi.getPromoteHistory,
            payload.employeeId,
            payload.page,
            payload.perPage
        );
        const { data } = res;
        if (data) {
            yield put(promoteActions.setPromoteHistory(data));
            yield put(promoteActions.fetchPromoteHistorySuccess());
        }
    } catch (error) {
        yield put(promoteActions.fetchPromoteHistoryFail());
        console.log(error);
    }
}

function* fetchPromoteHistoryCountWorker(
    action: PayloadAction<FetchPromoteHistoryCountPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<IPromote> = yield call(
            promoteApi.getPromoteCount,
            payload.employeeId
        );
        const { data } = res;
        yield put(promoteActions.setPromoteHistoryCount(Number(data?.length)));
    } catch (error) {
        yield put(promoteActions.setPromoteHistoryCount(0));
    }
}

export default function* promoteSaga() {
    yield takeLatest(
        promoteActions.fetchPromoteHistory.type,
        fetchPromoteHistoryWorker
    );
    yield takeLatest(
        promoteActions.fetchPromoteHistoryCount.type,
        fetchPromoteHistoryCountWorker
    );
}
