// src/mockData.ts
import { Patient } from './redux/types';
interface PatientSummary {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

export const mockPatients: PatientSummary[] = [
  {
    id: "1",
    name: 'Vanderson Nascimento',
    email: 'vanderson.nascimento@email.com.br',
    dateOfBirth: '1996-04-27',
  },
  {
    id: "2",
    name: 'Márcia Fernandes Barbosa Souza',
    email: 'mfernandesbarbosassouza@email.com',
    dateOfBirth: '1990-06-06',
  },
  {
    id: "3",
    name: 'João Pereira Ferreira',
    email: 'jpferreira@email.com',
    dateOfBirth: '2000-02-14',
  },
  {
    id: "4",
    name: 'João Pereira Ferreira',
    email: 'jpferreira@email.com',
    dateOfBirth: '2000-02-14',
  },
  {
    id: "4",
    name: 'João Pereira Ferreira',
    email: 'jpferreira@email.com',
    dateOfBirth: '2000-02-14',
  }
];
