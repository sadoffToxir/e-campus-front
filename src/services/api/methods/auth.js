import { getFormDataFrobObj } from '@/services/api/helper'
import axios from '@/services/api/config'

const login = (payload) => {
  return axios.post('auth/login/', getFormDataFrobObj(payload)).then(response => response.data)
}

const register = (payload) => {
  return axios.post('auth/register/', getFormDataFrobObj(payload)).then(response => response.data)
}

const getAccessToken = (payload) => {
  return axios.post('auth/token/refresh/', getFormDataFrobObj(payload)).then(response => response.data)
}

const getProfile = () => {
  return axios.get('auth/profile/').then(response => response.data)
}

export default {
  login,
  getProfile,
  register,
  getAccessToken
}