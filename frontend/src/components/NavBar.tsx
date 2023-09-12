import Button from '@mui/material/Button'
import React from 'react'

import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            <nav>
                <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
                <Button variant="contained" onClick={() => navigate("/products")}>Products</Button>
                <Button variant="contained" onClick={() => navigate("/cart")}>Cart</Button>
                <Button variant="contained" onClick={() => navigate("/register")}>Register</Button>
                <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
                <Button variant="contained" onClick={() => navigate("/profile")}>Profile</Button>
            </nav>
        </>
    )
}

export default NavBar