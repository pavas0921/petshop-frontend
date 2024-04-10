import React, { useEffect, useState } from 'react'
import { startOfWeek, endOfWeek } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVentasState,
  getVentasByDateRange,
} from '../features/venta/ventaSlice'
import { getDatesRange } from '../helpers/dateUtils/convertDates'

const useSalesByDate = () => {
  const dispatch = useDispatch()
  const ventasResponse = useSelector(selectVentasState)

  useEffect(() => {
    const ranges = getDatesRange()
    dispatch(
      getVentasByDateRange({
        startDate: ranges.firstDay,
        endDate: ranges.lastDay,
        idCompany: '65f5ee60ce0ee41a81558837',
      })
    )
  }, [dispatch])

  return ventasResponse
}

export default useSalesByDate
