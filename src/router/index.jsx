import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Login } from "../pages/";
import { RegistroProductos, VerProductos } from "../pages/Productos";
import { DetalleProducto } from "../pages/DetalleProducto";
import { Register } from "../pages/User";
import { Dashboard } from "../pages/Dashboard";
import { NewSale, Ventas } from "../pages/Ventas";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "productos-add",
    element: <RegistroProductos />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: "productos",
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
