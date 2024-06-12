import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { CardComponent } from '../../CardComponent'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  selectProductState,
  getProducts,
  clearAlert,
  getProductsByCompany,
} from '../../../features/producto/productoSlice'
import { AddComponent } from '../../AddComponent'
import styles from './styles.module.scss'
import { ModalComponent } from '../../ModalComponent'
import ToastAlert from '../../Alerts'
import { verifyTokenExpiration } from '../../../helpers/verifyToken'
import Loader from '../../LoaderComponent/Loader'
import { InputSearch, SelectCategories } from '../ProductFinder'
import ProductForm from '../ProductForm/ProductForm'
import { ViewSwitcher } from '../SelectorProductsView'
import { Table } from '../../Table'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

const ProductsMain = () => {
  const tokenData = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = tokenData
  const [viewType, setViewType] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [alert, setAlert] = useState({
    status: null,
    message: null,
  })
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  const dispatch = useDispatch()
  const productResponse = useSelector(selectProductState)
  const {
    productHttpStatus,
    productMessage,
    productStatus,
    products,
    productsLoading,
    productFlag,
  } = productResponse

  const columns = [
    { field: 'productName', headerName: 'Producto', width: 300 },
    { field: 'salePrice', headerName: 'Precio', width: 200 },
    { field: 'stock', headerName: 'Stock', width: 200 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => <Box>{status ? 'Activo' : 'Inactivo'}</Box>,
    },

    {
      headerName: 'Acciones',
      width: 80,
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  useEffect(() => {
    dispatch(clearAlert())
    if (status) {
      dispatch(getProductsByCompany(companyId))
    }
  }, [])

  useEffect(() => {
    console.log('view', viewType)
  }, [viewType])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    console.log(openModal)
  }, [openModal])

  const filteredProducts = products
    .filter(
      (product) =>
        !selectedCategory ||
        (product.idCategoria._id &&
          String(product.idCategoria._id).toLowerCase() ===
            selectedCategory.toLowerCase())
    )
    .filter(
      (product) =>
        searchTerm.trim() === '' ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barCode &&
          product.barCode.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_inputs}>
        <InputSearch
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <SelectCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ViewSwitcher viewType={viewType} setViewType={setViewType} />
      </Box>

      {productsLoading && <Loader />}

      <Box className={styles.box_cards}>
        {!viewType ? (
          <>
            {productResponse && products && products.length > 0 ? (
              <CardComponent products={filteredProducts} />
            ) : (
              <Box sx={{ width: '100%', minHeight: '75vh' }}>
                <Typography variant="h6" color="initial">
                  Aún no has registrado ningún producto.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ width: '80%', marginTop: '-30px' }}>
            <Table
              columns={columns}
              rows={filteredProducts}
              loading={productsLoading}
              rowHeigth={56}
              columnHeaderHeight={56}
              title={'Listado de Productos'}
            />
          </Box>
        )}
      </Box>
      <Box className={styles.boxAdd}>
        <AddComponent openModal={openModal} setOpenModal={setOpenModal} />
      </Box>

      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <ProductForm setAlert={setAlert} handleClose={handleClose} />
        </ModalComponent>
      )}
      {productFlag &&
        (productHttpStatus === 201 || productHttpStatus === 200) &&
        productStatus === 'success' && (
          <ToastAlert message={productMessage} status={productStatus} />
        )}
    </Box>
  )
}

export default ProductsMain
