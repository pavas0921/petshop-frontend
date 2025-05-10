import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { DetalleProducto } from '../pages/DetalleProducto'
import { RegistroProductos, VerProductos } from '../pages/Productos'
import { Register } from '../pages/User'
import { NewSale, Ventas } from '../pages/Ventas'
import { ProductsDashboard } from '../pages/Products'
import { SurveyPages } from '../pages/Survey'
import SurveySuccess from '../pages/Survey/SurveySuccess'
import { SurveyList } from '../components/SurveyComponents/SurveyList'
import UserTable from '../pages/User/UserList/UserTable'
import { BasicSalePage } from '../pages/SalesPages/BasicSalePage'
import { CategoryDashboard } from '../pages/Categories/CategoryDashboard'
import CustomerDashboard from '../pages/CustomerPages/CustomerDashboard/CustomerDashboard'
import CompanyDashboard from '../pages/CompaniesPages/CompanyDashboard'
import { SpeciesDashboard } from '../pages/Species/SpeciesDashboard'
import { SalesList } from '../pages/SalesPages/SalesDashboard'
import { SupplierDashboard } from '../pages/SupplierPages/SupplierDashboard'
import { ExpensesCategoryDashboard } from '../pages/Expenses/ExpensesCategory'
import { ExpensesDashboard } from '../pages/Expenses/ExpensesDashboard'
import { SalesPdfReport } from '../components/PdfComponent/SalesPdfReport'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: '/',
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: '/company',
    element: <CompanyDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'activeProducts',
    element: <ProductsDashboard getActiveProducts={true} />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'products',
    element: <ProductsDashboard getActiveProducts={false} />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'productos/:idProducto',
    element: <DetalleProducto />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'customer',
    element: <CustomerDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'basic-sale',
    element: <BasicSalePage saleType={"basic"} />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'free-sale',
    element: <BasicSalePage saleType={"free"} />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'user/register',
    element: <Register />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'user-list',
    element: <UserTable />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'sales',
    element: <SalesList />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'new-sale',
    element: <NewSale />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'survey',
    element: <SurveyPages />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'survey-success',
    element: <SurveySuccess />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'survey-list',
    element: <SurveyList />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'categories',
    element: <CategoryDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'species',
    element: <SpeciesDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'supplier',
    element: <SupplierDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'expensesCategory',
    element: <ExpensesCategoryDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'expenses',
    element: <ExpensesDashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'pdfReport',
    element: <SalesPdfReport />,
    errorElement: <div> Hubo un error!!</div>,
  },
 
])

export const CustomRouterProvider = () => (
  <RouterProvider router={router}></RouterProvider>
)
