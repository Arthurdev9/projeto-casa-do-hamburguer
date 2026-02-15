import { type Request, type Response } from 'express'
import { prisma } from '../db.js'

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, total } = req.body
    const user = req.user // Pegamos o usuário do middleware de auth

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'O carrinho está vazio' })
    }

    const order = await prisma.order.create({
      data: {
        customerName: user?.name || 'Cliente Offline',
        total: Number(total),
        status: 'Pendente',
        userId: user?.id ?? null,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }
      },
      include: { items: true }
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido' })
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user

    if (!user?.admin) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const user = req.user

    if (!user?.admin) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    if (!id) {
      return res.status(400).json({ message: 'ID do pedido é obrigatório' })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        deliveredAt: status === 'Retirado' ? new Date() : null
      }
    })

    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido' })
  }
}
