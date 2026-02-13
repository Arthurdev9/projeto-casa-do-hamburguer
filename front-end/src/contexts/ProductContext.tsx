import { createContext } from 'react'
import type { ProductContextType } from '../types/Product'

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
)
