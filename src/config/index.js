import configDev from './config.dev'

export default {
  'axios' : {
    'baseURL': (process.env.NODE_ENV == 'development') ? configDev.axios.baseURL : process.env.axios.baseURL
  }
}
