import { useDispatch } from 'react-redux'
import { getVentasByDateRange } from '../../features/venta/ventaSlice'

const useSalesActions = () => {
  const dispatch = useDispatch()
  const searchByDate = (startDate, endDate, idCompany) => {
    dispatch(
      getVentasByDateRange({
        startDate,
        endDate,
        idCompany,
      })
    )
  }

  return { searchByDate }
}

export default useSalesActions
