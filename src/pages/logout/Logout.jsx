import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/actions/authActions'
import { useDispatch } from 'react-redux'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    navigate('/login')
  })
  return
}

export default Logout