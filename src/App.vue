<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/locations">Locations</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
  </div>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Home" />
    </div>
  </header>

</template>
<!-- put navbar on top -->
<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

ul {
  list-style-type: none;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
