import employeeSaga from './employee.saga';
import { all } from 'redux-saga/effects';
import salarySaga from './salary.saga';
import promoteSaga from './promote.saga';

export default function* rootSaga() {
    yield all([employeeSaga(), salarySaga(), promoteSaga()]);
}
