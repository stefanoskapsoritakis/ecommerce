import React, { useEffect, useState } from 'react'

import ProductsListWithLoading from '../components/ProductsList'
import NavBar from '../components/NavBar'

const Products = () => {
  return (
    <>
      <NavBar />
      <ProductsListWithLoading />
    </>
  )
}

export default Products