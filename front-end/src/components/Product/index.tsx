import { ShoppingBag } from 'lucide-react'

const Product = () => {
  return (
    <div>
      <div className="flex gap-2">
        <img
          src="/duplo-da-casa.png"
          className="h-20.75 w-25 md:h-41.5 md:w-50"
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase md:text-lg">
            Duplo da Casa
          </p>
          <p className="md:text-md flex-1 text-xs text-[#848484]">
            Dois suculentos hambúrgueres de 120g, queijo cheddar derretido,
            maionese da casa e picles no pão brioche tostado.
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC]">R$28,90</p>
            <ShoppingBag size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
