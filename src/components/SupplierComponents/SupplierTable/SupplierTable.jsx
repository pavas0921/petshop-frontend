import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Table } from '../../Table'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSupplierState,
  getAllSupplier,
} from '../../../features/supplier/supplierSlice'
import { AddComponent } from '../../AddComponent'
import styles from './styles.module.scss'

const SupplierTable = () => {
  const dispatch = useDispatch()
  const supplierResponse = useSelector(selectSupplierState)
  const { suppliers, supplierLoading } = supplierResponse

  useEffect(() => {
    dispatch(getAllSupplier())
  }, [dispatch])

  useEffect(() => {
    console.log(supplierResponse)
  }, [suppliers])

  const columns = [
    { field: 'nit', headerName: 'NIT', width: 300 },
    { field: 'name', headerName: 'Nombre', width: 300 },
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
        <Table
          columns={columns}
          rows={suppliers}
          loading={supplierLoading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={'Listado de Proveedores'}
        />
      </Box>

      <Box className={styles.addButton}>
        <AddComponent />
      </Box>
    </Box>
  )
}

export default SupplierTable
