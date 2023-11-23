export const agregarProducto = (item, producto, cantidad) => {

  
    const productoEncontrado = item.find((i) => i._id === producto);
    
    if (!productoEncontrado) {
      throw new Error("No se encontró el producto");
    }
  
    if (productoEncontrado.stock <= 0) {
      throw new Error(`No hay unidades disponibles de ${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion}`);
    }
  
    if (cantidad > productoEncontrado.stock) {
      throw new Error(`No hay suficientes unidades de ${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion}`);
    }
  
    const currentProduct = {
      detalleProducto: productoEncontrado._id,
      nombreProducto: `${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion}`,
      cantidad: +cantidad,
      precioUnitario: +productoEncontrado.precioVenta,
      precioTotal: +cantidad * +productoEncontrado.precioVenta,
      stock: +productoEncontrado.stock
    }
  
    return currentProduct;  
  }