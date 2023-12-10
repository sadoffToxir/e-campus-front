import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  message: ''
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      state.isOpen = action.payload.isOpen
      state.message = action.payload.message
    },
    closeSnackbar: (state) => {
      state.isOpen = false
      state.message = ''
    }
  },
})

export const { setSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer