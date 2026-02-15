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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, img, price, category } = req.body
    const user = req.user

    if (!user || !user.admin) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    if (!name || !description || !price || !img || !category) {
      return res.status(400).json({ message: 'Dados incompletos' })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        img,
        price,
        category
      }
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = req.user

    if (!user || !user.admin) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    if (!id) {
      return res.status(400).json({ message: 'ID do produto é obrigatório' })
    }

    await prisma.product.delete({ where: { id } })

    res.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' })
  }
}
