import axios from 'axios'
import { useErrorsStore } from '../store/errors'

let errorsStore

const apiTool = axios.create({
  baseURL: 'http://localhost:5109', // TODO config
})

apiTool.interceptors.response.use(r => r, error => {
  if (!errorsStore) errorsStore = useErrorsStore() // don't create this until pinia is set up

  errorsStore.addError('Something went wrong while making the network request.')

  throw error
})

export default apiTool