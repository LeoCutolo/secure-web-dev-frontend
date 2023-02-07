<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Signup" />
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
</template>