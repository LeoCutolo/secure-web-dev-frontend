<template>
  <div class="information">
    <h1>{{ locationData.filmName }}</h1>
    <h3>{{ locationData.filmType }}</h3>
    <h3>Producteur : {{ locationData.filmProducerName }}</h3>
    <h3>Réalisateur : {{ locationData.filmDirectorName }}</h3>
    <h3>Année : {{ locationData.year }}</h3>
    <h3>Adresse : {{ locationData.address }}</h3>
    <h3>Code postal : {{ locationData.district }}</h3>

    <footer>
      <router-link to="/locations">Back to locations</router-link>
    </footer>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'Location',
  components: {

  },
  computed: {
    id (){
      return this.$route.params.id;
    }
  },
  data(){
    return {
      locationData: [],
      geolocation:{
        type: '',
        coordinates: []
      },
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
        console.log(this.locationData)
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getLocation();
  }


}


</script>

<style scoped>

.information {
  width: 100vh;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
}

h3 {
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
}

footer {
  position: absolute;
  justify-content: center;
  align-items: center;
}


</style>