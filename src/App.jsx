import { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/hocs/ProtectedRoute'
import LoginPage from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import Loader from './components/core/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'

function App() {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.isLoading)

  useEffect(() => {
    dispatch(checkLoginAndGetAccess())
  }, [])
  return (
    <>
      <Loader isLoading={loader} />
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
