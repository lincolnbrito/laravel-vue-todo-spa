import axios from "axios";

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
    setTimeout( () => {
      context.commit('deleteTodo', id)
    }, 2000);
  },
  checkAll(context, checked) {
    // setTimeout( () => {
      context.commit('checkAll', checked)
    // }, 2000);
  },
  updateFilter(context, filter){
    // setTimeout( () => {
      context.commit('updateFilter', filter)
    // }, 2000);
  },
  clearCompleted(context) {
    setTimeout( () => {
      context.commit('clearCompleted')
    }, 2000);
  },
}
