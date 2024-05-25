import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  FormControl,
  Autocomplete,
} from '@mui/material'
import { Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { Table } from '../../Table'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProductState,
  getProductsByCompany,
} from '../../../features/producto/productoSlice'
import {
  selectCustomerState,
  getCustomersByCompany,
} from '../../../features/customer/customerSlice'
import Loader from '../../LoaderComponent/Loader'
import { CardForm } from '../../CardForm'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import {
  // verifyStock,
  calculateProductDetails,
  AddProductQty,
  reduceProductQty,
} from '../../../helpers/salesUtils'
import {
  selectVentasState,
  createVenta,
  clearState,
  addSelectedProduct,
  setMessage,
} from '../../../features/venta/ventaSlice'
import ToastAlert from '../../Alerts/'
import { SaleForm } from './SaleForm'
import productsActions from '../../../customHooks/reduxActions/productsActions'

const BasicSale = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [totalSaleValue, setTotalSaleValue] = useState(0)
  const [qty, setQty] = useState(0)
  const [statusButton, setStatusButton] = useState(true)
  const [errorStatus, setErrorStatus] = useState()
  const [productDetails, setProductDetails] = useState([])
  const tokenData = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = tokenData
  const { verifyStock, validateProductExists } = productsActions()

  const paymentMethods = [
    { label: 'Efectivo', code: 'Efectivo' },
    { label: 'Bancolombia', code: 'Bancolombia' },
    { label: 'Nequi', code: 'Nequi' },
    { label: 'Datafono', code: 'Datafono' },
  ]

  const saleTypes = [
    { label: 'Contado', code: 'contado' },
    { label: 'Crédito', code: 'credito' },
  ]
  const dispatch = useDispatch()
  const productResponse = useSelector(selectProductState)
  const { products, productsLoading, productHttpStatus, productStatus } =
    productResponse

  const customerResponse = useSelector(selectCustomerState)
  const { customers } = customerResponse

  const ventaResponse = useSelector(selectVentasState)
  const {
    salesMessage,
    httpStatus,
    loading,
    salesFlag,
    saleDetail,
    salesStatus,
  } = ventaResponse

  const columns = [
    {
      field: 'productName',
      headerName: 'Producto',
      width: 300,
    },
    {
      field: 'unitPrice',
      headerName: 'Precio Unitario',
      width: 130,
    },
    {
      field: 'qty',
      headerName: 'Cantidad',
      width: 180,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleAdd(params.row)}>
            <AddIcon />
          </IconButton>
          {`${params.row.qty}`}
          <IconButton onClick={() => handleReduce(params.row)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'totalPrice',
      headerName: 'Precio Total',
      type: 'number',
      width: 90,
    },
  ]

  useEffect(() => {
    dispatch(getProductsByCompany(companyId))
    dispatch(getCustomersByCompany(companyId))
  }, [])

  useEffect(() => {
    setTotalSaleValue(
      productDetails.reduce((counter, item) => {
        return counter + item.totalPrice
      }, 0)
    )
  }, [productDetails])

  const onSubmit = (body) => {
    body.detalleVenta = productDetails
    body.totalVenta = totalSaleValue
    body.companyId = companyId
    dispatch(createVenta(body)).then(() => {
      // Llamar a resetForm después de que la venta sea exitosa
      resetForm()
    })
  }

  const resetForm = () => {
    reset({
      idCliente: '',
      date: null,
      detalleVenta: null,
      payMethod: '',
      saleType: '',
      totalVenta: 0,
    })
    setProductDetails([])
    setTotalSaleValue(0)
    setErrorStatus(null)
    setQty(0)
    setSelectedProduct(null)
  }

  const handleAdd = (row) => {
    const updatedProductDetail = AddProductQty(productDetails, products, row)
    //const index = productDetails.findIndex((item) => item._id === row._id);
    if (updatedProductDetail.error && !updatedProductDetail.stock) {
      setErrorStatus({
        error: updatedProductDetail.error,
        message: updatedProductDetail.message,
      })
    }
    setProductDetails(updatedProductDetail.updatedProduct)
    dispatch(addSelectedProduct(updatedProductDetail.updatedProduct))
  }

  const handleReduce = (row) => {
    const updatedProductDetail = reduceProductQty(productDetails, products, row)
    if (updatedProductDetail.error && !updatedProductDetail.stock) {
      setErrorStatus({
        error: updatedProductDetail.error,
        message: updatedProductDetail.message,
      })
    }

    setProductDetails(updatedProductDetail.updatedProduct)
  }

  const handleClick = () => {
    //Valida que se haya seleccionado un producto y cantidad
    if (!qty || !selectedProduct) {
      dispatch(
        setMessage({
          error: 'error',
          message: 'Debe seleccionar un producto y cantidad',
          flag: true,
        })
      )
      const timeoutId = setTimeout(() => {
        dispatch(clearState())
      }, 3000)
    } else {
      //Valida si existe algún producto en la canasta
      if (saleDetail.length > 0) {
        validateProductExists(selectedProduct, qty)
      } else {
        verifyStock(qty, selectedProduct)
      }
    }
    setSelectedProduct(null)
    setQty(0)
  }

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        {saleDetail.length === 0 ? (
          <Box className={styles.table_title}>
            <Typography variant="h6" color="initial">
              <p>Aún no has agregado productos a esta venta</p>
            </Typography>
          </Box>
        ) : (
          <Box className={styles.box_details}>
            <Table
              title={'Detalle de la Venta'}
              columns={columns}
              rows={saleDetail}
              rowHeigth={56}
              columnHeaderHeight={56}
              qty={qty}
              setQty={setQty}
            />
            <Typography variant="h6" color="initial" sx={{ marginTop: 2 }}>
              <p>Total Venta: ${totalSaleValue}</p>
            </Typography>
          </Box>
        )}
      </Box>
      <Box className={styles.box_form}>
        <Box className={styles.box_title}>
          <Typography variant="h4" component="h2">
            Formulario de Venta
          </Typography>
        </Box>
        <Box className={styles.box_form}>
          <SaleForm
            saleTypes={saleTypes}
            paymentMethods={paymentMethods}
            customers={customers}
            products={products}
            addProduct={handleClick}
            qty={qty}
            setQty={setQty}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            totalSaleValue={totalSaleValue}
            companyId={companyId}
            salesFlag={salesFlag}
          />
        </Box>
      </Box>
      <Box className={styles.box_saleHeader}></Box>
      {(productsLoading || loading) && <Loader />}

      {!loading && salesMessage && salesFlag && salesStatus && (
        <ToastAlert message={salesMessage} status={salesStatus} />
      )}
    </Box>
  )
}

export default BasicSale
