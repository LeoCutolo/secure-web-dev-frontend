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
    Already have an account? <router-link to="/login">Sign in</router-link>
  </div>
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
        const { data } = await axios.post(import.meta.env.VITE_BACK_URL + '/users/register', {
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

<style scoped>

header {
  line-height: 1.5;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

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


</style>