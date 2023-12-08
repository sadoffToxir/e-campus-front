import axios from '@/services/api/config'

const getProfile = () => {
  console.log('getProfile')
  return axios.get('auth/profile/').then(response => response.data)
}

export default {
  getProfile
}