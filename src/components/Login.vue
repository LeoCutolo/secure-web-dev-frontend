<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Login" />
    </div>
  </header>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username"/>
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password"/>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div>
    Don't have an account? <router-link to="/signup">Sign up</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const { data } = await axios.post('http://localhost:3000/users/login', {
          username: this.username,
          password: this.password,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        localStorage.setItem('token', data.jwt);
        this.$router.push('/location')
      } catch (error) {
        console.error(error);
      }
    },
    async setRole(){
      const { data } = await axios.get('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    },
  }
};

</script>