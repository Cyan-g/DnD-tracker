<template>
  <div >
      <b-row>

          <b-col cols="2" >
              <h5>Locations</h5>
              <hr/>
              <b-form-input 
                :class="getStylingClass('input')"
                v-model="searchQuery" placeholder="type to search"></b-form-input>
              <b-button 
                  variant="outline-success"
                  class="mb-1 mt-1"
                  style="width: 100%;"
                  @click="addLocation()"> 
                  <i class="fas fa-plus"></i> Add Location
              </b-button>
              <hr>

              <div :key="searchQuery" style="overflow-y: scroll; height: 30rem;">
                 <LocationTree 
                    v-for="(location, index) in filteredlocations" :key="index + '_TLN'" 
                    :location="location"
                    :selectLocation="selectLocation"
                    :selectedLocation="selectedLocation"
                    :index="index"
                    :deleteLocation="deleteLocation">
                 </LocationTree>
              </div>
            
          </b-col>

          <b-col cols="10">
              <Location :defaultLocation="defaultLocation" v-if="campaign.locations.length > 0" :location="selectedLocation" :campaign="campaign"></Location>
          </b-col>

      </b-row>
  </div>
</template>

<script>
import _ from "lodash";
import Location from "./Location.vue";
import LocationTree from "./LocationTree.vue";

export default {
props: ["campaign", "getStylingClass"],
components: { Location, LocationTree },
data() {
  return {
      searchQuery: "",
      selectedLocation: null,
      defaultLocation: {
          name: "New Location",
          type: "City",
          inhabitants: "None",
          description: "",
          subLocations: [],
          links: []
      }
  };
},
created() {
  if(this.campaign.locations.length == 0)
      this.campaign.locations.push(_.cloneDeep(this.defaultLocation));
  this.selectLocation(0);
},
methods: {
  clearFilter(){
      this.searchQuery = "",
      this.selectLocation(0);
  },
  deleteLocation(index, name){
      if(!confirm("Delete Location: " + name + " ?")) return;

      this.campaign.locations.splice(index, 1);
      if(this.campaign.locations.length == 0)
          this.campaign.locations.push(_.cloneDeep(this.defaultLocation));
      this.selectLocation(0);
  },
  addLocation(){
      this.searchQuery = "";
      let location = _.cloneDeep(this.defaultLocation);
      location.name += " " + this.campaign.locations.length;
      this.campaign.locations.unshift(location);
      this.selectLocation(0);
  },
  selectLocation(location){
      this.selectedLocation = location;
  }
},
computed: {
  filteredlocations(){
      if(this.searchQuery.length == 0) return this.campaign.locations;
      else return this.campaign.locations.filter(x => 
          x.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          x.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
  }
},
};
</script>