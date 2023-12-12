import { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/hocs/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'
import { Snackbar, Alert } from '@mui/material'
import { closeSnackbar } from '@/store/slices/snackbarSlice'

import { globalRoutes, privateRoutes } from '@/config/routes'

import CoreLoader from './components/core/loader/CoreLoader'
import CoreAppBar from './components/core/appBar/CoreAppBar'

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

  const globalRouteElements = globalRoutes.map((route) => {
    return <Route path={route.route} Component={route.component} key={route.id} />
  })

  const privateRouteElements = privateRoutes.map((route) => {
    return <Route path={route.route} Component={route.component} key={route.id} />
  })

  useEffect(() => {
    dispatch(checkLoginAndGetAccess())
  }, [])
  return (
    <>
      <CoreAppBar />
      <CoreLoader isLoading={loader} />
      <Snackbar open={isOpenSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Routes>
        {globalRouteElements}
        <Route index element={<Navigate to='/profile' replace />} />
        <Route path='*' element={<Navigate to='/profile' replace />} />

        <Route element={<ProtectedRoute />}>
          {privateRouteElements}
        </Route>
      </Routes>
    </>
  )
}

export default App
