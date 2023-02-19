<template>
  <div class="container">
    <header>
      <router-link v-bind:to="{ name: 'home' }" @click="signout">Sign Out</router-link>
    </header>

    <div class="locations-grid">
      <div v-for="location in this.locations" :key="location">
        <div id="location">
          <router-link v-bind:to="{ name: 'location', params: { id: location._id }}">{{ location.filmName }}</router-link>
          <p id="filmType">{{ location.filmType }}</p>
          <p id="directorName">{{ location.filmDirectorName.toLowerCase() }}</p>
          <div v-if="this.role === 'admin'" id ="adminSection">
            <router-link v-bind:to="{name: 'editlocation', params: { id: location._id }}">Edit</router-link>
            <router-link v-bind:to="{name: 'locations'}" @click="remove(location)">Delete</router-link>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="navigation">
        <router-link v-bind:to="{name: 'locations'}" @click="previous">Previous locations</router-link>
        <router-link v-bind:to="{name: 'locations'}" @click="next">Next locations</router-link>
      </div>
      <div v-if="this.role === 'admin'">
        <router-link v-bind:to="{name: 'add'}">Add a location</router-link>
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
        const { data } = await axios.get(import.meta.env.VITE_BACK_URL + '/locations', {
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
        await axios.delete(import.meta.env.VITE_BACK_URL + '/locations/' + location._id, {
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

header {
  grid-area: header;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

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
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  grid-template-areas:
    "header"
    "locations-grid"
    "footer";
  height: 100vh;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  grid-column-gap: 10rem;
}

#location {
  padding: 1rem;
}

.locations-grid #location #adminSection {
  display: flex;
  justify-content: space-around;
  padding-right: 50%;
}

#directorName{
  font-style: italic;
  text-transform: capitalize;
}

footer .navigation {
  display: flex;
  justify-content: space-around;
}

</style>