import React from 'react'
import {
  Button,
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';

const ModalDetails = (props) => {
  const { open, handleClose, setAlert, product, update, children } = props
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '95%' : 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    maxHeight: '90vh',
    overflowY: 'auto',
    minWidth: isMobile ? '95%' : '80%',
    maxWidth: '95%',
    borderRadius: 2,
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ minHeigth: '80vh' }}
    >
     {children}
    </Modal>
  )
}

export default ModalDetails
