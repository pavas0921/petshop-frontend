import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { Table } from '../../Table'
import { AddComponent } from '../../AddComponent'
import styles from './styles.module.scss'
import { ModalComponent } from '../../ModalComponent'
import { SupplierForm } from '../SupplierForm'

const SupplierTable = ({ rows, loading, setOpenModal, setItem }) => {
  const columns = [
    { field: 'nit', headerName: 'NIT', width: 150 },
    { field: 'companyName', headerName: 'Nombre', width: 250 },
    {
      field: 'commercialAdvisor',
      headerName: 'Nombre Asesor Comercial',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Telefono Asesor Comercial',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Dirección Punto de Venta',
      width: 250,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(event) => handleClick(event, params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => console.log('hola')}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleClick = (event, item) => {
    event.stopPropagation() // Evita que el clic llegue al contenedor padre
    setOpenModal(true)
    setItem(item)
  }

  return (
    <Box className={styles.box_table}>
      {rows && rows.length > 0 && (
        <Table
          columns={columns}
          rows={rows}
          loading={loading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={'Listado de Proveedores'}
        />
      )}
    </Box>
  )
}

export default SupplierTable
