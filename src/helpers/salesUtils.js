export const verifyStock = (qty, selectedProduct) => {
  if (qty > selectedProduct.stock) {
    return {
      error: true,
      stock: false,
      message: "La cantidad es mayor que el stock del producto",
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
      message: null
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
      message: null
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
