import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  message: '',
  status: 'success'
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSuccessSnackbar: (state, action) => {
      state.isOpen = true
      state.message = action.payload.message
      state.status = 'success'
    },
    setErrorSnackbar: (state, action) => {
      state.isOpen = true
      state.message = action.payload.detail
      state.status = 'error'
    }, 
    closeSnackbar: (state) => {
      state.isOpen = false
      state.message = ''
    }
  },
})

export const { setSuccessSnackbar, setErrorSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer