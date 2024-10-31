import React, { useState, useEffect } from 'react';
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
  createTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

// Importar la fuente Baloo 2
import '@fontsource/baloo-2';

// Crear un tema personalizado con la fuente Baloo 2
const theme = createTheme({
  typography: {
    fontFamily: '"Baloo 2", cursive',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Baloo 2';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Baloo 2'), local('Baloo2-Regular'), url(@fontsource/baloo-2/files/baloo-2-latin-400-normal.woff2) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `,
    },
  },
});

const SaleHeader = ({isMobile, theme, saleDetail}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <ReceiptIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Número de Venta: {saleDetail._id}</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <PersonIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Cliente: {saleDetail.fullName} </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <CreditCardIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography fontFamily={theme.typography.fontFamily} variant={isMobile ? "body2" : "body1"}>Método de Pago: {saleDetail.payMethod}</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <InventoryIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Estado de Pago: {saleDetail.saleType} </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <AttachMoneyIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Total Venta: ${saleDetail.totalVenta} </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box display="flex" alignItems="center">
        <CalendarTodayIcon sx={{ mr: 1, fontSize: isMobile ? '1rem' : '1.25rem' }} />
        <Typography variant={isMobile ? "body2" : "body1"}>Fecha: {saleDetail.date} </Typography>
      </Box>
    </Grid>
  </Grid>
  )
}

export default SaleHeader
