import axios from "axios"
import config from '../config'
import db from '../firebase'

axios.defaults.baseURL = config.axios.baseURL

export default {
  retrieveTodos(context){
    //firebase
    db.collection('todos').get()
      .then(querySnapshot => {
        let tempTodos = []
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed,
            timestamp: doc.data().timestamp
          }
          tempTodos.push(data)
        });

        const todosSorted = tempTodos.sort((a,b) => {
          return a.timestamp.seconds - b.timestamp.seconds
        })

        context.commit('retrieveTodos', tempTodos)
      })
    //database
    // axios.get('/todos')
    // .then( response => {
    //   context.commit('retrieveTodos', response.data)
    // })
    // .catch( error => {
    //   console.log(error)
    // })
  },
  addTodo(context, todo) {
    db.collection('todos').add({
      title: todo.title,
      completed: false,
      timestamp: new Date()
    })
    .then( docRef => {
      context.commit('addTodo', {
        id: docRef.id,
        title: todo.title,
        completed: false
      })
    })
    // axios.post('/todos', todo)
    // .then( response => {
    //   context.commit('addTodo', response.data)
    // })
    // .catch( error => {
    //   console.log(error)
    // })
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
