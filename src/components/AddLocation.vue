<template>
  <div>
    <form @submit.prevent="submitForm">
      <ul>
        <div class="geolocation">
          <li id="type">
            <label for="type">Type: </label>
            <select id="type" v-model="type">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addLocation',
  data() {
    return {
      type: '',
      coordinates: [],
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
    };
  },
  methods: {
    async submitForm() {
      if (this.type === 'Feature') {
        this.coordinates = [];
      } else {
        this.coordinates = [this.longitude, this.latitude];
        console.log(this.coordinates)
      }
      const filmData = JSON.stringify({
        "geolocation": {
          "type": this.type,
          "coordinates": this.coordinates,
        },
        "filmType": this.filmType,
        "filmProducerName": this.filmProducerName,
        "endDate": this.endDate,
        "filmName": this.filmName,
        "district": this.district,
        "sourceLocationId": this.sourceLocationId,
        "filmDirectorName": this.filmDirectorName,
        "address": this.address,
        "startDate": this.startDate,
        "year": this.year,
      });

      try {
        const { data } = await axios.post('http://localhost:3000/locations', {
          filmData,
          params: {
            offset: '0',
            limit: '9'
          },
          headers: {
            'Content-Type': 'application/json',
            'Bearer': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        console.log(data);
        this.$router.push('/locations')
      } catch (error) {
        console.error(error);
      }
    },
  }
}

</script>