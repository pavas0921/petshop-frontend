import React, { useState, useRef } from 'react'
import { selectProductState } from '../../features/producto/productoSlice'
import {
  selectVentasState,
  setMessage,
  clearState,
  addSelectedProduct,
  updateProductQty,
  removeSelectedProduct,
} from '../../features/venta/ventaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { validateProductExists } from '../../helpers/salesUtils'

const productsActions = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(selectProductState)
  const { saleDetail } = useSelector(selectVentasState)
  const [isUpdate, setIsUpdate] = useState(false)
  const isUpdateRef = useRef(isUpdate)

  const verifyStock = (qty, selectedProduct, index) => {
    const productIndex = searchedProduct(selectedProduct, products)
    if (qty > products[productIndex].stock) {
      dispatch(
        setMessage({
          error: 'error',
          message:
            'La cantidad seleccionada es mayor que las existencias del producto en inventario',
          flag: true,
        })
      )
    } else {
      calculateProductDetails(qty, selectedProduct, index)
    }
    const timeoutId = setTimeout(() => {
      dispatch(clearState())
    }, 3000)
  }

  const calculateProductDetails = (qty, selectedProduct, index) => {
    const productDetails = {
      _id: selectedProduct._id,
      productName: selectedProduct.productName,
      productImage: selectedProduct.image,
      qty: +qty,
      unitPrice: +selectedProduct.salePrice,
      totalPrice: +qty * +selectedProduct.salePrice,
    }
    if (index >= 0) {
      dispatch(updateProductQty(productDetails))
    } else {
      dispatch(addSelectedProduct(productDetails))
    }
  }

  const validateProductExists = (selectedProduct, qty) => {
    console.log('pr', selectedProduct)
    const index = searchedProduct(selectedProduct, saleDetail)
    const product = saleDetail[index]
    const computedProduct = {
      _id: product._id,
      productName: product.productName,
      image: product.image,
      qty: +qty,
      salePrice: +product.unitPrice,
      totalPrice: +product.totalPrice,
    }
    const newQty = +product.qty + +qty
    if (selectedProduct.qty === 1) {
      dispatch(removeSelectedProduct(computedProduct))
    } else {
      verifyStock(newQty, computedProduct, index)
    }
  }

  const searchedProduct = (productToFind, productList) => {
    const index = productList.findIndex(
      (item) => item._id === productToFind._id
    )
    return index
  }

  return { verifyStock, validateProductExists }
}

export default productsActions
