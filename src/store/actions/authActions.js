import api from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/const'
import { jwtDecode } from 'jwt-decode'
import { setIsLoading } from '@/store/slices/loaderSlice'
import { setAuthErrors, setIsAuth, setProfile } from '@/store/slices/authSlice'
import { setSuccessSnackbar } from '@/store/slices/snackbarSlice'

export const getProfile = createAsyncThunk('auth/getProfile',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getProfile()
      thunkAPI.dispatch(setIsLoading(false))
      
      thunkAPI.dispatch(setProfile(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
    }
  }
)
export const updateProfile = createAsyncThunk('auth/updateProfile',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.updateProfile(payload)
      thunkAPI.dispatch(setIsLoading(false))
      
      thunkAPI.dispatch(setProfile(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      const errors = err.response.data
      thunkAPI.dispatch(setAuthErrors(errors))
    }
  }
)

export const login = createAsyncThunk('auth/login',
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.login(credentials)
      thunkAPI.dispatch(setIsLoading(false))
      
      if(response.access && response.refresh) {
        const accessDecoded = jwtDecode(response.access)
        const refreshDecoded = jwtDecode(response.refresh)
        
        Cookies.set(ACCESS_TOKEN, response.access, { path: '/',  expires: new Date(accessDecoded.exp * 1000) })
        Cookies.set(REFRESH_TOKEN, response.refresh, { path: '/', expires: new Date(refreshDecoded.exp * 1000) })
        
        thunkAPI.dispatch(setIsAuth(true))
      }
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setAuthErrors(errors))
    }
  }
)

export const register = createAsyncThunk('auth/register',
  async (credentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.register(credentials)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'User was created successfully' }))
      return 
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data
      thunkAPI.dispatch(setAuthErrors(errors))
    }
  }
)

export const checkLoginAndGetAccess = createAsyncThunk('auth/register',
  async (_, thunkAPI) => {
    const refresh = Cookies.get(REFRESH_TOKEN)

    if(refresh) {
      if(Cookies.get(ACCESS_TOKEN)) {
        thunkAPI.dispatch(setIsAuth(true))
      } else {
        try {
          thunkAPI.dispatch(setIsLoading(true))
          await api.getAccessToken({ refresh })
          thunkAPI.dispatch(setIsLoading(false))
          
          thunkAPI.dispatch(setIsAuth(true))
        } catch (err) {
          thunkAPI.dispatch(setIsAuth(false))
          thunkAPI.dispatch(setIsLoading(false))
        }
      }
    } else {
      thunkAPI.dispatch(setIsAuth(false))
    }
  }
)

export const logout = createAsyncThunk('auth/logout',
  async (_, thunkAPI) => {
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(REFRESH_TOKEN)

    thunkAPI.dispatch(setIsAuth(false))
  }
)