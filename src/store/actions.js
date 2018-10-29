import axios from "axios"
import config from '../config'

axios.defaults.baseURL = config.axios.baseURL

export default {
  retrieveTodos(context){
    axios.get('/todos')
    .then( response => {
      context.commit('retrieveTodos', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  addTodo(context, todo) {
    axios.post('/todos', todo)
    .then( response => {
      context.commit('addTodo', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  updateTodo(context, todo) {
    axios.patch(`/todos/${todo.id}`, todo)
    .then( response => {
      context.commit('updateTodo', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  deleteTodo(context, id) {
    axios.delete(`/todos/${id}`)
    .then( response => {
      context.commit('deleteTodo', id)
    })
    .catch( error => {
      console.log(error)
    })

  },
  checkAll(context, checked) {
    axios.patch(`/todosCheckAll`, {
      completed: checked
    })
    .then( response => {
      context.commit('checkAll', checked)
    })
    .catch( error => {
      console.log(error)
    })

  },
  updateFilter(context, filter){
    context.commit('updateFilter', filter)
  },
  clearCompleted(context) {
    let completed = context.state.todos
      .filter( todo => todo.completed )
      .map( todo => todo.id );

    axios.delete(`/todosDeleteCompleted`, {
      data: {
        todos: completed
      }
    })
    .then( response => {
      context.commit('clearCompleted')
    })
    .catch( error => {
      console.log(error)
    })

  },
}
