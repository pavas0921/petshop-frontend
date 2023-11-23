import { buscarProducto } from "./buscarProducto";
export const adicionarCantidad = (rows, producto, cantidad, item) =>{

    const updatedRows = [...rows]
    
    const productoEncontrado = buscarProducto(rows, producto, cantidad)
    const nuevaCantidad = rows[productoEncontrado].cantidad += +cantidad
    const precioUnitario = +rows[productoEncontrado].precioUnitario
    const nuevoPrecioTotal = +rows[productoEncontrado].precioUnitario * +nuevaCantidad
    const stock = item.find((i) => i._id === producto).stock;

    console.log("copia rows", nuevaCantidad)

    if(stock <= 0){
        const errorMsg = "No hay stock para el artículo " + updatedRows[productoEncontrado].nombreProducto;
        return {rows: rows, error: errorMsg}
        
    }else{

        if(nuevaCantidad > stock){
            updatedRows[productoEncontrado] = {
                ...updatedRows[productoEncontrado],
                cantidad: +stock,
                precioTotal: +precioUnitario * stock
              };
            const errorMsg = "No hay suficiente stock para el artículo " + updatedRows[productoEncontrado].nombreProducto;
            return { rows: updatedRows, error: errorMsg };
        }else{
            updatedRows[productoEncontrado] = {
                ...updatedRows[productoEncontrado],
                cantidad: +nuevaCantidad,
                precioTotal: +nuevoPrecioTotal
              };
              return { rows: updatedRows, error: null };
        }
    }

    
    
}