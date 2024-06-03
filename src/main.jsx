import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './root/Root';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './provider/AuthProvider';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './privateroute/PrivateRoute';
import AllProperties from './pages/AllProperties';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/allproperties',
        element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
