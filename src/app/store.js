import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/producto/productoSlice";
import loginReducer from "../features/login/loginSlice";
import categoriaReducer from "../features/categoria/categoriaSlice";
import especieReducer from "../features/especie/especieSlice";
import detalleProductoReducer from "../features/detalleProducto/detalleProductoSlice";
import userReducer from "../features/user/userSlice";
import ventaReducer from "../features/venta/ventaSlice";
import rolReducer from "../features/rol/rolSlice";
import companyReducer from "../features/company/companySlice";
import imageReducer from "../features/cloudinary/cloudinarySlice"
import surveyReducer from "../features/survey/surveySlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    login: loginReducer,
    categories: categoriaReducer,
    especies: especieReducer,
    detalleProductos: detalleProductoReducer,
    users: userReducer,
    ventas: ventaReducer,
    roles: rolReducer,
    companies: companyReducer,
    images: imageReducer,
    surveys: surveyReducer
  },
});
