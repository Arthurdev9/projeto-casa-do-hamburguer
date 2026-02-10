import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const cookie = document.cookie
  const cookies = cookie.split('; ')
  const userCookie = cookies.find((c) => c.startsWith('user='))

  if (userCookie) {
    return <Navigate to="/" replace />
  }

  return <div>{children}</div>
}

export default PublicRoute
