import React, { useState } from 'react';
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
import {
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

const SaleHeader = ({isMobile, theme}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <ReceiptIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Número de Venta: </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <PersonIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Cliente: </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <CreditCardIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Método de Pago: </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <InventoryIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Estado de Pago: </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <AttachMoneyIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Total Venta: </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <CalendarTodayIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Fecha: </Typography>
      </Box>
    </Grid>
  </Grid>
  )
}

export default SaleHeader
