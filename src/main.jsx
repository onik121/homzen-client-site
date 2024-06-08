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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './privateroute/PrivateRoute';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import Properties from './pages/Properties';
import Details from './components/Details';
import Dashborad from './pages/Dashborad';
import AdminProfile from './dashboardpages/Admin/AdminProfile';
import AgentProfile from './dashboardpages/Agent/AgentProfile';
import WishList from './pages/Users/WishList';
import PropertyBought from './pages/Users/PropertyBought';
import MyReviews from './pages/Users/MyReviews';
import Offer from './pages/Users/Offer';
import RequestedProperties from './dashboardpages/Agent/RequestedProperties';
import AddProperty from './dashboardpages/Agent/AddProperty';

// Create a client
const queryClient = new QueryClient()

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
        element: <PrivateRoute><Properties></Properties></PrivateRoute>
      },
      {
        path: '/details/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/properties/${params.id}`)
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/wishlist',
        element: <PrivateRoute><WishList></WishList></PrivateRoute>
      },
      {
        path: '/myProperty',
        element: <PrivateRoute><PropertyBought></PropertyBought></PrivateRoute>
      },
      {
        path: '/myReviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: '/offer/id/:id',
        element: <PrivateRoute><Offer></Offer></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/wishlist/id/${params.id}`)
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashborad></Dashborad></PrivateRoute>,
    children: [
      // admin routes
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      // agent routes
      {
        path: 'agentProfile',
        element: <AgentProfile></AgentProfile>
      },
      {
        path: 'requestedproperties',
        element: <RequestedProperties></RequestedProperties>
      },
      {
        path: 'addproperty',
        element: <AddProperty></AddProperty>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
