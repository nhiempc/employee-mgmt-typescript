import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employee.slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';
import formReducer from './slices/form.slice';
import salaryReducer from './slices/salary.slice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        form: formReducer,
        salary: salaryReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
