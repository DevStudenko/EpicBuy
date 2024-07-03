import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Auth/LoginFormPage';
import SignupFormPage from '../components/Auth/SignupFormPage';
import Layout from './Layout';
// import MainComponent from '../components/Main';
import Cart from '../components/Cart';
import MainComponent from '../components/Main';

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
      }
    ],
  },
]);
