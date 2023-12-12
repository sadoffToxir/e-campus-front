export default (isAuth) => {
  const appBarRoutes = [
    {
      id: 'register',
      title: 'Register',
      route: '/register',
      isVisible: !isAuth
    },
    {
      id: 'login',
      title: 'Login',
      route: '/login',
      isVisible: !isAuth
    },
    {
      id: 'topics',
      title: 'Topics',
      route: '/topics',
      isVisible: isAuth
    },
    {
      id: 'groups',
      title: 'Groups',
      route: '/groups',
      isVisible: isAuth
    }
  ]
  
  const appBarProfileRoutes = [
    {
      id: 'profile',
      title: 'Profile',
      route: '/profile'
    },
    {
      id: 'logout',
      title: 'Logout',
      route: '/logout'
    }
  ]

  return {
    appBarRoutes,
    appBarProfileRoutes
  }
}