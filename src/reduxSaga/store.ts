import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employee.slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';
import formReducer from './slices/form.slice';
import salaryReducer from './slices/salary.slice';
import promoteReducer from './slices/promote.slice';
import proposalReducer from './slices/proposal.slice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        form: formReducer,
        salary: salaryReducer,
        promote: promoteReducer,
        proposal: proposalReducer
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
