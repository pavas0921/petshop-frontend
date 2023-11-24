//Esta funcion recibe como parametros los productos que ya han sido registrados (rows),
// la cantidad y el id del producto a agregar (producto)
// Si el producto está en rows Encuentra la posicion del producto.
// sino retorna -1
export const buscarProducto = (rows, producto, cantidad) => {
  const result = rows.findIndex((i) => i.detalleProducto === producto);
  return result  
};