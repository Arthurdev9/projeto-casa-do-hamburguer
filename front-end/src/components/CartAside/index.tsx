import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { X, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { formatterPrice } from '../../utils/formatterPrice'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function CartAside() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useContext(CartContext)

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    if (cartItems.length === 0) return

    const orderData = {
      customerName: user?.name || 'Cliente Autenticado',
      total: total,
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        credentials: 'include'
      })

      if (response.ok) {
        clearCart()
        toggleCart()
        navigate('/pedidos')
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-80 flex-col bg-[#F2DAAC] shadow-xl transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-[#161410]/10 p-6">
          <h2 className="text-xl font-bold text-[#161410]">Meu Carrinho</h2>
          <X className="cursor-pointer text-[#161410]" onClick={toggleCart} />
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-5 flex items-center justify-center">
            <p className="text-sm text-[#161410] italic">
              Seu carrinho está vazio
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b border-[#161410]/10 pb-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <p className="w-32 text-sm leading-tight font-bold text-[#161410]">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-[#161410]">
                      {formatterPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg bg-[#161410]/10 px-2 py-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="cursor-pointer transition-colors hover:text-red-600"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <span className="min-w-5 text-center font-bold text-[#161410]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="cursor-pointer transition-colors hover:text-green-700"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer text-red-600 transition-transform hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="bg-[#161410] p-6 text-[#F2DAAC]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-medium uppercase">Total:</span>
              <span className="text-2xl font-bold">
                {formatterPrice(total)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full cursor-pointer rounded-md bg-[#F2DAAC] py-4 font-extrabold tracking-wider text-[#161410] uppercase transition-colors hover:bg-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processando...
                </>
              ) : (
                'Finalizar Pedido'
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
