
//Esta funcion recibe como parametros los productos que ya han sido registrados (rows), cantidad y el id del producto a agregar (producto)
//Encuentra la posicion del producto.
//Crea una copia del array original (rows) y actualiza en el (updatedRows), la cantidad y el valorTotal.

export const adicionarCantidad = (rows, producto, cantidad) => {
    const result = rows.findIndex((item) => item.id === producto);
    if(result >= 0){
        const newRows = [...rows]
        newRows[result]={
            ...newRows[result],
              cantidad: +newRows[result].cantidad + +cantidad,
              precioTotal: +newRows[result].precioUnitario * (+rows[result].cantidad + +cantidad),
            }
        return newRows;
    }else{
        return null
    }
    
  };
  