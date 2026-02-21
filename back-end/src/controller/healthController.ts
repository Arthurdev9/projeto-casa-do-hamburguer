import { prisma } from '../db.js'
import { type Request, type Response } from 'express'

export const healthCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ status: 'OK', message: 'Back and DB are warm!' })
  } catch (err) {
    res.status(500).json({ status: 'Error', message: 'DB is cold' })
  }
}
