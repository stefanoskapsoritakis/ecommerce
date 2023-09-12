import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { editProduct } from '../redux/reducers/productsReducer';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const UpdateProduct = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [productID, setProductId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState<{ link: string }[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imagesLinks = images.map(img => img.link); 
    dispatch(editProduct({ id: productID, update: { title, description, price, images: imagesLinks } }));
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>Delete Product</Typography>
      <form onSubmit={e => handleSubmit(e)}>
        <Box sx={{
              border: '1px solid lightblue',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
          <Typography variant="body1" gutterBottom>Product ID:</Typography>
          <TextField id="outlined-basic" label="Product ID" variant="outlined" type="text" value={productID} onChange={(e) => setProductId(e.target.value)} /><br />
          <Typography variant="body1" gutterBottom>New Title:</Typography>
          <TextField id="outlined-basic" label="New Title" variant="outlined" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
          <Typography variant="body1" gutterBottom>New Description:</Typography>
          <TextField id="outlined-basic" label="New Description" variant="outlined" type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
          <Typography variant="body1" gutterBottom>New Price:</Typography>
          <TextField id="outlined-basic" label="New Price" variant="outlined" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><br />
          <Typography variant="body1" gutterBottom>New Images:</Typography>
          <TextField id="outlined-basic" label="New Images" variant="outlined" type="text"
            value={images.map(img => img.link).join(",")}  // Convert array of objects to a comma-separated string
            onChange={(e) => {
              const links = e.target.value.split(",");
              const newImages = links.map(link => ({ link }));
              setImages(newImages);
            }}
          /><br />
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>Submit</Button>
          <Button variant="contained" onClick={() => navigate("/products")}>Back</Button>
        </Box>
      </form>
    </>
  )
}

export default UpdateProduct