<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="validateBeforeSubmit">

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div v-if="serverError" class="server-error">
        {{ serverError.message }}
      </div>

      <div class="form-control">
        <label for="username">Username/Email</label>
        <input type="text" name="username" id="username" class="login-input" :class="{ 'input-error': errors.has('username') }" v-model="username" v-validate="'required|email'">
         <span class="form-error">{{ errors.first('username')}}</span>
      </div>


      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" :class="{ 'input-error': errors.has('password') }" v-model="password" v-validate="'required'">
        <span class="form-error">{{ errors.first('password')}}</span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    props: {
      dataSuccessMessage: {
        type: String
      }
    },
    data() {
      return {
        username: '',
        password: '',
        serverError: '',
        successMessage: this.dataSuccessMessage
      }
    },
    methods: {
      login() {
        this.$store.dispatch('retrieveToken', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({name: 'todo'})
        })
        .catch( error => {
          this.serverError = error.response.data;
          this.password = '';
          this.successMessage = '';
        })
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then( result => {
          if(result) {
            this.login()
          }
        })
      }
    }
  }
</script>
