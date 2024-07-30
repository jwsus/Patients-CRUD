import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {  selectPatient  } from '../../redux/patientsSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import styles from './PatientList.module.css';
import ModalConfirmation from '../ModalConfirmation/ModalConfirmation';
import { useQuery, useMutation, useQueryClient, UseQueryResult  } from '@tanstack/react-query';
import { PatientSummary } from '../../redux/types';

interface PatientListProps {
  searchText: string;
}

const fetchPatients = async (searchText: string): Promise<PatientSummary[]> => {
  const response = await fetch(`https://cl8p4q8yqj.execute-api.us-east-1.amazonaws.com/v1/patients?filterText=${searchText}`);  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  const patients = data.items.map((item: any) => ({
    id: item.Id.S,
    name: item.Name.S,
    email: item.Email.S,
    dateOfBirth: item.DateOfBirth.S
  }));

  return patients;
};

const deletePatient = async (patientId: string) => {
  const response = await fetch(`https://cl8p4q8yqj.execute-api.us-east-1.amazonaws.com/v1/delete-patient?patientId=${patientId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ patientId: patientId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete patient');
  }
};

const PatientList: React.FC<PatientListProps> = ({ searchText  }) => {
  const { data, error, isLoading }: UseQueryResult<PatientSummary[], Error> = useQuery<PatientSummary[], Error>({
    queryKey: ['patients', searchText],
    queryFn: () =>fetchPatients(searchText)
  });
  

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);


  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    dispatch(selectPatient(id));
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedPatientId(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    console.log("selectedPatientId", selectedPatientId)
    if (selectedPatientId) {
      data?.filter(patient => patient.id !== selectedPatientId);
      deletePatient(selectedPatientId);
      setOpenModal(false);
    }
  };

  return (
    <div className={styles.patientTableContainer}>
      <table className={styles.patientTable}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
              <td className={styles.actions}>
                <button 
                  className={styles.actionButton}
                  onClick={() => navigate(`/edit/${patient.id}`)}>
                  <EditIcon />
                </button>
                <button 
                  className={styles.actionButton}
                  onClick={() => handleDeleteClick (patient.id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalConfirmation
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PatientList;