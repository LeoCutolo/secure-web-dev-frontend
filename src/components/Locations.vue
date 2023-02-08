<script setup>
</script>

<template>
  <header>
    <button v-on:click="signout">Sign Out</button>
  </header>
  <h1>Locations</h1>
  <div class="locations-grid">
    <div v-for="location in this.locations" :key="location">
      <div class="">
        <h3>{{ location.filmName }}</h3>
        <p>{{ location.filmType }}</p>
        <p id="directorName">{{ location.filmDirectorName.toLowerCase() }}</p>
        <div v-if="this.role === 'admin'" class="adminSection">
          <button v-on:click="edit(location)">Edit</button>
          <button v-on:click="remove(location)">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="navigation">
      <button v-on:click="previous">Previous locations</button>
      <button v-on:click="next">Next locations</button>
    </div>
    <div v-if="this.role === 'admin'">
      <button v-on:click="add">Add a location</button>
    </div>
  </footer>

</template>

<script>

import axios from 'axios';

export default {
  name: "Locations",
  components: {
  },
  data(){
    return {
      locations: [],
      role: localStorage.getItem('role'),
      offset: 0
    };
  },
  methods: {
    async getLocations(){
      try {
        const { data } = await axios.get('http://localhost:3000/locations?offset=' + this.offset + '&limit=9', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.locations = data;
        console.log(this.locations)
      } catch (error) {
        alert("You are not logged in. Please log in to view locations.");
        console.error(error);
        this.$router.push('/login');
      }
    },
    signout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/');
    },
    previous() {
      if (this.offset > 0) {
        this.offset -= 9;
        this.getLocations();
      }
    },
    next() {
      this.offset += 9;
      this.getLocations();
    },
    add() {
      this.$router.push('/add');
    },
    async remove(location){
      if (!confirm("Are you sure you want to delete this location?")) {
        return;
      }
      try {
        await axios.delete('http://localhost:3000/locations/' + location._id + '?offset=0&limit=9', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        });
        await this.getLocations();
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted: function() {
    this.getLocations();
  }
}
</script>

<style scoped>

h1 {
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  padding: 0;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
}

#directorName{
  font-style: italic;
  text-transform: capitalize;
}


footer {
  display: block;
  justify-content: space-between;
}

</style>