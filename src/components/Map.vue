<template>
    <div>
        <h5>Map</h5>
        <b-form-file accept="image/*" v-model="map.source" @input="log()"></b-form-file>
        <img :src="map.source"/>
        <pre>{{ map.source }}</pre>
    </div>
</template> 

<script>
// import _ from "lodash";

export default {
  props: ["map", "campaign"],
  components: {},
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    log(){
      console.log(this.map.source)
    }
  },
  computed: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #2c3e50;
  margin-top: 20px;
}
#app > * {
  background-color: #304152;
}
#smallprint {
  color: black;
  font-size: 0.8rem;
}
</style>
