import React from 'react'
import { selectProductState } from '../../features/producto/productoSlice'
import {
  selectVentasState,
  setMessage,
  clearState,
  addSelectedProduct,
  updateProductQty,
} from '../../features/venta/ventaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { validateProductExists } from '../../helpers/salesUtils'

const productsActions = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(selectProductState)
  const { saleDetail } = useSelector(selectVentasState)

  const verifyStock = (qty, selectedProduct) => {
    if (qty > selectedProduct.stock) {
      dispatch(
        setMessage({
          error: 'error',
          message:
            'La cantidad seleccionada es mayor que las existencias del producto en inventario',
          flag: true,
        })
      )
    } else {
      calculateProductDetails(qty, selectedProduct)
    }
    const timeoutId = setTimeout(() => {
      dispatch(clearState())
    }, 3000)
  }

  const calculateProductDetails = (qty, selectedProduct) => {
    const productDetails = {
      _id: selectedProduct._id,
      productName: selectedProduct.productName,
      productImage: selectedProduct.image,
      qty: +qty,
      unitPrice: +selectedProduct.salePrice,
      totalPrice: +qty * +selectedProduct.salePrice,
    }
    dispatch(addSelectedProduct(productDetails))
  }

  const validateProductExists = (selectedProduct, qty) => {
    const index = saleDetail.findIndex(
      (item) => item._id === selectedProduct._id
    )
    const product = saleDetail[index]
    if (index !== -1) {
      const newQty = +product.qty + +qty
      if (selectedProduct.stock > newQty) {
        dispatch(updateProductQty({ index: index, qty: newQty }))
      }
    } else {
      verifyStock(qty, selectedProduct)
    }
  }

  return { verifyStock, validateProductExists }
}

export default productsActions
