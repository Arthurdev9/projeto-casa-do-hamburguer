import Product from '../components/Product'
import type { ProductInterface } from '../types/Product'

import { useEffect, useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState('Hamburguer')
  const [products, setProducts] = useState<ProductInterface[]>([])

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory)
  }

  const getCategoryClass = (categoryName: string) => {
    const NotSelected =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32'

    const selectedElement =
      'md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32'

    if (category === categoryName) {
      return selectedElement
    } else {
      return NotSelected
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-products')

        const data = await response.json()
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.log(error)
        return
      }
    }
    getProducts()
  }, [setProducts])

  return (
    <div className="mx-auto w-full px-3 text-white md:w-184.25">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass('Hamburguer')}
          onClick={() => handleChangeCategory('Hamburguer')}
        >
          Hamburger
        </div>
        <div
          className={getCategoryClass('Bebidas')}
          onClick={() => handleChangeCategory('Bebidas')}
        >
          Bebidas
        </div>
        <div
          className={getCategoryClass('Porções')}
          onClick={() => handleChangeCategory('Porções')}
        >
          Porções
        </div>
      </div>
      <p className="p-3 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-1 md:gap-3">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            description={product.description}
            img={product.img}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
