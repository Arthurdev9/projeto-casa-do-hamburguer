import { type Request, type Response } from 'express'
import { prisma } from '../db.js'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()

    if (products.length === 0) {
      res.status(404).json({ message: 'Não foram encontrados produtos' })
      return
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' })
    return
  }
}
