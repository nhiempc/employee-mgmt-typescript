import employeeSaga from './employee.saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([employeeSaga()]);
}
