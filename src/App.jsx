import { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/hocs/ProtectedRoute'
import LoginPage from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'
import { Snackbar, Alert } from '@mui/material'
import { closeSnackbar } from '@/store/slices/snackbarSlice'

import CoreLoader from './components/core/loader/CoreLoader'

function App() {
  const isOpenSnackBar = useSelector(state => state.snackbar.isOpen)
  const snackbarMessage = useSelector(state => state.snackbar.message)
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.isLoading)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(closeSnackbar())
  }

  useEffect(() => {
    dispatch(checkLoginAndGetAccess())
  }, [])
  return (
    <>
      <CoreLoader isLoading={loader} />
      <Snackbar open={isOpenSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route index element={<Navigate to='/profile' replace />} />
        <Route path='*' element={<Navigate to='/profile' replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
