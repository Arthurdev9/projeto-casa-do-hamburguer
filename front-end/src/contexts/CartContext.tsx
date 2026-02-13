import { createContext } from 'react'
import type { CartContextInterface } from '../types/Cart'

export const CartContext = createContext<CartContextInterface>(
  {} as CartContextInterface
)
