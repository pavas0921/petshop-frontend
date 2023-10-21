import { configureStore } from "@reduxjs/toolkit";
import productoReducer from "../features/producto/productoSlice";
import loginReducer from "../features/login/loginSlice";
import categoriaReducer from "../features/categoria/categoriaSlice";
import especieReducer from "../features/especie/especieSlice";
import detalleProductoReducer from "../features/detalleProducto/detalleProductoSlice";
import userReducer from "../features/user/userSlice";
import ventaReducer from "../features/venta/ventaSlice";

export const store = configureStore({
  reducer: {
    productos: productoReducer,
    login: loginReducer,
    categorias: categoriaReducer,
    especies: especieReducer,
    detalleProductos: detalleProductoReducer,
    users: userReducer,
    ventas: ventaReducer,
  },
});
