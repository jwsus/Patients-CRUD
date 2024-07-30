export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface Patient {
  id: string; 
  name: string;
  email: string;
  dateOfBirth: string;
  cpf: string;
  address: Address;
}

export interface PatientSummary {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}
