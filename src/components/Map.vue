<template>
    <div>
        <h5>Map</h5>
        <b-row>

          <b-col cols="6">
            <b-form-input v-model="map.name"></b-form-input>
          </b-col>

          <b-col cols="6">
            <b-form-file accept="image/*" v-model="file" @input="getImage()" ></b-form-file>
          </b-col>

          <b-col cols="12">
            <hr>
            <img 
              v-if="map.source"
              @click="pin($event)"
              :src="map.source"
              style="width: 100%;border: solid black 2px; border-radius: 1rem;"
              />
          </b-col>
        </b-row>
    </div>
</template> 

<script>
// import _ from "lodash";

export default {
  props: ["map", "campaign"],
  components: {},
  data() {
    return {
      file: null
    };
  },
  created() {
  },
  methods: {
    pin(event){
      var imageRect = event.target.getBoundingClientRect(); 
      var x = Math.floor(event.clientX - imageRect.left);
      var y = Math.floor(event.clientY - imageRect.top);

      x = x / imageRect.width;
      y = y / imageRect.height;
      
      console.log((x * 100).toFixed(2) + '%', (y * 100).toFixed(2) + '%');
    },
    getImage(){
      let reader = new FileReader();

      let that = this;
      reader.onloadend = function() {
        that.map.source = reader.result;
      }
      reader.readAsDataURL(this.file);
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
