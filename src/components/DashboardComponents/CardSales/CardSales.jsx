import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVentasState,
  getDailySalesCount,
} from '../../../features/venta/ventaSlice'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import styles from './styles.module.scss'

const CardSales = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { totalDailySales } = useSelector(selectVentasState)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const isValidToken = verifyTokenExpiration()
    const { status, companyId, rolId, userId } = isValidToken
    dispatch(
      getDailySalesCount({
        idCompany: companyId,
        date: today,
      })
    )
  }, [])

  useEffect(() => {
    console.log(totalDailySales)
  }, [totalDailySales])

  return (
    <Box className={styles.box_main}>
      <Card className={styles.card}>
        <CardContent>
          <Typography className={styles.main_title} variant="h4">
            Ventas del día
          </Typography>
          <Typography className={styles.date_title} variant="h6">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long', // Día de la semana completo (ej. lunes)
              year: 'numeric', // Año (ej. 2024)
              month: 'long', // Nombre del mes (ej. enero)
              day: 'numeric', // Día del mes (ej. 1)
            })}
          </Typography>
          <Typography
            className={styles.sales_title}
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {totalDailySales > 0 ? '$' + totalDailySales : '$0'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={styles.button}
            size="small"
            onClick={() => navigate('/sales')}
          >
            Ver Ventas
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default CardSales
