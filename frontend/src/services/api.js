import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
  withCredentials: true, // ✅ MESTI ADA untuk cookie/JWT
})

export default api
