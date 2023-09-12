import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { createNewProduct } from '../redux/reducers/productsReducer';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export const CreateProduct = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [inventory, setInvetory] = useState(0)
    const [images, setImages] = useState<{ link: string }[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createNewProduct({ title, description, price, inventory, images }))
    }
    return (
        <Box sx={{
            border: '1px solid lightblue',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="h3" gutterBottom>Create Product</Typography>
            <form onSubmit={e => handleSubmit(e)}>
                <Typography variant="body1" gutterBottom>Title:</Typography>
                <TextField id="outlined-basic" label="Title" variant="outlined" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <Typography variant="body1" gutterBottom>Description:</Typography> <br />
                <TextField id="outlined-basic" label="Description" variant="outlined" type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                <Typography variant="body1" gutterBottom>Price:</Typography> <br />
                <TextField id="outlined-basic" label="Price" variant="outlined" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><br />
                <Typography variant="body1" gutterBottom>Inventory:</Typography> <br />
                <TextField id="outlined-basic" label="Inventory" variant="outlined" type="number" value={inventory} onChange={(e) => setInvetory(Number(e.target.value))} /><br />
                <Typography variant="body1" gutterBottom>Images:</Typography> <br />
                <TextField id="outlined-basic" label="Image" variant="outlined" type="text" value={images.map(image => image.link).join(",")}
                    onChange={(e) =>
                        setImages(
                            e.target.value.split(",").map(link => ({ link: link.trim() }))
                        )
                    }
                /><br />
                <Button variant="contained" type="submit" endIcon={<SendIcon />}>Submit</Button>
                <Button variant="contained" onClick={() => navigate("/products")}>Back</Button>
            </form>
        </Box>
    )
}
