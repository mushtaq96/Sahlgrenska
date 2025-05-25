import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/v1/'  // TODO: change to localhost

const axiosInstance = axios.create({
  baseURL,
})


// Add request interceptor to include auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
