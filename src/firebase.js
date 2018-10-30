import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCi6z3IT6B4ZGRuvVVOBkbJi9_KxjnfNUQ",
  authDomain: "laravel-vue-todo.firebaseapp.com",
  databaseURL: "https://laravel-vue-todo.firebaseio.com",
  projectId: "laravel-vue-todo",
  storageBucket: "laravel-vue-todo.appspot.com",
  messagingSenderId: "750226426516"
};

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()

firestore.settings({timestampsInSnapshots:true})

export default firestore
