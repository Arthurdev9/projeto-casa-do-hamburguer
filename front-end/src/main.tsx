import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import { UserProvider } from './contexts/UserProvider'
import { ProductProvider } from './contexts/ProductProvider'
import { CartProvider } from './contexts/CartProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </StrictMode>
)
