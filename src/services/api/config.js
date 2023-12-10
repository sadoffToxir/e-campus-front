/* eslint-disable no-undef */
import axios from 'axios'
import Cookies from 'js-cookie'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '@/config/const'
import { redirect } from 'react-router-dom'
import { checkLoginAndGetAccess } from '@/store/actions/authActions'

const baseURL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

function createAxiosResponseInterceptor() {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const refresh = Cookies.get(REFRESH_TOKEN)

      // Reject promise if usual error
      if (error.response.status !== 401 || window.location.pathname === '/login') {
        return Promise.reject(error)
      }

      if(!refresh) {
        redirect('/login')

        return 
      }
      axios.interceptors.response.eject(interceptor)

      return checkLoginAndGetAccess()
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          Cookies.remove(REFRESH_TOKEN)
          
          redirect('/login')

          return Promise.reject(error2)
        })
        .finally(createAxiosResponseInterceptor) // Re-attach the interceptor by running the method
    }
  )
}
createAxiosResponseInterceptor()

axiosInstance.interceptors.request.use(
  async (config) => {
    const access = Cookies.get(ACCESS_TOKEN)
    
    if (access) {
      config.headers.Authorization = `Bearer ${access}`
    } else {
      delete axiosInstance.defaults.headers.common.Authorization
    }

    return config
  },

  (error) => Promise.reject(error)
)

export default axiosInstance