<template>
  <div>
    <header>

    </header>
    <div class="container">
      <div class="split left">
        <div class="centered">
          <h2>Current Values</h2>
          <ul>
            <div class="geolocation">
              <li id="type">
                <p>Type : {{this.geolocation.type}}</p>
              </li>
              <li id="coordinates">
                <p>Coordinates : </p>
                <ul>
                  <li id="longitude">
                    <p>Longitude : {{ this.geolocation.coordinates[0]}}</p>
                  </li>
                  <li id="latitude">
                    <p>Latitude : {{this.geolocation.coordinates[1]}}</p>
                  </li>
                </ul>
              </li>
            </div>
            <li id="filmType">
              <p>Film Type : {{this.locationData.filmType}}</p>
            </li>
            <li id="filmProducerName">
              <p>Producer Name : {{this.locationData.filmProducerName}}</p>
            </li>
            <li id="endDate">
              <p>End Date : {{this.locationData.endDate}}</p>
            </li>
            <li id="filmName">
              <p>Film Name : {{this.locationData.filmName}}</p>
            </li>
            <li id="district">
              <p>District : {{this.locationData.district}}</p>
            </li>
            <li id="sourceLocationId">
              <p>Source Location Id : {{this.locationData.sourceLocationId}}</p>
            </li>
            <li id="filmDirectorName">
              <p>Director Name : {{this.locationData.filmDirectorName}}</p>
            </li>
            <li id="address">
              <p>Address : {{this.locationData.address}}</p>
            </li>
            <li id="startDate">
              <p>Start Date : {{this.locationData.startDate}}</p>
            </li>
            <li id="year">
              <p>Year : {{this.locationData.year}}</p>
            </li>
          </ul>
          <router-link v-bind:to="{name: 'locations'}">Back to Locations</router-link>
        </div>
      </div>
      <div class="split right">
        <div class="centered">
          <form @submit.prevent="submitForm">
            <h2>Edit Location</h2>
            <ul>
              <div class="geolocation">
                <li id="type">
                  <label for="type">Type: </label>
                  <select id="type" v-model="geolocationType">
                    <option value=""></option>
                    <option value="Feature">Feature</option>
                    <option value="Point">Point</option>
                  </select>
                </li>
                <li id="coordinates">
                  <label for="coordinates">Coordinates : </label>
                  <ul>
                    <li id="longitude">
                      <label for="longitude">Longitude : </label>
                      <input id="longitude" v-model="longitude"/>
                    </li>
                    <li id="latitude">
                      <label for="latitude">Latitude : </label>
                      <input id="latitude" v-model="latitude"/>
                    </li>
                  </ul>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'editLocation',
  components:{

  },
  computed: {
    id (){
      return this.$route.params.id;
    }
  },
  data(){
    return {
      locationData: [],
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
    };
  },
  methods: {
    async getLocation(){
      try {
        const { data } = await axios.get('http://localhost:3000/locations/' + this.id, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          params: {
            offset: 0,
            limit: 9
          }
        });
        this.locationData = data;
        this.geolocation = this.locationData.geolocation;
      } catch (error) {
        alert("You are not logged in. Please log in to view locations.");
        console.error(error);
        this.$router.push('/login');
      }
    },
    getData() {
      if (this.geolocationType === '') {
        this.geolocationType = this.locationData.geolocation.type;
      }
      if (this.longitude === '') {
        this.longitude = this.locationData.geolocation.coordinates[0];
      }
      if (this.latitude === '') {
        this.latitude = this.locationData.geolocation.coordinates[1];
      }
      if (this.filmType === '') {
        this.filmType = this.locationData.filmType;
      }
      if (this.filmProducerName === '') {
        this.filmProducerName = this.locationData.filmProducerName;
      }
      if (this.endDate === '') {
        this.endDate = this.locationData.endDate;
      }
      if (this.filmName === '') {
        this.filmName = this.locationData.filmName;
      }
      if (this.district === '') {
        this.district = this.locationData.district;
      }
      if (this.sourceLocationId === '') {
        this.sourceLocationId = this.locationData.sourceLocationId;
      }
      if (this.filmDirectorName === '') {
        this.filmDirectorName = this.locationData.filmDirectorName;
      }
      if (this.address === '') {
        this.address = this.locationData.address;
      }
      if (this.startDate === '') {
        this.startDate = this.locationData.startDate;
      }
      if (this.year === '') {
        this.year = this.locationData.year;
      }
    },
    async submitForm() {
      this.getData();
      const options = {
        method: 'PATCH',
        url: 'http://localhost:3000/locations/' + this.id,
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
      }).catch(function (error) {
        console.error(error);
      });
      this.$router.push('/locations');
    },
  },

  mounted() {
    this.getLocation();
  }

}

</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  transform: translate(-50%, -50%);
}

ul li ul {
  padding-left: 20px;
}

ul li ul li {
  list-style-type: none;
}

</style>