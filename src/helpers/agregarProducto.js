export const agregarProducto = (item, producto, cantidad, rows) => {

  
  

  
    const productoEncontrado = item.find((i) => i.idDetalle === producto);
    console.log("pr", productoEncontrado)
    let errorMsg = "";
    
    if (!productoEncontrado) {
      errorMsg = "No se encontró el producto";
      return { error: errorMsg, rows: null};
    }
  
    if (productoEncontrado.stock <= 0) {
      errorMsg = `${productoEncontrado.nombreProducto} se encuentra sin Stock`
      return { error: errorMsg, rows: null};
    }
  
    if (cantidad > productoEncontrado.stock) {
      errorMsg = `No hay suficientes unidades de ${productoEncontrado.nombreProducto}`
      return { error: errorMsg, rows: null};
    }else{
      errorMsg = "¡Producto agregado con éxito!"
      const currentProduct = {
        detalleProducto: productoEncontrado.idDetalle,
        nombreProducto: `${productoEncontrado.nombreProducto}`,
        cantidad: +cantidad,
        precioUnitario: +productoEncontrado.precioVenta,
        precioTotal: +cantidad * +productoEncontrado.precioVenta,
        stock: +productoEncontrado.stock
      }
      return { error: errorMsg, rows: currentProduct};
    } 
    
  }