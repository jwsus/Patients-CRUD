import React from 'react';
import PatientForm from '../../components/PatientForm/PatientForm';
import { useDispatch } from 'react-redux';
import { createPatient } from '../../redux/patientsSlice';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../redux/types';
import { Box } from '@mui/material';
import styles from './PatientCreatePage.module.css';
import Header from '../../components/Header/Header';

const CreatePatient: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (data: Patient) => {
    dispatch(createPatient(data));
    navigate('/'); // Navegar de volta para a lista de pacientes após salvar
  };
  
  return (
           <Box>
              <Header />
             <PatientForm onSave={handleSave} />
           </Box>
  );
};

export default CreatePatient;
