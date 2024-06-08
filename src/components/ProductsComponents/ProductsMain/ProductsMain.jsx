import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { CardComponent } from '../../CardComponent'
import { useDispatch, useSelector } from 'react-redux'
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
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '9px',
          }}
        >
          <ViewSwitcher viewType={viewType} setViewType={setViewType} />
        </Box>
      </Box>

      {productsLoading && <Loader />}

      <Box className={styles.box_cards}>
        {!viewType ? (
          <>
            {productResponse && products && products.length > 0 ? (
              <CardComponent
                products={products
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
                      product.productName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      (product.barCode &&
                        product.barCode
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()))
                  )}
              />
            ) : (
              <Box sx={{ width: '100%', minHeight: '75vh' }}>
                <Typography variant="h6" color="initial">
                  Aún no has registrado ningún producto.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="h1" color="initial">
              hola
            </Typography>
          </>
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
