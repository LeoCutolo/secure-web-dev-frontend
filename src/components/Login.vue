<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="/src/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Login" />
    </div>
  </header>
  <form @submit.prevent="submitForm">
    <div class="input">
      <label for="username">Username</label>
      <input id="username" v-model="username"/>
    </div>
    <div class="input">
      <label for="password">Password</label>
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
        const { data } = await axios.post(import.meta.env.VITE_BACK_URL + '/users/login', {
          username: this.username,
          password: this.password,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        localStorage.setItem('token', data.jwt);
        await this.setRole(data.jwt);
        this.$router.push('/locations')
      } catch (error) {
        console.error(error);
      }
    },
    async setRole(token) {
      try{
        const {data} = await axios.get(import.meta.env.VITE_BACK_URL + '/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        localStorage.setItem('role', data.role);
      } catch (error) {
        console.error(error);
      }
    },
  }
};

</script>

<style scoped>

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}

.input {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
}

label {
  margin-right: 1rem;
}


</style>