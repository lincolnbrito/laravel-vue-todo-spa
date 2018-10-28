export default {
  remaining(state) {
    return state.todos.filter( todo => !todo.completed).length;
  },
  anyRemaining(state, getters) {
    return getters.remaining != 0;
  },
  todosFiltered(state) {
    if(state.filter == 'all'){
      return state.todos;
    } else if(state.filter=='active') {
      return state.todos.filter( todo => !todo.completed );
    } else if(state.filter=='completed') {
      return state.todos.filter( todo => todo.completed );
    }

    return state.todos;
  },
  showClearCompletedButton(state) {
    return state.todos.filter( todo => todo.completed ).length > 0;
  }
}
