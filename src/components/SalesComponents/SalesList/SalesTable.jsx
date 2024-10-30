import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import styles from './styles.module.scss'
import { Table } from '../../Table'
import { useSalesByDate } from '../../../customHooks'
import { AddComponent } from '../../AddComponent'
import { MenuFilter } from '../../MenuFilterComponent'
import { ModalComponent } from '../../ModalComponent'
import { ModalDetails } from '../../ModalComponent/ModalDetails'
import { saleDetailsColumns } from '../../../helpers/tableColumns/saleDetailsColumns'
import SaleDetails from '../SaleDetails/SaleDetails'

const SalesTable = () => {
  const ventasResponse = useSalesByDate()
  const [totalSales, setTotalSales] = useState(null)
  const [saleDetail, setSaleDetail] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const { httpStatus, ventas, loading } = ventasResponse

  const handleClose = () => {
    setSaleDetail({})
    setOpenModal(false)
  }

  const columns = [
    { field: 'date', headerName: 'Fecha', width: 120 },
    { field: 'fullName', headerName: 'Cliente', width: 150 },
    { field: 'payMethod', headerName: 'Metodo de pago', width: 110 },
    { field: 'saleType', headerName: 'Estado del pago', width: 110 },
    { field: 'totalVenta', headerName: 'Total Venta', width: 110 },

    {
      field: 'actions',
      headerName: 'Ver Detalles',
      width: 90,
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon
              onClick={(event) => handleClick(event, params.row)}
            />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleClick = (event, row) => {
    console.log(row)
    setOpenModal(true)
    setSaleDetail(row)
  }
  const calcularTotalVentas = (ventas) => {
    return ventas.reduce((total, venta) => {
      return total + venta.totalVenta
    }, 0)
  }

  useEffect(() => {
    if (ventas.length > 0) {
      setTotalSales(calcularTotalVentas(ventas))
    }
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

        
        {totalSales && (
          <Typography variant="h4" color="initial">
            <p>Total Ventas: {totalSales}</p>
          </Typography>
        )}
      </Box>
      <Box className={styles.addButton}>
        <MenuFilter />
      </Box>

      {openModal && (
        <ModalDetails
          className={styles.modalContainer}
          open={openModal}
          handleClose={handleClose}
        >
          <SaleDetails />
        </ModalDetails>
      )}
    </Box>
  )
}

export default SalesTable
