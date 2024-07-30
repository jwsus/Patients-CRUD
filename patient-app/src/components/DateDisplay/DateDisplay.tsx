import React from 'react';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DateDisplay: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <Box
      sx={{
        display: 'inline-block',
        padding: '4px 40px',
        borderRadius: '10px',
        backgroundColor: '#FFFFFF',
        color: '#757575',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
        border: '1px solid #F0F0F0',
      }}
    >
      <Typography>{formattedDate}</Typography>
    </Box>
  );
};

export default DateDisplay;
