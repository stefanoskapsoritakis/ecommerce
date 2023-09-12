import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

import { Product } from '../types/Product'
import withLoading from '../components/withLoading'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState<Product | undefined>()
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get(`https://stefanos-ecommerce.azurewebsites.net/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [id])

  return (
    <Box sx={{
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="h3" gutterBottom>{product?.title}</Typography>
      <img width={640 * 0.75} height={640 * 0.75} src={product?.images[0].link} />
      <Typography variant="subtitle1" gutterBottom>{product?.description}</Typography>
      <Typography variant="body2" gutterBottom>{product?.price}</Typography>
      <Button variant="contained" onClick={() => navigate("/products")}>Back</Button>
    </Box>
  )
}

const SingleProductDetails = withLoading(ProductDetails, "https://stefanos-ecommerce.azurewebsites.net/api/v1/products/")

export default SingleProductDetails