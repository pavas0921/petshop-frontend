import { useDispatch } from 'react-redux'
import {
  getVentasByDateRange,
  createVenta,
  clearState,
} from '../../features/venta/ventaSlice'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { generatePdf } from '../../helpers/pdfUtils/pdfGenerator'
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

  const registerSale = async (body) => {
    console.log("hola")
    const { status } = verifyTokenExpiration()
    if (status) {
      dispatch(clearState())
      await dispatch(createVenta(body)).unwrap();  // <-- Espera la respuesta
      generatePdf("salesReport", body);
    } else {
      sessionStorage.clear()
      localStorage.clear()
      navigate('/')
    }
  }

  return { searchByDate, registerSale }
}

export default useSalesActions
