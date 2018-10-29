export default {
  'axios' : {
    'baseURL': (process.env.NODE_ENV == 'development') ? 'http://localhost:8000/api' : process.env.axios.baseURL
  }
}
