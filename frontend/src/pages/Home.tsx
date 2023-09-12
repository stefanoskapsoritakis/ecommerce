import React from 'react'
import { useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { Box, Button, Typography } from '@mui/material'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
    <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10
            }}>
      <Typography variant="h3" gutterBottom sx={{ marginBottom:10}}>
        Welcome to my shop!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginBottom:10}}>
        Here are some of products available.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/products")}>Products</Button>
    </Box>
    </>
  )
}

export default Home