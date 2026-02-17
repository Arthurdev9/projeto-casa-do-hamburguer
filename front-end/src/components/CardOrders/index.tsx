import { CalendarFold, User, Watch } from 'lucide-react'
import { formatterPrice } from '../../utils/formatterPrice'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

type CardOrdersType = {
  id: string
  name: string
  date: string
  orderTime: string
  deliveredTime?: string
  total: number
  status: string
  onStatusChange: (id: string, newStatus: string) => void
}

const CardOrders = ({
  date,
  deliveredTime,
  id,
  name,
  orderTime,
  total,
  status,
  onStatusChange
}: CardOrdersType) => {
  const { user } = useContext(UserContext)

  return (
    <div className="rounded-md bg-[#F2DAAC] p-3 text-[#32343E] shadow-md">
      <div className="flex items-center justify-between">
        {user?.admin ? (
          <select
            className="cursor-pointer rounded border border-[#32343E] bg-transparent px-1 text-sm font-bold outline-none"
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Retirado">Retirado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        ) : (
          <div className="rounded bg-[#32343E] px-2 py-0.5 text-[10px] font-bold text-[#F2DAAC] uppercase">
            Status: {status}
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={16} />
          <p className="text-sm font-medium">{name}</p>
        </div>

        <div className="flex items-center gap-2 text-[#32343E]/80">
          <CalendarFold size={16} />
          <p className="text-xs">{date}</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Watch size={14} className="text-orange-600" />
            <p className="text-xs">Ped: {orderTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Watch size={14} className="text-green-700" />
            <p className="text-xs font-bold">Ent: {deliveredTime || '--:--'}</p>
          </div>
        </div>

        <div className="mt-1 h-px w-full bg-[#32343E]/20"></div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase opacity-50">
            Total do Pedido
          </span>
          <p className="text-lg font-black">{formatterPrice(total)}</p>
        </div>
      </div>
    </div>
  )
}

export default CardOrders
