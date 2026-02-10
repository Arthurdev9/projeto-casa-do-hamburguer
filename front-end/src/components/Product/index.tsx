import { ShoppingBag } from 'lucide-react'
import type { ProductInterface } from '../../types/Product'
import { formatterPrice } from '../../utils/formatterPrice'

const Product = ({ name, description, price, img }: ProductInterface) => {
  return (
    <div>
      <div className="flex gap-2">
        <img src={`/${img}`} className="h-20.75 w-25 md:h-41.5 md:w-50" />
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase md:text-lg">{name}</p>
          <p className="md:text-md flex-1 text-xs text-[#848484]">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC]">{formatterPrice(price)}</p>
            <ShoppingBag size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
