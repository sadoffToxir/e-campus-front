import { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/hocs/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginAndGetAccess, getProfile } from '@/store/actions/authActions'
import { Snackbar, Alert } from '@mui/material'
import { closeSnackbar } from '@/store/slices/snackbarSlice'

import { globalRoutes, privateRoutes } from '@/config/routes'

import CoreLoader from './components/core/loader/CoreLoader'
import CoreAppBar from './components/core/appBar/CoreAppBar'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)
  const isOpenSnackBar = useSelector(state => state.snackbar.isOpen)
  const snackBarStatus = useSelector(state => state.snackbar.status)
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

  const renderRoutes = (routes) => {
    return routes.map(route => {
      if (route.param) {
        // Render a route with a nested route
        return (
          <Route key={route.id} path={route.route} element={<route.component />}>
            {/* Define the nested route */}
            <Route path={route.param.paramPath} element={<route.param.component />} />

            {/* Additional nesting if needed */}
            {route.param.param && (
              <Route path={route.param.param.paramPath} element={<route.param.param.component />} />
            )}
          </Route>
        )
      } else {
        // Render a simple route
        return (
          <Route key={route.id} path={route.route} element={<route.component />} />
        )
      }
    })
  }

  const privateRouteElements = renderRoutes(privateRoutes)

  useEffect(() => {
    dispatch(checkLoginAndGetAccess())
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfile())
    }
  }, [isAuth])
  return (
    <div className='h-screen flex flex-col'>
      <CoreAppBar />
      <CoreLoader isLoading={loader} />
      <Snackbar open={isOpenSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarStatus} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className='grow'>
        <Routes>
          {globalRouteElements}
          <Route element={<ProtectedRoute />}>
            {privateRouteElements}
          </Route>
          {/* <Route index element={<Navigate to='/profile' replace />} />
          <Route path='*' element={<Navigate to='/profile' replace />} /> */}
        </Routes>

      </div>
    </div>
  )
}

export default App
