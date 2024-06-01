import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import styles from './styles.module.scss'
import { Table } from '../../Table'
import { useSalesByDate } from '../../../customHooks'
import { AddComponent } from '../../AddComponent'
import { MenuFilter } from '../../MenuFilterComponent'

const SalesTable = () => {
  const ventasResponse = useSalesByDate()
  const { httpStatus, ventas, loading } = ventasResponse

  const columns = [
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'fullName', headerName: 'Cliente', width: 150 },
    { field: 'payMethod', headerName: 'Metodo de pago', width: 110 },
    { field: 'saleType', headerName: 'Estado del pago', width: 110 },
    { field: 'totalVenta', headerName: 'Total Venta', width: 110 },

    // {
    //   field: "actions",
    //   headerName: "Acciones",
    //   width: 80,
    //   renderCell: (params) => (
    //     <Box>
    //       <IconButton>
    //         <VisibilityIcon />
    //       </IconButton>
    //       <IconButton>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ]

  useEffect(() => {
    console.log(ventas)
  }, [ventas])

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        {ventas && ventas.length > 0 && !loading ? (
          <Table
            columns={columns}
            rows={ventas}
            loading={loading}
            rowHeight={56}
            columnHeaderHeight={56}
            title={'Listado de Ventas'}
          />
        ) : (
          ventas &&
          ventas.length === 0 &&
          !loading && (
            <Box
              sx={{
                width: '100%',
                height: '88vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" color="initial">
                No se encontraron ventas en este rango de fechas.
              </Typography>
            </Box>
          )
        )}
      </Box>
      <Box className={styles.addButton}>
        <MenuFilter />
      </Box>
    </Box>
  )
}

export default SalesTable
