import { takeLatest, call, put } from 'redux-saga/effects';
import {  createPatient, updatePatient, deletePatient, setPatients } from './patientsSlice';
import { Patient } from './types';

// Saga para buscar pacientes
// function* fetchPatientsSaga(action: PayloadAction<string | undefined>) {
//   try {
//     yield put(setPatientsLoading());
//     const response: Response = yield call(fetch, `/api/patients?search=${action.payload || ''}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch patients');
//     }
//     const data: Patient[] = yield response.json();
//     yield put(setPatients(data));
//   } catch (error) {
//     yield put(setPatientsError(error.message));
//   }
// }

// Saga para criar um paciente
// function* createPatientSaga(action: ReturnType<typeof createPatient>) {
//   try {
//     const response: Response = yield call(fetch, '/api/patients', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(action.payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to create patient.');
//     }
//     // Atualize a lista de pacientes após a criação
//     yield put(fetchPatientsAsync());
//   } catch (error) {
//     console.error('Failed to create patient:', error);
//   }
// }

// Saga para atualizar um paciente
// function* updatePatientSaga(action: ReturnType<typeof updatePatient>) {
//   try {
//     const response: Response = yield call(fetch, `/api/patients/${action.payload.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(action.payload),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update patient.');
//     }
//     // Atualize a lista de pacientes após a atualização
//     yield put(fetchPatientsAsync());
//   } catch (error) {
//     console.error('Failed to update patient:', error);
//   }
// }

// // Saga para deletar um paciente
// function* deletePatientSaga(action: ReturnType<typeof deletePatient>) {
//   try {
//     const response: Response = yield call(fetch, `/api/patients/${action.payload}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete patient.');
//     }
//     // Atualize a lista de pacientes após a exclusão
//     yield put(fetchPatientsAsync());
//   } catch (error) {
//     console.error('Failed to delete patient:', error);
//   }
// }

// // Root saga
// export default function* rootSaga() {
//   // yield takeLatest(fetchPatientsAsync.type, fetchPatientsSaga);
//   yield takeLatest(createPatient.type, createPatientSaga);
//   yield takeLatest(updatePatient.type, updatePatientSaga);
//   yield takeLatest(deletePatient.type, deletePatientSaga);
// }
