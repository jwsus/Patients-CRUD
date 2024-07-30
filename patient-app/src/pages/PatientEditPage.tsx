import React from 'react';
import PatientForm from '../components/PatientForm/PatientForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePatient } from '../redux/patientsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Patient } from '../redux/types';
import { useQuery } from '@tanstack/react-query';


const fetchPatient = async (id: string): Promise<Patient> => {
  console.log("esse id aqui:", id);
  const response = await fetch(`https://cl8p4q8yqj.execute-api.us-east-1.amazonaws.com/v1/get-patient-by-id?patientId=${id}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar paciente');
  }

  const data = await response.json();

  const patient: Patient = {
    id: data.Id.S,
    name: data.Name.S,
    email: data.Email.S,
    dateOfBirth: data.DateOfBirth.S,
    cpf: data.CPF.S,
    address: {
      street: data.Address.M.Street.S,
      city: data.Address.M.City.S,
      state: data.Address.M.State.S,
      country: data.Address.M.Country.S,
      neighborhood: data.Address.M.Neighborhood.S,
      number: data.Address.M.Number.S,
      complement: data.Address.M.Complement.S,
      cep: data.Address.M.CEP.S
    }
  };

  return patient;
};
  const EditPatient: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const patientId = useSelector((state: RootState) => 
      state.patients.patients.find((p) => p.id === id)?.id
    );

  const { data: patient, error, isLoading } = useQuery(
    {
      queryKey: ['patient', id],
      queryFn: () => fetchPatient(id as string),
    }
  );

  const handleSave = (data: Patient) => {
    dispatch(updatePatient(data));
    navigate('/');
  };

  return <PatientForm initialData={patient} onSave={handleSave} />;
};

export default EditPatient;
