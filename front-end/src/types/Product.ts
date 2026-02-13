import type { Dispatch, SetStateAction } from 'react'

export interface ProductInterface {
  category: string
  id: string
  name: string
  description: string
  price: number
  img: string
}

export interface ProductContextType {
  products: ProductInterface[]
  fetchProducts: () => Promise<void>
  addProductState: (product: ProductInterface) => void
  setProducts: Dispatch<SetStateAction<ProductInterface[]>>
}
