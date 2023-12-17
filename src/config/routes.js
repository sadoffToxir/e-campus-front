import Login from '@/pages/login/Login'
import Logout from '@/pages/logout/Logout'
import Register from '@/pages/register/Register'
import Profile from '@/pages/profile/Profile'
import Groups from '@/pages/groups/Groups'
import GroupDetails from '../components/groups/GroupDetails'

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
    id: 'groups',
    route: '/groups',
    component: Groups,
    param: {
      id: 'groupDetails',
      paramPath: ':groupId',
      component: GroupDetails,
      param: {
        id: 'groupExtraDetails',
        paramPath: 'details',
        component: GroupDetails // Replace with actual component
      }
    }
  },
  {
    id: 'logout',
    route: '/logout',
    component: Logout
  }
]