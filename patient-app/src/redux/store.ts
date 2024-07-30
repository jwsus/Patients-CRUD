import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import patientReducer from './patientsSlice';
// import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: {
//     patients: patientReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
// });

const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
