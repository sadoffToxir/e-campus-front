import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'

const ProtectedRoute = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)
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
