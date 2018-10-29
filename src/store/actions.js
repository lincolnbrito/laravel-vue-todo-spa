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
    setTimeout( () => {
      context.commit('addTodo', todo)
    }, 2000);

  },
  updateTodo(context, todo) {
    setTimeout( () => {
      context.commit('updateTodo', todo)
    }, 2000);
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
