import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import SingleProduct from '../pages/SingleProduct'
import Register from '../pages/Register'
import Login from '../pages/Login'
import UsersList from '../pages/UsersList'
import NewProduct from '../pages/NewProduct'
import DeleteProduct from '../pages/DeleteProduct'
import EditProduct from '../pages/EditProduct'

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/users",
      element: <UsersList />
    },
    {
      path: "/products/:id",
      element: <SingleProduct />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/newproduct",
      element: <NewProduct />
    },
    {
      path: "/deleteproduct",
      element: <DeleteProduct />
    },
    {
      path: "/editproduct",
      element: <EditProduct />
    }
  ])
export default routes