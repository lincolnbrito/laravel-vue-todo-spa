<template>
  <div v-if="hasTodo">
    <label>
      <input type="checkbox"
        :checked="!anyRemaining"
        @change="allChecked">Check all
    </label>
  </div>
</template>

<script>
  export default {
    name: 'todo-check-all',

    computed: {
      anyRemaining() {
        return this.$store.getters.anyRemaining;
      },
      hasTodo() {
        return this.$store.state.todos.length > 0
      }
    },

    methods: {
      allChecked(event) {
        this.$store.dispatch('checkAll', event.target.checked)
      }
    }
  }
</script>
