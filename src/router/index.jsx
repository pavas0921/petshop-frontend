import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Login } from "../pages/";
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
]);

export const CustomRouterProvider = () => (
  <RouterProvider router={router}></RouterProvider>
);
