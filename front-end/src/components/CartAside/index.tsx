import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { X } from 'lucide-react'
import { formatterPrice } from '../../utils/formatterPrice'
import { Trash2 } from 'lucide-react'

export default function CartAside() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } =
    useContext(CartContext)

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleCart} />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-[#F2DAAC] p-6 shadow-xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold text-[#161410]">Meu Carrinho</h2>
          <X className="cursor-pointer text-[#161410]" onClick={toggleCart} />
        </div>

        <div className="mt-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-800 pb-2"
              >
                <div>
                  <p className="font-bold text-[#161410]">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.quantity}x</p>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    {formatterPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
