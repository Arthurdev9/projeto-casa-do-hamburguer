import { useContext, useEffect, useState, useMemo } from 'react'
import Product from '../components/Product'
import { deleteProduct } from '../services/product'
import { ProductContext } from '../contexts/ProductContext'

const Home = () => {
  const [category, setCategory] = useState('Hamburguer')

  const { products, fetchProducts, setProducts } = useContext(ProductContext)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory)
  }

  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : []
    return safeProducts.filter((product) => product.category === category)
  }, [products, category])

  const getCategoryClass = (categoryName: string) => {
    const base =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] text-sm font-bold md:h-9 md:w-32 transition-all'
    const isSelected = category === categoryName

    return isSelected
      ? `${base} bg-[#F2DAAC] text-[#161410]`
      : `${base} bg-[#161410] text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410]`
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      await deleteProduct(id)
      setProducts((prev) => {
        const safePrev = Array.isArray(prev) ? prev : []
        return safePrev.filter((product) => product.id !== id)
      })
    } catch (error) {
      console.error('Erro ao deletar produto', error)
    }
  }

  return (
    <div className="mx-auto w-full px-3 text-white md:w-184.25">
      <div className="my-1 flex gap-2 md:my-3">
        {['Hamburguer', 'Bebidas', 'Porções'].map((cat) => (
          <div
            key={cat}
            className={getCategoryClass(cat)}
            onClick={() => handleChangeCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <p className="p-3 font-bold text-[#F2DAAC] uppercase">{category}</p>

      <div className="flex flex-col gap-1 md:gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              description={product.description}
              img={product.img}
              name={product.name}
              price={product.price}
              category={product.category}
              onDelete={() => handleDelete(product.id)}
            />
          ))
        ) : (
          <p className="p-3 text-gray-400 italic">
            Nenhum produto cadastrado nesta categoria.
          </p>
        )}
      </div>
    </div>
  )
}

export default Home
