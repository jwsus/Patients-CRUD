import React from 'react';
import { Box } from '@mui/material';
import DateDisplay from '../DateDisplay/DateDisplay';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <Box className={styles.header}>
      <img
        src="https://blog.medcloud.com.br/wp-content/uploads/2018/07/logo-medcloud-4.png"
        alt="Company Logo"
        className={styles.logo}
      />
      <Box className={styles.dateDisplay}>
        <DateDisplay />
      </Box>
    </Box>
  );
};

export default Header;
