//Esta funcion recibe como parametros los productos que ya han sido registrados (rows), cantidad y el id del producto a agregar (producto)
//Encuentra la posicion del producto.
//Crea una copia del array original (rows) y actualiza en el (updatedRows), la cantidad y el valorTotal.

export const buscarProducto = (rows, producto, cantidad) => {
  const result = rows.findIndex((i) => i.detalleProducto === producto);
  console.log("result", result)
  return result  
};