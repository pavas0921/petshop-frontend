export const buscarProducto = (item, producto, cantidad) => {

  const result = item.find((item) => item._id === producto);
  const currentProduct = {
    id: result._id,
    producto: result.idProducto.name + " " + result.presentacion,
    cantidad: +cantidad,
    precioUnitario: +result.precioVenta,
    precioTotal: +result.precioVenta * +cantidad,
  };

  return currentProduct;
};
