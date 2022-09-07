import React from 'react'
import {
  BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Success from './pages/Success'

const App = () => {
  const user = true
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="*"  element={<Navigate to='/' replace/>}/>
            <Route index element={<Home />} />
            <Route path="login" element={user ? <Navigate to='/' replace/> : <Login />}/>
            <Route path="register" element={user ? <Navigate to='/' replace/> : <Register />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/category/:category" element={<ProductList />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="success" element={<Success />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App