import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsLoading } = loaderSlice.actions

export const selectIsLoading = (state) => state.auth.isLoading

export default loaderSlice.reducer