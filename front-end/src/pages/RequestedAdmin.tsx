import { useState, useEffect } from 'react'
import CardOrders from '../components/CardOrders'
import type { Order } from '../types/Order'

const Pedidos = () => {
  const [category, setCategory] = useState('Pendente')
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders', {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      })

      if (response.ok) {
        const updatedOrderFromServer = await response.json()
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? updatedOrderFromServer : order
          )
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory)
  }

  const getCategoryClass = (categoryName: string) => {
    const base =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] text-sm font-bold transition-all md:h-9 md:w-32'

    if (category === categoryName) {
      return `${base} bg-[#F2DAAC] text-[#161410]`
    }
    return `${base} bg-[#161410] text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410]`
  }

  return (
    <div className="mx-auto w-full px-3 text-white md:w-184.25">
      <div className="mt-1 mb-3 flex gap-2 md:my-3">
        {['Pendente', 'Retirado', 'Cancelado'].map((cat) => (
          <div
            key={cat}
            className={getCategoryClass(cat)}
            onClick={() => handleChangeCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {orders
          .filter((order) => order.status === category)
          .map((order) => {
            const dateObj = new Date(order.createdAt)

            return (
              <CardOrders
                key={order.id}
                id={order.id}
                name={order.customerName}
                status={order.status}
                total={order.total}
                onStatusChange={handleStatusChange}
                date={dateObj.toLocaleDateString('pt-BR')}
                orderTime={dateObj.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                deliveredTime={
                  order.deliveredAt
                    ? new Date(order.deliveredAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : undefined
                }
              />
            )
          })}
      </div>

      {orders.filter((o) => o.status === category).length === 0 && (
        <div className="mt-10 flex flex-col items-center opacity-30">
          <p className="text-lg italic">
            Nenhum pedido {category.toLowerCase()}...
          </p>
        </div>
      )}
    </div>
  )
}

export default Pedidos
