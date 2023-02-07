<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="/src/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Sign Up" />
    </div>
  </header>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">Username: </label>
      <input id="username" v-model="username"/>
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" v-model="password" type="password"/>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const { data } = await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          password: this.password,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        this.$router.push('/login')
      } catch (error) {
        console.error(error);
      }
    },
  }
};

</script>