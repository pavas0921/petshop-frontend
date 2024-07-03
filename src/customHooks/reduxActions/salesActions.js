import { useDispatch } from 'react-redux'
import {
  getVentasByDateRange,
  createVenta,
  clearState,
} from '../../features/venta/ventaSlice'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { useNavigate } from 'react-router-dom'

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

  const registerSale = (body) => {
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(clearState())
      dispatch(createVenta(body))
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  return { searchByDate, registerSale }
}

export default useSalesActions
