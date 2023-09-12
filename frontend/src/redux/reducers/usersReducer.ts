import { PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios, { AxiosError } from "axios";

import { User } from '../../types/User'
import { UserCredential } from '../../types/UserCredential';
import { NewUser } from '../../types/NewUser';
import { UserUpdate } from '../../types/UserUpdate';


interface UserReducer {
  users: User[]
  currentUser?: User
  loading: boolean
  error: string
}

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: ""
}

interface FetchQuery {
  page: number
  per_page: number
}

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async ({
    page, per_page
  }: FetchQuery) => {
    try {
      const result = await axios.get<User[]>(`https://stefanos-ecommerce.azurewebsites.net/api/v1/users`)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const authenticate = createAsyncThunk(
  "authenticate",
  async (access_token: string) => {
    try {
      const authentication = await axios.get<User>("https://stefanos-ecommerce.azurewebsites.net/api/v1/auth", {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      })
      console.log(authentication.data)
      return authentication.data
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: UserCredential, { dispatch }) => {
    try {
      const result = await axios.post<{ access_token: string }>("https://stefanos-ecommerce.azurewebsites.net/api/v1/auth/", { email, password })
      localStorage.setItem("token", result.data.access_token)
      const authentication = await dispatch(authenticate(result.data.access_token))
      return authentication.payload as User
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const createNewUser = createAsyncThunk(
  "createNewUser",
  async (user: NewUser) => {
    try {
      const result = await axios.post<User>(
        "https://stefanos-ecommerce.azurewebsites.net/api/v1/users/", user)
      console.log(result.data)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateUserReducer: (state, action: PayloadAction<User[]>) => {

    },
    emptyUsersReducer: (state) => {
      state.users = []
    },
    updateOneUser: (state, action: PayloadAction<UserUpdate>) => {
      const users = state.users.map(user => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload.update }
        }
        return user
      })
      return {
        ...state,
        users
      }
    },
    sortByEmail: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.users.sort((a, b) => a.email.localeCompare(b.email))
      } else {
        state.users.sort((a, b) => b.email.localeCompare(a.email))
      }
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = action.payload
        }
        state.loading = false
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createNewUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = "Failed to create new user!"
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = "Failed login";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
          console.log(state.currentUser)
        }
        state.loading = false;
      })
      .addCase(authenticate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = "Failed authentication";
      })
  }
})

const usersReducer = usersSlice.reducer
export const
  {
    createUser,
    updateUserReducer,
    emptyUsersReducer,
    updateOneUser,
    sortByEmail
  } = usersSlice.actions
export default usersReducer