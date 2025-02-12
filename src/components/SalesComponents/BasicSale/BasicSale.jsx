import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import { Table } from '../../Table'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete';
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
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import {
  selectVentasState,
  clearState,
  setMessage,
} from '../../../features/venta/ventaSlice'
import ToastAlert from '../../Alerts/'
import { SaleForm } from './SaleForm'
import productsActions from '../../../customHooks/reduxActions/productsActions'

const BasicSale = ({saleType}) => {
  const [productKey, setProductKey] = useState(Date.now())
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [manualValue, setManualValue] = useState(0)
  const [totalSaleValue, setTotalSaleValue] = useState(0)
  const [qty, setQty] = useState(1)
  const [productDetails, setProductDetails] = useState([])
  const tokenData = verifyTokenExpiration()
  const { companyId } = tokenData
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Ajusta 'sm' según el punto de quiebre que necesites

  // useEffect(() => {
  //   console.log('selectedProduct', selectedProduct)
  // }, [selectedProduct])

  const { verifyStock, validateProductExists, reduceProductQty, deleteProductFromCarList } =
    productsActions()

  const paymentMethods = [
    { label: 'Efectivo', code: 'Efectivo' },
    { label: 'Bancolombia', code: 'Bancolombia' },
    { label: 'Nequi', code: 'Nequi' },
    { label: 'Datafono', code: 'Datafono' },
  ]

  const saleTypes = [
    { label: 'Pagada', code: 'pagada' },
    { label: 'Pendiende', code: 'pendiente' },
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
    salesHttpStatus,
    loading,
    salesFlag,
    saleDetail,
    salesStatus,
  } = ventaResponse

  const columns = [
    {
      field: 'productName',
      headerName: 'Producto',
      width: isMobile ? 150 : 220, // Ajuste dinámico
    },
    {
      field: 'unitPrice',
      headerName: 'Precio Unitario',
      width: isMobile ? 100 : 150,
    },
    {
      field: 'qty',
      headerName: 'Cantidad',
      width: isMobile ? 100 : 100,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => validateProductExists(params.row, +1)}>
            <AddIcon />
          </IconButton>
          {`${params.row.qty}`}
          <IconButton onClick={() => validateProductExists(params.row, -1)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'totalPrice',
      headerName: 'Precio Total',
      type: 'number',
      width: isMobile ? 100 : 150,
    },
    {
      field: 'deleteProduct',
        headerName: 'Eliminar',
        width: isMobile ? 100 : 120,
        renderCell: (params) => (
          <Box>
            <IconButton onClick={() => deleteProductFromCarList(params.row)}>
              <DeleteIcon />
            </IconButton>   
          </Box>
        ),
      },
    ]

  useEffect(() => {
    dispatch(getProductsByCompany(companyId))
    dispatch(getCustomersByCompany(companyId))
  }, [])

  useEffect(() => {
    setTotalSaleValue(
      saleDetail.reduce((counter, item) => {
        return counter + item.totalPrice
      }, 0)
    )
  }, [saleDetail])

  const handleReduce = (row) => {
    validateProductExists(row, -1)
  }

  const handleClick = () => {
    console.log(selectedProduct);
    
    let updatedProduct = selectedProduct;
    if(saleType === "free"){
      const copySelectedProduct = {...selectedProduct}
      copySelectedProduct.salePrice = +manualValue
      setSelectedProduct(copySelectedProduct)     
      updatedProduct = copySelectedProduct;
    }
    //Valida que se haya seleccionado un producto y cantidadde
    if (!qty || qty <= 0 || !updatedProduct) {
      dispatch(
        setMessage({
          error: 'error',
          message: 'Debe seleccionar un producto y cantidad',
          flag: true,
        })
      )
      // const timeoutId = setTimeout(() => {
      //   dispatch(clearState())
      // }, 3000)
    } else {
      //Valida si existe algún producto en la canasta
      if (saleDetail.length > 0) {
        validateProductExists(updatedProduct, qty)
      } else {
        verifyStock(qty, updatedProduct)
      }
    }
    setProductKey(Date.now())
    setSelectedProduct('')
    setManualValue(0);
    updatedProduct = "";
    setQty(1)
    const timeoutId = setTimeout(() => {
      dispatch(clearState())
    }, 3000)
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
            <Box className={styles.totalSale}>
              <Typography
                className={styles.typography}
                variant="h6"
                color="initial"
                sx={{ marginTop: 2 }}
              >
                <p>Total Venta: ${totalSaleValue}</p>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box className={styles.box_form}>
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
            setTotalSaleValue={setTotalSaleValue}
            setProductKey={setProductKey}
            productKey={productKey}
            saleType={saleType}
            setManualValue = {setManualValue}
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
