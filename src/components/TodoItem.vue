<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!editing"
          @dblclick="editTodo"
          class="todo-item-label"
          :class="{ completed: completed }">
        {{ title }}
      </div>
      <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',

  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },

  created() {
    eventBus.$on('pluralize', this.handlePluralize)
  },

  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize)
  },

  data(){
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEditCache': '',
    }
  },

  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },

  methods: {
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },

    doneEdit() {
      if(this.title.trim().length == 0){
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      eventBus.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing
        }
      })
    },

    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false;
    },

    removeTodo(index) {
      eventBus.$emit('removeTodo', index);
    },

    pluralize() {
      eventBus.$emit('pluralize');
    },

    handlePluralize() {
      this.title = this.title + 's';
      eventBus.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing
        }
      })
    }
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
