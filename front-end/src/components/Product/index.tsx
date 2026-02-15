import { useContext } from 'react'
import { ShoppingBag } from 'lucide-react'
import type { ProductInterface } from '../../types/Product'
import { formatterPrice } from '../../utils/formatterPrice'
import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'

type Props = ProductInterface & {
  onDelete: () => void
}

const Product = (product: Props) => {
  const { user } = useContext(UserContext)
  const { name, description, price, img, onDelete } = product
  const { addToCart } = useContext(CartContext)

  return (
    <div
      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/5"
      onClick={() => addToCart(product)}
    >
      <div className="flex gap-2">
        <img
          src={`/${img}`}
          className="h-20.75 w-25 rounded-md object-cover md:h-41.5 md:w-50"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-white uppercase md:text-lg">
              {name}
            </p>
            {user?.admin && (
              <button
                className="hidden w-fit cursor-pointer rounded-md border border-[#CB2C17] px-1 text-xs font-bold text-[#CB2C17] hover:bg-[#CB2C17] hover:text-white md:flex"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                Deletar
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-[#848484] md:text-sm">
            {description}
          </p>
          <div className="mt-2 flex h-full items-center justify-end gap-2">
            <p className="text-sm font-bold text-[#F2DAAC]">
              {formatterPrice(price)}
            </p>
            <ShoppingBag size={18} className="text-[#F2DAAC]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
