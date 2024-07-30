import React, { useState } from 'react';
import PatientList from '../../components/PatientList/PatientList';
import styles from './PatientListPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {  deletePatient } from '../../redux/patientsSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, InputAdornment  } from '@mui/material';
import Header from '../../components/Header/Header';
import SearchIcon from '@mui/icons-material/Search';

const PatientListPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    dispatch(deletePatient(id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

 return (
  <Box >
    <Header />
  <Box className={styles.container}>
  
  <Box className={styles.line}></Box>
  <Box className={styles.newButtonContainer}>
    <Button disableElevation 
      style={{ backgroundColor: '#14acc4', color: 'white', padding: "3px 30px" }}  
      variant="contained" className={styles.newButton} 
      onClick={() => navigate('/create')}
    >+ Novo</Button>
  </Box>
  <Box className={styles.searchContainer}>
    <Box className={styles.searchHeader}>
      <Typography className={styles.title} variant="h2">Pacientes</Typography>
      <Box className={styles.searchBarContainer}>
        <Box className={styles.searchBar}>
          <TextField 
            type="text" 
            placeholder="Buscar..." 
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { backgroundColor: 'white' }
            }} />
          <Button 
              variant="contained"
              >
                Buscar
              </Button>
        </Box>
      </Box>
    </Box>
    <Box className={styles.patientList}>
      <PatientList  searchText={searchText}/>
    </Box>
  </Box>
</Box>
</Box>
  );
};

export default PatientListPage;