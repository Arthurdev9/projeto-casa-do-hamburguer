import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { UserPayload } from '../../types/UserPayload.js'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.cookies

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Error no servidor' })
    return
  }

  try {
    const decoded = jwt.verify(user, process.env.JWT_SECRET) as UserPayload
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Usuário não autenticado' })
    return
  }
}
