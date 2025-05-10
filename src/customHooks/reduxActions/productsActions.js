import React, { useState } from 'react'
import {
  selectProductState,
  getProductsByCompany,
} from '../../features/producto/productoSlice'
import {
  selectVentasState,
  setMessage,
  clearState,
  addSelectedProduct,
  updateProductQty,
  removeSelectedProduct,
  createVenta,
  clearSaleDetail,
} from '../../features/venta/ventaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { verifyTokenExpiration } from '../../helpers/verifyToken'
import { generatePdf } from '../../helpers/pdfUtils/pdfGenerator'

const productsActions = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(selectProductState)
  const { saleDetail } = useSelector(selectVentasState)
  const tokenData = verifyTokenExpiration()
  const { status, companyId, rolId, userId } = tokenData

  const verifyStock = (qty, selectedProduct, index) => {
    dispatch(clearState())
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
    const index = searchedProduct(selectedProduct, saleDetail)
    if (index >= 0) {
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
      if (selectedProduct.qty === 1 && qty === -1) {
        dispatch(removeSelectedProduct(computedProduct))
      } else {
        verifyStock(newQty, computedProduct, index)
      }
    } else {
      verifyStock(qty, selectedProduct, index)
    }
  }

  const registerSale = (body, totalSaleValue) => {
    body.detalleVenta = saleDetail
    body.totalVenta = +totalSaleValue
    body.companyId = companyId
    dispatch(createVenta(body)).then(() => {
      body.customer = JSON.parse(sessionStorage.getItem("customer"));
      generatePdf("salesReport", body);
      dispatch(clearSaleDetail())
      dispatch(getProductsByCompany(companyId))
      const timeoutId = setTimeout(() => {
        dispatch(clearState())
      }, 3500)
    })
  }

  const searchedProduct = (productToFind, productList) => {
    const index = productList.findIndex(
      (item) => item._id === productToFind._id
    )
    return index
  }

  const deleteProductFromCarList = (productToDelete) => {
    const userConfirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este producto de la venta?'
    )

    if (userConfirmed) {
      dispatch(removeSelectedProduct(productToDelete))
    }
  }

  return {
    verifyStock,
    validateProductExists,
    registerSale,
    deleteProductFromCarList,
  }
}

export default productsActions
