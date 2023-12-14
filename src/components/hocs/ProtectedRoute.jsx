import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { selectIsAuth } from '@/store/slices/authSlice'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'

const ProtectedRoute = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(selectIsAuth)
  const location = useLocation()

  if (isAuth === null) {
    dispatch(checkLoginAndGetAccess())
    return
  }

  return isAuth === false
    ? <Navigate to='/login' state={{ from: location }} replace />
    : <Outlet />
}

export default ProtectedRoute
