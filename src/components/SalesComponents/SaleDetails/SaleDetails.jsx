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
    Receipt as ReceiptIcon,
    Print as PrintIcon  // Importamos el icono de impresión
  } from '@mui/icons-material';
import SaleHeader from './SaleHeader';
import SaleProductList from './SaleProductList';
import { generatePdf } from '../../../helpers/pdfUtils/pdfGenerator'

const SaleDetails = ({saleDetail}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePrint = () =>{
      console.log("```", saleDetail)
      const computedData = {
        _id: saleDetail._id,
        date: saleDetail.date,
        payMethod: saleDetail.payMethod,
        saleType: saleDetail.saleType,
        totalVenta: saleDetail.totalVenta,
        customer: {
          firstName: saleDetail.cliente?.firstName || '',
          lastName: saleDetail.cliente?.lastName || '',
          phone: saleDetail.cliente?.phone || '',
          address: saleDetail.cliente?.address || '',
          cedula: saleDetail.cliente?.cedula || ''
        },
        detalleVenta: saleDetail.detalleVenta.map(item => ({
          productName: item.productName,
          qty: item.qty,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        }))
      };
      
      generatePdf("salesReport", computedData);
    }


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
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', mb: 5 }}
        fontFamily={'Baloo 2'}
      >
        Detalle de Venta
      </Typography>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <SaleHeader isMobile={isMobile} theme={theme} saleDetail={saleDetail} />
        </Box>
   

      <SaleProductList isMobile={isMobile} theme={theme} saleDetail={saleDetail} />
      
      </Box>


       {/* Botón de impresión */}
       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={() => handlePrint()}  // Aquí iría la función de impresión
          sx={{
            px: 4,
            py: 1.5,
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}
        >
          Imprimir Factura
        </Button>
      </Box>

        
    </Box>
  )
}

export default SaleDetails
