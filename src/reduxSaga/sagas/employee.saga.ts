import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IEmployeeInfo } from '../../models/IEmployee';
import { IDataList, IDataNumber } from '../../models/IResponse';
import { employeeApi } from '../../services';
import {
    FetchEmployeeCountPayload,
    FetchEmployeePayload,
    employeeActions
} from '../slices/employee.slice';

function* fetchEmployeeByStatusWorker(
    action: PayloadAction<FetchEmployeePayload>
) {
    const { payload } = action;
    try {
        const res: IDataList<IEmployeeInfo> = yield call(
            employeeApi.getEmployeeByStatus,
            payload.status,
            payload.page,
            payload.perPage
        );
        const { data } = res;
        yield put(employeeActions.setEmployeeByStatus(data));
        yield put(employeeActions.fetchEmployeeSuccess());
    } catch (error) {
        yield put(employeeActions.fetchEmployeeFail());
        console.log(error);
    }
}

function* fetchEmployeeCountWorker(
    action: PayloadAction<FetchEmployeeCountPayload>
) {
    const { payload } = action;
    try {
        const res: IDataNumber = yield call(
            employeeApi.getEmployeeCount,
            payload.status
        );
        const { data } = res;
        yield put(employeeActions.setEmployeeCount(data));
    } catch (error) {
        yield put(employeeActions.setEmployeeCount(0));
    }
}

export default function* employeeSaga() {
    yield takeLatest(
        employeeActions.fetchEmployeeByStatus.type,
        fetchEmployeeByStatusWorker
    );
    yield takeLatest(
        employeeActions.fetchEmployeeCount.type,
        fetchEmployeeCountWorker
    );
}
