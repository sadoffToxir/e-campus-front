import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { selectIsAuth } from '@/store/slices/authSlice'

const ProtectedRoute = () => {
  const isAuth = useSelector(selectIsAuth)
  const location = useLocation()

  return isAuth
    ? <Outlet />
    : <Navigate to='/login' state={{ from: location }} replace />
}

export default ProtectedRoute
