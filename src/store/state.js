export default {
  token: localStorage.getItem('access_token') || null,
  loading: true,
  filter: 'all',
  todos: []
}
