import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: null,
  profile: null,
  errors: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setAuthErrors: (state, action) => {
      state.errors = action.payload
    },
    removeAuthErrors: (state) => {
      state.errors = null
    },
  },
})

export const { setIsAuth, setAuthErrors, removeAuthErrors, setProfile } = authSlice.actions

export default authSlice.reducer