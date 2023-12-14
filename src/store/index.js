import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import loaderReducer from './slices/loaderSlice'
import snackbarReducer from './slices/snackbarSlice'
import groupsReducer from './slices/groupsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    snackbar: snackbarReducer,
    groups: groupsReducer
  },
})

