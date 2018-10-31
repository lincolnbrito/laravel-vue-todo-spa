import axios from "axios"
import config from '../config'
import db from '../firebase'

axios.defaults.baseURL = config.axios.baseURL

export default {
  // initRealtimeListeners(context) {
  //   db.collection("todos").onSnapshot( snapshot => {
  //       snapshot.docChanges().forEach( change => {
  //           if (change.type === "added") {

  //             const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";

  //             if(source == "Server") {
  //               context.commit('addTodo', {
  //                 id: change.doc.id,
  //                 title: change.doc.data().title,
  //                 completed: change.doc.data().completed
  //               })
  //             }
  //           }
  //           if (change.type === "modified") {
  //             console.log(change.doc)
  //             context.commit('updateTodo', {
  //               id: change.doc.id,
  //               title: change.doc.data().title,
  //               completed: change.doc.data().completed,
  //               timestamp: change.doc.data().timestamp
  //             })
  //           }
  //           if (change.type === "removed") {
  //             context.commit('deleteTodo', change.doc.id)
  //           }
  //       });
  //   });

  // },
  retrieveName(context){
    axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
    return new Promise( (resolve, reject) => {
      axios.get('/user')
      .then( response => {
        resolve(response)
      })
      .catch( error => {
        reject(error)
      })
    })
  },
  retrieveToken(context, credentials){

    return new Promise( (resolve, reject) => {
      axios.post('/login', {
        username: credentials.username,
        password: credentials.password
      })
      .then( response => {
        const token = response.data.access_token

        localStorage.setItem('access_token', token)
        context.commit('retrieveToken', token)

        resolve(response)

      })
      .catch( error => {
        console.log(error);
        reject(error)
      })
    })
  },
  destroyToken(context){

    axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`

    if (context.getters.loggedIn) {
      return new Promise( (resolve, reject) => {
        axios.post('/logout')
        .then( response => {

          localStorage.removeItem('access_token')
          context.commit('destroyToken')

          resolve(response)

        })
        .catch( error => {
          console.log('',error)
          reject(error)
        })
      })
    }
  },
  register(context, data){
    return new Promise( (resolve, reject) => {
      axios.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then( response => {

        resolve(response)
      })
      .catch( error => {
        console.log('',error)
        reject(error)
      })
    })
  },
  retrieveTodos(context){
    axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
    context.state.loading = true;
    //firebase
    // db.collection('todos').get()
    //   .then(querySnapshot => {
    //     let tempTodos = []
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id,
    //         title: doc.data().title,
    //         completed: doc.data().completed,
    //         timestamp: doc.data().timestamp
    //       }
    //       tempTodos.push(data)
    //     });

    //     context.state.loading = false;

    //     const todosSorted = tempTodos.sort((a,b) => {
    //       return a.timestamp.seconds - b.timestamp.seconds
    //     })

    //     context.commit('retrieveTodos', tempTodos)
    //   })
    //database
    axios.get('/todos')
    .then( response => {
      context.state.loading = false;
      context.commit('retrieveTodos', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  clearTodos(context) {
    context.commit('clearTodos');
  },
  addTodo(context, todo) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
    // // firebase
    // db.collection('todos').add({
    //   title: todo.title,
    //   completed: false,
    //   timestamp: new Date()
    // })
    // .then( docRef => {
    //   context.commit('addTodo', {
    //     id: docRef.id,
    //     title: todo.title,
    //     completed: false
    //   })
    // })
    //database
    axios.post('/todos', todo)
    .then( response => {
      context.commit('addTodo', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  updateTodo(context, todo) {
    // //firebase
    // db.collection('todos').doc(todo.id).set({
    //   id: todo.id,
    //   title: todo.title,
    //   completed: todo.completed,
    //   // timestamp: new Date()
    // }, {merge:true})
    // .then( () => {
    //   context.commit('updateTodo', todo)
    // })
    //database
    axios.patch(`/todos/${todo.id}`, todo)
    .then( response => {
      context.commit('updateTodo', response.data)
    })
    .catch( error => {
      console.log(error)
    })
  },
  deleteTodo(context, id) {
    //firebase
    // db.collection('todos').doc(id).delete()
    //   .then( () => {
    //     context.commit('deleteTodo', id)
    //   })
    axios.delete(`/todos/${id}`)
    .then( response => {
      context.commit('deleteTodo', id)
    })
    .catch( error => {
      console.log(error)
    })

  },
  checkAll(context, checked) {
    //firebase
    // db.collection('todos').get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach( doc => {
    //       doc.ref.update({
    //         completed: checked
    //       })
    //       .then(() => {
    //         context.commit('checkAll', checked)
    //       })
    //     })

    //   })
    //database
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
    //firebase
    // db.collection('todos').where('completed', '==', true).get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       doc.ref.delete()
    //         .then(() => {
    //           context.commit('clearCompleted')
    //         })
    //     })
    //   })
    //database
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
