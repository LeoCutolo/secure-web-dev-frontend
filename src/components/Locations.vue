<template>
  <div class="container">
    <header>
      <router-link v-bind:to="{ name: 'home' }" @click="signout">Sign Out</router-link>
    </header>

    <div class="locations-grid">
      <div v-for="location in this.locations" :key="location">
        <div class="">
          <router-link v-bind:to="{ name: 'location', params: { id: location._id }}">{{ location.filmName }}</router-link>
          <p id="directorName">{{ location.filmDirectorName.toLowerCase() }}</p>
          <div v-if="this.role === 'admin'" class="adminSection">
            <router-link v-bind:to="{name: editlocation, params: { id: location._id }}">Edit</router-link>
            <button @click="remove(location)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="navigation">
        <button @click="previous">Previous locations</button>
        <button @click="next">Next locations</button>
      </div>
      <div v-if="this.role === 'admin'">
        <button @click="add">Add a location</button>
      </div>
    </footer>
  </div>

</template>

<script>

import axios from 'axios';
import editLocation from "@/components/EditLocation.vue";

export default {
  name: "Locations",
  computed: {
    editLocation() {
      return editLocation
    }
  },
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
        const { data } = await axios.get('http://localhost:3000/locations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          params: {
            offset: this.offset,
            limit: 9
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
      localStorage.clear();
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
    edit(location) {
      localStorage.setItem('location', JSON.stringify(location));
      localStorage.setItem('id', location._id);
      this.$router.push('/edit/');
    },
    async remove(location){
      if (!confirm("Are you sure you want to delete this location?")) {
        return;
      }
      try {
        await axios.delete('http://localhost:3000/locations/' + location._id, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          params: {
            offset: this.offset,
            limit: 9
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

.container {
  display: block;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  height: 100vh;
  width: 100vh;
}


.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(400px, 1fr));
  grid-gap: 2rem;
  margin-top: 2rem;
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