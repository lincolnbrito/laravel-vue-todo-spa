<template>
  <div>
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
      }
    },

    methods: {
      allChecked(event) {
        this.$store.dispatch('checkAll', event.target.checked)
      }
    }
  }
</script>
