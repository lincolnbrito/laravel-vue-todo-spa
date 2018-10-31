import axios from 'axios'
import config from '../config'

axios.defaults.baseURL = config.axios.baseURL

export default {
  retrieveToken(state, token){
    state.token = token
  },
  destroyToken(state){
    state.token = null
  },
  retrieveTodos(state, todos) {
    state.todos = todos
  },
  addTodo(state, todo) {
    state.todos.push({
      id: todo.id,
      title: todo.title,
      completed: false,
      editing: false
    })
  },
  updateTodo(state, todo) {
    const index = state.todos.findIndex(item => item.id == todo.id );
    state.todos.splice(index, 1, {
      'id': todo.id,
      'title': todo.title,
      'completed': todo.completed,
      'timestamp': new Date(),
      'editing': todo.editing
    })
  },
  deleteTodo(state, id) {
    const index = state.todos.findIndex( item => item.id == id);

    if(index >= 0) {
      state.todos.splice(index, 1);
    }

  },
  checkAll(state, checked) {
    state.todos.forEach( todo => (todo.completed = checked));
  },
  updateFilter(state, filter){
    state.filter = filter;
  },
  clearCompleted(state) {
    state.todos = state.todos.filter(todo => !todo.completed);
  },
}
