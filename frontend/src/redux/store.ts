import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {
        usersReducer,
        productsReducer,
        cartReducer,
    },
    preloadedState: {
        productsReducer: {
            loading: false,
            error: "",
            products: []
        },
        usersReducer: {
            loading: false,
            error: "",
            users: []
        },
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store