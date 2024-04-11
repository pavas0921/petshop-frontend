import React, { useEffect, useState } from 'react'
import { startOfWeek, endOfWeek } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVentasState,
  getVentasByDateRange,
} from '../features/venta/ventaSlice'
import { getDatesRange } from '../helpers/dateUtils/convertDates'
import { verifyTokenExpiration } from '../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

const useSalesByDate = () => {
  const dispatch = useDispatch()
  const ventasResponse = useSelector(selectVentasState)
  const navigate = useNavigate()

  useEffect(() => {
    const isValidToken = verifyTokenExpiration()
    const { status, companyId, rolId, userId } = isValidToken
    console.log(companyId)
    if (status) {
      const ranges = getDatesRange()
      dispatch(
        getVentasByDateRange({
          startDate: ranges.firstDay,
          endDate: ranges.lastDay,
          idCompany: companyId,
        })
      )
    } else {
      navigate('/')
    }
  }, [dispatch])

  return ventasResponse
}

export default useSalesByDate
