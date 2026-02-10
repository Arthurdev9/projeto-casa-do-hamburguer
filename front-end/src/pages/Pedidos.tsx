import { useState } from 'react'
import CardOrders from '../components/CardOrders'

const Pedidos = () => {
  const [category, setCategory] = useState('Pendente')

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory)
  }

  const getCategoryClass = (categoryName: string) => {
    const NotSelected =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32'

    const selectedElement =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32'

    if (category === categoryName) {
      return selectedElement
    } else {
      return NotSelected
    }
  }

  return (
    <div className="mx-auto w-full px-3 text-white md:w-184.25">
      <div className="mt-1 mb-3 flex gap-2 md:my-3">
        <div
          className={getCategoryClass('Pendente')}
          onClick={() => handleChangeCategory('Pendente')}
        >
          Pendente
        </div>
        <div
          className={getCategoryClass('Retirado')}
          onClick={() => handleChangeCategory('Retirado')}
        >
          Retirado
        </div>
        <div
          className={getCategoryClass('Cancelado')}
          onClick={() => handleChangeCategory('Cancelado')}
        >
          Cancelado
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <CardOrders
          id={1}
          date="22/12/2026"
          name="Arthur Vinicius"
          orderTime="22:15"
          deliveredTime="22:30"
          total={124.75}
        />
      </div>
    </div>
  )
}

export default Pedidos
