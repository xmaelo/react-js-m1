import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Parametres from 'src/pages/Parametres';
import DoctorList from 'src/pages/DoctorList';
import DoctorDetails from 'src/pages/DoctorDetails';

const routes = (props) => [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'patients', element: <CustomerList /> },
      { path: 'medecins', element: <DoctorList /> },
      { path: '/', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'configuration', element: <Parametres /> },
      { path: 'medecins/:docId', element: <DoctorDetails {...props} /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
