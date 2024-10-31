import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const SaleProductList = ({ isMobile, theme, saleDetail }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table
        aria-label="tabla de productos"
        size={isMobile ? 'small' : 'medium'}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
            <StyledTableCell align="right">Precio Unitario</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {saleDetail.detalleVenta.map((producto, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {producto.productName}
              </StyledTableCell>
              <StyledTableCell align="right">{producto.qty}</StyledTableCell>
              <StyledTableCell align="right">
                ${producto.unitPrice}
              </StyledTableCell>
              <StyledTableCell align="right">
                ${producto.totalPrice}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SaleProductList
