import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  errors: {
    login: null,
    register: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setLoginErrors: (state, action) => {
      state.errors.login = action.payload
    },
    setRegisterErrors: (state, action) => {
      state.errors.register = action.payload
    },
    removeLoginErrors: (state) => {
      state.errors.login = null
    },
    removeRegisterErrors: (state) => {
      state.errors.register = null
    }
  },
})

export const { setIsAuth, setLoginErrors, setRegisterErrors, removeLoginErrors, removeRegisterErrors } = authSlice.actions

export const selectIsAuth = (state) => state.auth.isAuth
export const selectErrors = (state) => state.auth.errors

export default authSlice.reducer