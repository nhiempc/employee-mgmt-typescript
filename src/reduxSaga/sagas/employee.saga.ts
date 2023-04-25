import { call, fork, put, take } from 'redux-saga/effects';
import { employeeActions } from '../slices/employee.slice';

function* handleGetEmployeeById() {}

function* getEmployeeByIdWatcher() {
    
}

function* handleGetEmployeeByStatus(action:any) {
}

function* getEmployeeByStatusWatcher() {
    
}

function* handleSetEmployeeNew() {}

function* setEmployeeNewWatcher() {
    
}

function* handleSetEmployeeEdit() {}

function* setEmployeeEditWatcher() {
    
}

export default function* employeeSaga() {
    yield fork(getEmployeeByIdWatcher);
    yield fork(getEmployeeByStatusWatcher);
    yield fork(setEmployeeNewWatcher);
    yield fork(setEmployeeEditWatcher);
}
