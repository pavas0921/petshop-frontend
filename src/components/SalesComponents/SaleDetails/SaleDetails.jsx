import React, { useState } from 'react'
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
  useTheme,
} from '@mui/material'
import {
    Person as PersonIcon,
    CreditCard as CreditCardIcon,
    Inventory as InventoryIcon,
    AttachMoney as AttachMoneyIcon,
    CalendarToday as CalendarTodayIcon,
    Receipt as ReceiptIcon
  } from '@mui/icons-material';
import SaleHeader from './SaleHeader';
import SaleProductList from './SaleProductList';

const SaleDetails = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{
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
      }}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Detalle de Venta
      </Typography>

      <SaleHeader isMobile={isMobile} theme={theme} />

      <SaleProductList isMobile={isMobile} theme={theme} />
        
    </Box>
  )
}

export default SaleDetails
