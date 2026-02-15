export interface OrderItem {
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  deliveredAt: string | null
  items: OrderItem[]
}
