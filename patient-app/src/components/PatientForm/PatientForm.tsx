import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './PatientForm.module.css';
import { Patient } from '../../redux/types';
import { validateCPF, validateDateOfBirth } from '../../validations/Validations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PatientFormProps {
  initialData?: Patient;
  onSave: (data: Patient) => void;
}

const formatDate = (date: Date) => format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSave }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Patient>({
    defaultValues: {
      id: initialData?.id || '',
      name: initialData?.name || '',
      email: initialData?.email || '',
      dateOfBirth: initialData?.dateOfBirth,
      cpf: initialData?.cpf || '',
      address: initialData?.address || {
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        country: '',
      }
    }
  });

  useEffect(() => {
    if (initialData) {
      setValue('id', initialData.id || '');
      setValue('name', initialData.name || '');
      setValue('email', initialData.email || '');
      setValue('dateOfBirth', initialData.dateOfBirth || '');
      setValue('cpf', initialData.cpf || '');
      setValue('address.cep', initialData.address?.cep || '');
      setValue('address.street', initialData.address?.street || '');
      setValue('address.number', initialData.address?.number || '');
      setValue('address.complement', initialData.address?.complement || '');
      setValue('address.neighborhood', initialData.address?.neighborhood || '');
      setValue('address.city', initialData.address?.city || '');
      setValue('address.state', initialData.address?.state || '');
      setValue('address.country', initialData.address?.country || '');
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<Patient> = async (data) => {
    try {
      const response = await fetch('https://cl8p4q8yqj.execute-api.us-east-1.amazonaws.com/v1/create-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar paciente');
      }
      onSave(data);
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        {initialData ? 'Editar paciente' : 'Cadastrar paciente'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Box className={styles.sectionTitle}>
          Dados pessoais
        </Box>
        <Box className={styles.formGroup}>
          <Box className={styles.formRow}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field }) => (
                <TextField
                  label="Nome completo"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Email inválido',
                }
              }}
              render={({ field }) => (
                <TextField
                  label="Email"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ 
                required: 'Data de nascimento é obrigatória',
                // validate: validateDateOfBirth 
              }}
              render={({ field }) => (
                <TextField
                  label="Data de nascimento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
            <Controller
              name="cpf"
              control={control}
              rules={{ 
                required: 'CPF é obrigatório',
                validate: validateCPF
              }}
              render={({ field }) => (
                <TextField
                  label="CPF"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                />
              )}
            />
          </Box>
        </Box>
        <Box className={styles.formGroup}>
          <Box className={styles.formRow}>
            <Controller
              name="address.cep"
              control={control}
              render={({ field }) => (
                <TextField
                  label="CEP"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Endereço"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.number"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Número"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.complement"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Complemento"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
          </Box>
          <Box className={styles.formRow}>
            <Controller
              name="address.neighborhood"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Bairro"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Cidade"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => (
                <TextField
                  label="UF"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
            <Controller
              name="address.country"
              control={control}
              render={({ field }) => (
                <TextField
                  label="País"
                  {...field}
                  variant="filled"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              )}
            />
          </Box>
        </Box>
        <Box className={styles.actions}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => window.history.back()}
            style={{ backgroundColor: '#9a9e9f', color: 'white', padding: "3px 30px", borderRadius: "5px" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ backgroundColor: '#14acc4', color: 'white', padding: "3px 30px", borderRadius: "5px" }}
          >
            Salvar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PatientForm;
