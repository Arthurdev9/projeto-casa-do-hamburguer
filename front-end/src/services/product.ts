export const createProduct = async (data: {
  name: string
  description: string
  category: string
  price: number
  img: string
}) => {
  const response = await fetch(`https://projeto-casa-do-hamburguer.onrender.com/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Erro ao criar produto')
  }

  return response.json()
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(`https://projeto-casa-do-hamburguer.onrender.com/products/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar produto')
  }

  return response.json()
}
