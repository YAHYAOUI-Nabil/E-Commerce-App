import React, { useState, useEffect} from 'react'
import {useLocation} from 'react-router'
import styled from 'styled-components'
import axios from 'axios'
import Product from './Product'

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
  const location = useLocation()
  const all = location.pathname.split('/')[1]
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
                                      cat 
                                        ? `http://localhost:5000/bazar/products?category=${cat}` 
                                        : `http://localhost:5000/bazar/products`)
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
    
  }, [cat])

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter((item) => 
          Object.entries(filters)
                .every(([key, value]) => item[key].includes(value)))) 
  }, [cat, filters, products])
  
  useEffect(() => {
    if(sort==="newest"){
      setFilteredProducts((prev) => [...prev].sort((a,b) => a.price - b.price))
    }
    if(sort==="asc"){
      setFilteredProducts((prev) => [...prev].sort((a,b) => a.price - b.price))
    }
    if(sort==="desc"){
      setFilteredProducts((prev) => [...prev].sort((a,b) => b.price - a.price))
    }
  }, [sort])
  
  
  return (
    <Container>
      {cat ? 
            filteredProducts.map((item)=>(<Product item={item} key={item._id}/>)) 
           : 
             all 
           ? products.map((item)=>(<Product item={item} key={item._id}/>))
           : products.slice(0,8).map((item)=>(<Product item={item} key={item._id}/>))
          }
        
    </Container>
  )
}

export default Products