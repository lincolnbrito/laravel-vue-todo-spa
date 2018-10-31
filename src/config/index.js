export default {
  'axios' : {
    'baseURL': (process.env.NODE_ENV == 'development') ? 'http://laravel-vue-todo-api.local/api' : process.env.API_BASE_URL
  }
}
