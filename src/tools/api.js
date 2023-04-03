import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5109' // TODO config
})