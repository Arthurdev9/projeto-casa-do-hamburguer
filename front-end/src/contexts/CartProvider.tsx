import { useState, type ReactNode } from 'react'
import type { ProductInterface } from '../types/Product'
import { CartContext } from './CartContext'

interface CartItem extends ProductInterface {
  quantity: number
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const addToCart = (product: ProductInterface) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ cartItems, isCartOpen, addToCart, toggleCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
