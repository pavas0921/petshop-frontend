import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Table } from '../../Table'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSupplierState,
  getAllSupplier,
} from '../../../features/supplier/supplierSlice'
import { AddComponent } from '../../AddComponent'
import styles from './styles.module.scss'
import { ModalComponent } from '../../ModalComponent'
import { SupplierForm } from '../SupplierForm'

const SupplierTable = () => {
  const dispatch = useDispatch()
  const supplierResponse = useSelector(selectSupplierState)
  const { suppliers, supplierLoading } = supplierResponse
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)

  useEffect(() => {
    dispatch(getAllSupplier())
  }, [dispatch])

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
          <IconButton></IconButton>
          <IconButton></IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        {suppliers && suppliers.length > 0 ? (
          <Table
            columns={columns}
            rows={suppliers}
            loading={supplierLoading}
            rowHeigth={56}
            columnHeaderHeight={56}
            title={'Listado de Proveedores'}
          />
        ) : (
          <Box className={styles.box_noData}>
            <Typography variant="h5" color="initial">
              No se ha encontrado ningún proveedor
            </Typography>
          </Box>
        )}
      </Box>

      <Box className={styles.addButton}>
        <AddComponent openModal={openModal} setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent open={openModal} handleClose={handleClose}>
          <SupplierForm />
        </ModalComponent>
      )}
    </Box>
  )
}

export default SupplierTable
