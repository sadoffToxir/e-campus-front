import Login from '@/pages/login/Login'
import Logout from '@/pages/logout/Logout'
import Register from '@/pages/register/Register'
import Profile from '@/pages/profile/Profile'

export const globalRoutes = [
  {
    id: 'login',
    route: '/login',
    component: Login
  },
  {
    id: 'register',
    route: '/register',
    component: Register
  },
]

export const privateRoutes = [
  {
    id: 'profile',
    route: '/profile',
    component: Profile
  },
  {
    id: 'logout',
    route: '/logout',
    component: Logout
  }
]