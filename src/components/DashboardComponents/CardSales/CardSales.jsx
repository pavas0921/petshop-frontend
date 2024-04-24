import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVentasState,
  getDailySalesCount,
} from '../../../features/venta/ventaSlice'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'

const CardSales = () => {
  const dispatch = useDispatch()
  const { totalDailySales } = useSelector(selectVentasState)

  useEffect(() => {
    const isValidToken = verifyTokenExpiration()
    const { status, companyId, rolId, userId } = isValidToken
    dispatch(
      getDailySalesCount({
        idCompany: companyId,
      })
    )
  }, [dispatch])

  useEffect(() => {
    console.log(totalDailySales)
  }, [totalDailySales])

  return (
    <Box>
      <Card sx={{ width: '30%', marginTop: '20px', marginLeft: '20px' }}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom variant="h4">
            Ventas del día
          </Typography>
          <Typography variant="h6" component="div">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long', // Día de la semana completo (ej. lunes)
              year: 'numeric', // Año (ej. 2024)
              month: 'long', // Nombre del mes (ej. enero)
              day: 'numeric', // Día del mes (ej. 1)
            })}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {totalDailySales > 0 ? '$' + totalDailySales : '$0'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Ver Ventas</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default CardSales
