import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from 'lucide-react'
import AddProductModal from '../AddProductModal'

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleAuthUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          credentials: 'include'
        })

        if (response.status !== 200) {
          console.log('Deu ruim')
          return
        }

        const data = await response.json()
        setUser(data)

        console.log(data)
      } catch (error) {
        console.log(error)
        return
      }
    }
    handleAuthUser()
  }, [setUser])

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        console.log('Não deu certo')
        return
      }

      setUser(null)
    } catch (error) {
      console.log(error)
      return
    }
  }

  const getNavItemsClass = (path: string) => {
    const baseClass =
      'flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC]'

    if (path === location.pathname) {
      return `${baseClass} bg-[#F2DAAC] text-[#161410]`
    } else {
      return baseClass
    }
  }

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-185">
        <Link to="/">
          <img src="/logo (3).png" alt="Logo" />
        </Link>

        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.admin && (
              <div className="hidden items-center gap-2 text-[#F2DAAC] lg:flex">
                <Link to="/">
                  <div className={getNavItemsClass('/')}>
                    <Box size={18} />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemsClass('/pedidos')}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <div
                  className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC]"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={18} />
                </div>
              </div>
            )}

            <div className="relative cursor-pointer">
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                1
              </p>
              <ShoppingCart size={18} className="cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <p>{user?.name}</p>{' '}
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8 w-32 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Header
