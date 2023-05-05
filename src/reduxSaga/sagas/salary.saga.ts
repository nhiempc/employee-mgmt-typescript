import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IDataList } from '../../models/IResponse';
import { ISalary } from '../../models/ISalary';
import { increaseSalaryApi } from '../../services';
import {
    FetchSalaryHistoryCountPayload,
    FetchSalaryHistoryPayload,
    salaryActions
} from '../slices/salary.slice';

function* fetchSalaryHistoryWorker(
    action: PayloadAction<FetchSalaryHistoryPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<ISalary> = yield call(
            increaseSalaryApi.getIncreaseSalaryHistory,
            payload.employeeId,
            payload.page,
            payload.perPage
        );
        const { data } = res;
        if (data) {
            yield put(salaryActions.setSalaryHistory(data));
            yield put(salaryActions.fetchSalaryHistorySuccess());
        }
    } catch (error) {
        yield put(salaryActions.fetchSalaryHistoryFail());
        console.log(error);
    }
}

function* fetchSalaryHistoryCountWorker(
    action: PayloadAction<FetchSalaryHistoryCountPayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<ISalary> = yield call(
            increaseSalaryApi.getIncreaseSalaryCount,
            payload.employeeId
        );
        const { data } = res;
        yield put(salaryActions.setSalaryHistoryCount(Number(data?.length)));
    } catch (error) {
        yield put(salaryActions.setSalaryHistoryCount(0));
    }
}

export default function* salarySaga() {
    yield takeLatest(
        salaryActions.fetchSalaryHistory.type,
        fetchSalaryHistoryWorker
    );
    yield takeLatest(
        salaryActions.fetchSalaryHistoryCount.type,
        fetchSalaryHistoryCountWorker
    );
}
