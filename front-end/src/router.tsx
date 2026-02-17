import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Header from './components/Header'
import Pedidos from './pages/RequestedAdmin'
import PublicRoute from './components/PublicRoute'

import { createBrowserRouter, Outlet } from 'react-router-dom'
import CartAside from './components/CartAside'

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#161410]">
      <Header />
      <CartAside />
      <Outlet />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/pedidos',
        element: <Pedidos />
      }
    ]
  },

  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  }
])
