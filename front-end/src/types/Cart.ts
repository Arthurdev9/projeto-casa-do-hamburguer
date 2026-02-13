import type { ProductInterface } from './Product'

interface CartItem extends ProductInterface {
  quantity: number
}

export interface CartContextInterface {
  cartItems: CartItem[]
  isCartOpen: boolean
  addToCart: (product: ProductInterface) => void
  toggleCart: () => void
  removeFromCart: (id: string) => void
}
