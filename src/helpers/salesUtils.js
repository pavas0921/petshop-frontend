export const verifyStock = (qty, selectedProduct) => {
  if (qty > selectedProduct.stock) {
    return {
      error: true,
      stock: false,
      message: "La cantidad es mayor que el stock actual del producto",
    };
  } else {
    return {
      error: false,
      stock: true,
    };
  }
};

export const calculateProductDetails = (qty, selectedProduct) => {
  const totalPrice = +qty * +selectedProduct.salePrice;
  return {
    _id: selectedProduct._id,
    productName: selectedProduct.productName,
    productImage: selectedProduct.image,
    qty: +qty,
    unitPrice: +selectedProduct.salePrice,
    totalPrice: totalPrice,
  };
};

export const AddProductQty = (productDetails, products, row) => {
  const updatedQty = row.qty + 1;
  const indexProductDetails = productDetails.findIndex(
    (item) => item._id === row._id
  );
  const indexProducts = products.findIndex((item) => item._id === row._id);
  const validateStock = verifyStock(updatedQty, products[indexProducts]);
  const productDetailsCopy = [...productDetails];

  if (!validateStock.error && validateStock.stock) {
    const updatedProductDetail = calculateProductDetails(
      updatedQty,
      products[indexProducts]
    );
    productDetailsCopy[indexProductDetails] = updatedProductDetail;
    return {
      updatedProduct: productDetailsCopy,
      stock: true,
      error: false,
      message: null,
    };
  } else {
    return {
      updatedProduct: productDetails,
      stock: false,
      error: true,
      message: "La cantidad es mayor que el stock del producto",
    };
  }
};

export const reduceProductQty = (productDetails, products, row) => {
  const updatedQty = row.qty - 1;
  const productDetailsCopy = [...productDetails];
  if (updatedQty <= 0) {
    const updatedQty = deleteProduct(productDetailsCopy, row);
    return {
      updatedProduct: updatedQty,
      stock: true,
      error: false,
      message: "El producto fue eliminado del carrito de compras!",
    };
  } else {
    const indexProductDetails = productDetails.findIndex(
      (item) => item._id === row._id
    );
    const indexProducts = products.findIndex((item) => item._id === row._id);
    const validateStock = verifyStock(updatedQty, products[indexProducts]);
    if (!validateStock.error && validateStock.stock) {
      const updatedProductDetail = calculateProductDetails(
        updatedQty,
        products[indexProducts]
      );
      productDetailsCopy[indexProductDetails] = updatedProductDetail;
      return {
        updatedProduct: productDetailsCopy,
        stock: true,
        error: false,
        message: null,
      };
    }
  }
};

export const deleteProduct = (productDetails, row) => {
  const indexProductDetails = productDetails.findIndex(
    (item) => item._id === row._id
  );
  productDetails.splice(indexProductDetails, 1);
  return productDetails;
};

export const validateProductExists = (productDetails, selectedProduct, qty) =>{
  const index = productDetails.findIndex((item) => item._id === selectedProduct._id)
  const product = productDetails[index];
  if(index !== -1){
    const newQty = (+product.qty) + (+qty )
    const stockAvailable = verifyStock(newQty, selectedProduct)
    if(!stockAvailable.error && stockAvailable.stock){
      const newProductDetails = [...productDetails];
      newProductDetails[index] = {
        ...newProductDetails[index],
        qty: newQty,
        totalPrice: (+newQty) *( productDetails[index].unitPrice)
      };
      return {
        exist: true, 
        stock: true,
        productDetails: newProductDetails
      }
    }else{
      return{
        stock: false,
        productDetails: productDetails
      }
    }
  }else{
    return{
      exist: false
    }
  }
  

}


