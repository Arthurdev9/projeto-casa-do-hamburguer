import { useContext, useEffect, useState, useMemo } from 'react'
import Product from '../components/Product'
import { deleteProduct } from '../services/product'
import { ProductContext } from '../contexts/ProductContext'

const Home = () => {
  const [category, setCategory] = useState('Hamburguer')
  const [isLoading, setIsLoading] = useState(true)

  const [loadingMessage, setLoadingMessage] = useState('Carregando cardápio...')

  const { products, fetchProducts, setProducts } = useContext(ProductContext)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const loadData = async () => {
      try {
        setIsLoading(true)

        timer = setTimeout(() => {
          setLoadingMessage('O servidor está acordando... Como usamos um serviço gratuito, o primeiro acesso do dia pode levar até 45 segundos. Obrigado pela paciência! 🍔')
        }, 10000)

        await fetchProducts()
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      } finally {
        setIsLoading(false)
        clearTimeout(timer)
      }
    }

    loadData()
    return () => clearTimeout(timer)
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
          <div key={cat} className={getCategoryClass(cat)} onClick={() => handleChangeCategory(cat)}>
            {cat}
          </div>
        ))}
      </div>

      <p className="p-3 font-bold text-[#F2DAAC] uppercase">{category}</p>

      <div className="flex flex-col gap-1 md:gap-3">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-6 text-center">
            {/* Spinner animado */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#F2DAAC] border-t-transparent"></div>

            {/* Mensagem Dinâmica */}
            <p className="text-[#F2DAAC] font-medium animate-pulse max-w-sm">
              {loadingMessage}
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
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
