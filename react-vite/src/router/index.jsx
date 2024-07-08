import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Auth/LoginFormPage';
import SignupFormPage from '../components/Auth/SignupFormPage';
import Layout from './Layout';
import Cart from '../components/Cart';
import MainComponent from '../components/Main';
import ProductDetails from '../components/Products/ProductDetails';
import CreateProduct from '../components/CreateProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainComponent />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "products/:id",
        element: <ProductDetails />
      },
      {
        path: 'products',
        element: <CreateProduct />,
      }

    ],
  },
]);
