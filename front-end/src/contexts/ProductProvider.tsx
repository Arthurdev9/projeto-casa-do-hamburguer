import { useState, useCallback, type ReactNode } from 'react'
import type { ProductInterface } from '../types/Product'
import { ProductContext } from './ProductContext'

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[]>([])

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('https://projeto-casa-do-hamburguer.onrender.com/products')
      const data = await response.json()

      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      setProducts([])
    }
  }, [])

  const addProductState = (product: ProductInterface) => {
    setProducts((prev) => [...prev, product])
  }

  return (
    <ProductContext.Provider
      value={{ products, fetchProducts, addProductState, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}
