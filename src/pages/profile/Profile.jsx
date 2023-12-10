import { useEffect } from 'react'
import api from '@/services/api'

const Profile = () => {
  useEffect(() => {
    api.getProfile()
  }, [])

  return <div>
    <h1>PROFILE</h1>
  </div>
}

export default Profile