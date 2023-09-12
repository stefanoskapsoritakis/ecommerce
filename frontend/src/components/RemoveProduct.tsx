import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { deleteProduct } from '../redux/reducers/productsReducer';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const RemoveProduct = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [productID, setProductID] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(deleteProduct(productID))
    }
    return (
        <>
            <Typography variant="h3" gutterBottom>Delete Product</Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                    <TextField id="outlined-basic" label="Product ID" variant="outlined" type="text" value={productID} onChange={(e) => setProductID(e.target.value)} /><br />
                    <Button variant="contained" type="submit" endIcon={<SendIcon />}>Submit</Button>
                    <Button variant="contained" onClick={() => navigate("/products")}>Back</Button>
                </Box>
            </form>
        </>
    )
}

export default RemoveProduct