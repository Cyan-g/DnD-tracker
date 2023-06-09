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
            <div @click="pin($event)" style="position:relative">
              <img 
                v-if="map.source"
                :src="map.source"
                style="width: 100%; border: solid black 2px; border-radius: 1rem;"
              />
                <Pin 
                  v-for="pin in map.pins" 
                  :key="pin.name + '#' + pin.number" 
                  :pin="pin"
                  @enter="hoverPin = true"
                  @leave="hoverPin = false"
                  :style="{position: 'absolute', left: pin.x + '!important',top: pin.y}">
                </Pin>
            </div>
          </b-col>
        </b-row>
    </div>
</template> 

<script>
import _ from "lodash";
import Pin from "./Pin.vue";

export default {
  props: ["map", "campaign"],
  components: {Pin},
  data() {
    return {
      file: null,
      hoverPin: false,
      pinTemplate: {
        links: [],
        name: "New Pin",
        notes: "",
        number: 0,
        x: "0%",
        y: "0%"
      }
    };
  },
  created() {
  },
  methods: {
    pin(event){
      if(this.hoverPin) return;
      var imageRect = event.target.getBoundingClientRect(); 
      var x = Math.floor(event.clientX - imageRect.left);
      var y = Math.floor(event.clientY - imageRect.top);

      x = x / imageRect.width;
      y = y / imageRect.height;

      x = (x * 100).toFixed(2) + '%';
      y = (y * 100).toFixed(2) + '%';

      var newPin = _.cloneDeep(this.pinTemplate);

      newPin.name =  newPin.name + " " + this.map.pins.length;
      newPin.x = x;
      newPin.y = y;

      this.map.pins.push(newPin);
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
  }
};
</script>
