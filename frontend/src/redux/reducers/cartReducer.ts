import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import { Cart } from "../../types/Cart";

let cartIdCounter = 0;

export interface CartReducer {
    products: Cart[]
    productsSum: number
}

const initialState: CartReducer = {
    products: [],
    productsSum: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const addedProduct = action.payload
            state.products.valueOf()
            const cartList = state.products.find((item) => item.id === addedProduct.id)
            if (cartList) {
                cartList.quantity += 1
                cartList.quantity = cartList.quantity * cartList.price
            } else {
                const cartItem: Cart = {
                    ...addedProduct,
                    quantity: 1,
                    total: addedProduct.price,
                    cartId: `${cartIdCounter++}`,
                }
                state.products.push(cartItem)
            }
            state.productsSum += addedProduct.price
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const removedProduct = action.payload
            const cartList = state.products.find((item) => item.cartId === removedProduct)
            if (cartList) {
                state.productsSum -= cartList.total
                state.products = state.products.filter((item) => item.cartId !== removedProduct)
            }
        },
        clearCart: (state) => {
            state.products = []
            state.productsSum = 0
        },
    },
})

const cartReducer = cartSlice.reducer
export const {
    addToCart,
    removeFromCart,
    clearCart
} = cartSlice.actions
export default cartReducer