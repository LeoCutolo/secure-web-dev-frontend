<template>
  <div>
    <form @submit.prevent="submitForm">
      <ul>
        <div class="geolocation">
          <li id="type">
            <label for="type">Type: </label>
            <select id="type" v-model="geolocationType">
              <option value="Feature">Feature</option>
              <option value="Point">Point</option>
            </select>
          </li>
          <li id="coordinates">
            <label for="coordinates">Coordinates : </label>
            <input id="longitude" v-model="longitude"/>
            <input id="latitude" v-model="latitude"/>
          </li>
        </div>
        <li id="filmType">
          <label for="filmType">Film Type : </label>
          <input id="filmType" v-model="filmType"/>
        </li>
        <li id="filmProducerName">
          <label for="filmProducerName">Producer Name : </label>
          <input id="filmProducerName" v-model="filmProducerName"/>
        </li>
        <li id="endDate">
          <label for="endDate">End Date : </label>
          <input id="endDate" v-model="endDate"/>
        </li>
        <li id="filmName">
          <label for="filmName">Film Name : </label>
          <input id="filmName" v-model="filmName"/>
        </li>
        <li id="district">
          <label for="district">District : </label>
          <input id="district" v-model="district"/>
        </li>
        <li id="sourceLocationId">
          <label for="sourceLocationId">source Location Id : </label>
          <input id="sourceLocationId" v-model="sourceLocationId"/>
        </li>
        <li id="filmDirectorName">
          <label for="filmDirectorName">Director Name : </label>
          <input id="filmDirectorName" v-model="filmDirectorName"/>
        </li>
        <li id="address">
          <label for="address">Address : </label>
          <input id="address" v-model="address"/>
        </li>
        <li id="startDate">
          <label for="startDate">Start Date : </label>
          <input id="startDate" v-model="startDate"/>
        </li>
        <li id="year">
          <label for="year">Year : </label>
          <input id="year" v-model="year"/>
        </li>
      </ul>
      <button type="submit">Submit</button>
    </form>
    <footer>
      <router-link v-bind:to="{name: 'locations'}">Back to Locations</router-link>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addLocation',
  data() {
    return {
      geolocation: {
        type: '',
        coordinates: []
      },
      geolocationType: '',
      longitude: '',
      latitude: '',
      filmType: '',
      filmProducerName: '',
      endDate: '',
      filmName: '',
      district: '',
      sourceLocationId: '',
      filmDirectorName: '',
      address: '',
      startDate: '',
      year: '',
      id: ''
    };
  },
  methods: {
    async submitForm() {
      let self = this;
      const options = {
        method: 'POST',
        url: 'http://localhost:3000/locations/',
        params: { offset: 0, limit: 9 },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        data: {
          filmType: this.filmType,
          filmProducerName: this.filmProducerName,
          geolocation: {
            type: this.geolocationType,
            coordinates: [this.longitude, this.latitude]
          },
          endDate: this.endDate,
          filmName: this.filmName,
          district: this.district,
          sourceLocationId: this.sourceLocationId,
          filmDirectorName: this.filmDirectorName,
          address: this.address,
          startDate: this.startDate,
          year: this.year
        }
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        self.$router.push('/location/' + response.data._id);
      }).catch(function (error) {
        console.error(error);
      });
    },
  }
}

</script>

<style>
  footer {
    margin-top: 20px;
  }
</style>