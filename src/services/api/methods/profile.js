import axios from '@/services/api/config'

const getProfile = () => {
  return axios.get('auth/profile/').then(response => response.data)
}

export default {
  getProfile
}