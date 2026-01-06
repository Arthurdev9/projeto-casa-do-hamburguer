import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-185 md:p-0">
        <img src="/logo (3).png" alt="Logo" />
        <Link to="/login">
          <div className="flex h-8 w-32 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
            Entrar
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
