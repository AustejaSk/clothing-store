import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { fetchProducts } from './firebase'
import ScrollToTop from './components/home-components/ScrollToTop'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Favourite from './pages/Favourite'
import Account from './pages/Accout'

const App = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])


    useEffect(() => {
        const getProducts = async () => {
          setLoading(true)
          try {
            const { productsList, categoriesList } = await fetchProducts()
            setProducts(productsList)
            setCategories(categoriesList)
          } catch (error) {
            console.error('Error fetching products:', error)
          } finally {
            setLoading(false)
          }
        }
        
        getProducts()
    }, [])

    const getSelectedProducts = (newProduct, selectedItemCount) => {
      setSelectedProducts(prevProducts => {
        const existingProductIndex = prevProducts.findIndex(
          product => product.id === newProduct.id
        )

        if (existingProductIndex !== -1) {
          const updatedProducts = [...prevProducts]
          updatedProducts[existingProductIndex].itemCount += selectedItemCount
          return updatedProducts
        } else {
          return [...prevProducts, newProduct]
        }
      })
    }

    const updateItemCount = (productId, newCount) => {
      setSelectedProducts(prevProducts => {
        const updatedProducts = prevProducts.map(product =>
          product.id === productId
            ? { ...product, itemCount: newCount }
            : product
        )
        return updatedProducts.filter(product => product.itemCount > 0)
      })
    }

    return (
        <Router>
            <ScrollToTop />
            <Navigation selectedProducts={selectedProducts} />
            <Routes>
                <Route path='/' element={<Home products={products} categories={categories} loading={loading} />}/>
                <Route path='product' element={<Product products={products} getSelectedProducts={getSelectedProducts} />} />
                <Route path='cart' element={<Cart selectedProducts={selectedProducts} updateItemCount={updateItemCount} setSelectedProducts={setSelectedProducts} />} />
                <Route path='favourite' element={<Favourite />} />
                <Route path='account' element={<Account />} />
            </Routes>
        </Router>
    )
}

export default App