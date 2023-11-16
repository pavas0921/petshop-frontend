export const buscarProducto = (item, producto, cantidad) => {

  const result = item.find((item) => item._id === producto);
  const currentProduct = {
    detalleProducto: result._id,
    nombreProducto: result.idProducto.name + " " + result.presentacion,
    cantidad: +cantidad,
    precioUnitario: +result.precioVenta,
    precioTotal: +result.precioVenta * +cantidad,
  };

  return currentProduct;
};
