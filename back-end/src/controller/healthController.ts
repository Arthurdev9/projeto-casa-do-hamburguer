import { prisma } from '../db.js'
import { type Request, type Response } from 'express'

export const healthCheck = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}
