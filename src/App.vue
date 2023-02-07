<script setup>
</script>

<template>
  <RouterView></RouterView>
</template>

<script>
import Routerview from '@/components/RouterView.vue'

export default {
  name: 'App',
  components: {
    Routerview
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
}
</script>

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
