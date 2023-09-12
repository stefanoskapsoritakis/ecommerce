import React from 'react'

import { Cart } from '../types/Cart'
import { CartReducer, clearCart, removeFromCart } from '../redux/reducers/cartReducer';
import useAppSelector from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

const CartList = () => {
    const dispatch = useDispatch()

    const { products, productsSum }: CartReducer = useAppSelector(
        (state) => state.cartReducer
    )
    const emptyCart = () => {
        dispatch(clearCart())
    }
    const deleteFromCart = (cartId: string) => {
        dispatch(removeFromCart(cartId))
    }

    return (
        <>
            <Button variant="contained" onClick={emptyCart}>Delete all</Button >
            <div>
                {products.map((product: Cart) => (
                    <div key={product.cartId}>
                        <p>{product.title}</p>
                        <p>Price: {product.price} €</p>
                        <button onClick={() => deleteFromCart(product.cartId)}>Remove</button>
                    </div>
                ))}
                <p>Total: {productsSum} €</p>
            </div>
        </>
    )
}

export default CartList