import axios from 'axios'
import config from './config'
const token = sessionStorage.getItem('token')

let api = axios.create({
 
  baseURL: config.BASEURL, 
  headers: {
      Authorization: `${token}`
  }
})

export default api