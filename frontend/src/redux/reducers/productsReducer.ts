import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from "axios";

import { Product } from '../../types/Product';
import { NewProduct } from '../../types/NewProduct';
import { ProductUpdate } from '../../types/ProductUpdate';

interface ProductReducer {
  loading: boolean
  error: string
  products: Product[]
}

const initialState: ProductReducer = {
  loading: false,
  error: "",
  products: []
}

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>("https://stefanos-ecommerce.azurewebsites.net/api/v1/products")
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error.message
    }
  }
)

export const createNewProduct = createAsyncThunk(
  "createNewProduct",
  async (product: NewProduct) => {
    try {
      const result = await axios.post<Product>("https://stefanos-ecommerce.azurewebsites.net/api/v1/products", product)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      if (error.response) {
        return JSON.stringify(error.response.data)
      }
      return error.message
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string): Promise<{ result: boolean, id: string } | AxiosError> => {
    try {
      const { data } = await axios.delete(`https://stefanos-ecommerce.azurewebsites.net/api/v1/products/${id}`)
      return { result: data, id: id }
    } catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

export const editProduct = createAsyncThunk(
  "editProduct",
  async (product: ProductUpdate): Promise<Product | AxiosError> => {
    try {
      const { data } = await axios.patch<Product>(
        `https://stefanos-ecommerce.azurewebsites.net/api/v1/products/${product.id}`,
        product.update
      )
      return data
    } catch (e) {
      let error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProductReducer: (state) => {
      return initialState
    },
    sortByPrice: (state, action: PayloadAction<number>) => {
      const sortedProducts = [...state.products].sort((a, b) => {
        if (action.payload === 0) {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
      state.products = sortedProducts
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = "Cannot perform this action. Please try again later"
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false
        if (typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.products = action.payload
        }
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload
        } else {
          state.products.push(action.payload)
        }
        state.loading = false
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const { result, id } = action.payload
          if (result) {
            state.products = state.products.filter(item => item.id !== id)
          } else {
            state.error = 'Failed to delete the product'
          }
        }
        state.loading = false
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = 'Failed to delete the product'
      })
  }
})

const productsReducer = productsSlice.reducer
export const
  {
    cleanUpProductReducer,
    sortByPrice,
  } = productsSlice.actions

export default productsReducer