export const agregarProducto = (item, producto, cantidad, rows) => {

  
    const productoEncontrado = item.find((i) => i._id === producto);
    let errorMsg = "";
    
    if (!productoEncontrado) {
      errorMsg = "No se encontró el producto";
      return { error: errorMsg, rows: null};
    }
  
    if (productoEncontrado.stock <= 0) {
      errorMsg = `${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion} se encuentra sin Stock`
      return { error: errorMsg, rows: null};
    }
  
    if (cantidad > productoEncontrado.stock) {
      errorMsg = `No hay suficientes unidades de ${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion}`
      return { error: errorMsg, rows: null};
    }else{
      errorMsg = "¡Producto agregado con éxito!"
      const currentProduct = {
        detalleProducto: productoEncontrado._id,
        nombreProducto: `${productoEncontrado.idProducto.name} ${productoEncontrado.presentacion}`,
        cantidad: +cantidad,
        precioUnitario: +productoEncontrado.precioVenta,
        precioTotal: +cantidad * +productoEncontrado.precioVenta,
        stock: +productoEncontrado.stock
      }
      return { error: errorMsg, rows: currentProduct};
    } 
    
  }