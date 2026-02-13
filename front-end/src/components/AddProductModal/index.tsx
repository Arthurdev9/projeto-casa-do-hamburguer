import { useContext, useState } from 'react'
import { createProduct } from '../../services/product'
import { ProductContext } from '../../contexts/ProductContext'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function AddProductModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Hamburguer')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  const { addProductState } = useContext(ProductContext)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const numericPrice = Number(price)
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Por favor, insira um preço válido maior que zero.')
      return
    }

    try {
      const newProduct = await createProduct({
        name,
        description,
        category,
        price: Math.round(numericPrice * 100),
        img: image
      })

      if (newProduct) {
        addProductState(newProduct)
      }

      setName('')
      setDescription('')
      setCategory('Hamburguer')
      setPrice('')
      setImage('')
      onClose()
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      alert('Ocorreu um erro ao salvar o produto.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Adicionar produto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nome do produto"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Descrição detalhada"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Hamburguer">Hamburguer</option>
            <option value="Porções">Porções</option>
            <option value="Bebidas">Bebidas</option>
          </select>

          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Preço (Ex: 25.50)"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="URL da imagem"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-black focus:outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
