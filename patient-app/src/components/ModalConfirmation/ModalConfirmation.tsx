import React from 'react';
import { Modal, Box, Typography, Button, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ModalConfirmation.css'; // Importar o arquivo CSS

interface ModalConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Box className="modal-header">
          <Typography id="modal-modal-title" variant="h6">
            Excluir paciente
          </Typography>
          <IconButton 
            aria-label="close"
            onClick={onClose}
            className="close-button"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="modal-body">
          <Typography 
            id="modal-modal-description"
            sx={{ textAlign: 'center' }}
          >
            Você não terá mais acesso ao paciente, <br />
            você quer mesmo excluí-lo?
          </Typography>
        </Box>
        <Box className="modal-footer">
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button 
                variant="outlined" 
                onClick={onClose} 
                className="cancel-button"
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="error" 
                onClick={onConfirm}
              >
                Sim, excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirmation;
