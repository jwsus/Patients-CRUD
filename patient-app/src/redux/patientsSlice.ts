import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Patient } from './types';
import { PatientSummary } from './types';

interface PatientsState {
  patients: PatientSummary[];
  selectedPatient: PatientSummary | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  selectedPatient: null,
  status: 'idle',
  error: null,
};


const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    createPatient(state, action: PayloadAction<Patient>) {
      state.patients.push(action.payload);
    },
    updatePatient(state, action: PayloadAction<Patient>) {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient(state, action: PayloadAction<string>) {
      state.patients = state.patients.filter(p => p.id !== action.payload);
    },
    selectPatient(state, action: PayloadAction<string>) {
      state.selectedPatient = state.patients.find(p => p.id === action.payload) || null;
    },
    setPatients(state, action: PayloadAction<PatientSummary[]>) {
      state.patients = action.payload;
    },
  }
});

export const { createPatient, updatePatient, deletePatient, selectPatient, setPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
