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

const SaleProductList = ({isMobile, theme}) => {
    const productosVendidos = [
        { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 250, total: 500 },
        { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 750, total: 750 },
      ];
  return (
         <TableContainer component={Paper}>
            <Table aria-label="tabla de productos" size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio Unitario</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosVendidos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell component="th" scope="row">
                      {producto.nombre}
                    </TableCell>
                    <TableCell align="right">{producto.cantidad}</TableCell>
                    <TableCell align="right">${producto.precioUnitario.toFixed(2)}</TableCell>
                    <TableCell align="right">${producto.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

  )
}

export default SaleProductList
