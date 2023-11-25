import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { DetalleProducto } from "../pages/DetalleProducto";
import { RegistroProductos, VerProductos } from "../pages/Productos";
import { Register } from "../pages/User";
import { NewSale, Ventas } from "../pages/Ventas";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "products-add",
    element: <RegistroProductos />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "products",
    element: <VerProductos />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "productos/:idProducto",
    element: <DetalleProducto />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "user/register",
    element: <Register />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "ventas",
    element: <Ventas />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "new-sale",
    element: <NewSale />,
    errorElement: <div> Hubo un error!!</div>,
  },
]);

export const CustomRouterProvider = () => (
  <RouterProvider router={router}></RouterProvider>
);
