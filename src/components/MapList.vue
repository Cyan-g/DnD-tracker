<template>
  <div >
      <b-row>

          <b-col cols="2" >
              <h5>Maps</h5>
              <hr/>
              <b-form-input v-model="searchQuery" placeholder="type to search"></b-form-input>
              <b-button 
                  variant="outline-success"
                  class="mb-1 mt-1"
                  style="width: 100%;"
                  @click="addMap()"> 
                  <i class="fas fa-plus"></i> Add Map
              </b-button>
              <hr>

              <div :key="searchQuery" style="overflow-y: scroll; height: 30rem;">
                  <div v-for="(map, index) in filteredMaps" :key="index + '_TLN'" >
                      <b-button-group 
                          class="mb-1"
                          style="width: 100%;height: 2rem;"
                          >
                          <b-button 
                              :variant="selectedMap.name == map.name ? 'dark' : 'outline-dark'"
                            class="p-1"
                              style="width: 90%;"
                              @click="selectMap(index)"
                              >
                              {{ map.name }}
                          </b-button>

                          <b-button 
                            class="p-1"
                            variant="outline-danger" @click="deleteMap(index, map.name)">
                              <i class="fas fa-trash"></i>
                          </b-button>
                      </b-button-group>
                  </div>
              </div>
            
          </b-col>

          <b-col cols="10">
              <Map v-if="campaign.maps.length > 0" :map="selectedMap" :campaign="campaign"></Map>
          </b-col>

      </b-row>
  </div>
</template>

<script>
import _ from "lodash";
import Map from "./Map.vue";

export default {
props: ["campaign"],
components: {Map},
data() {
  return {
      searchQuery: "",
      selectedMap: null,
      defaultMap: {
          name: "New Map",
          source: "",
          pins: []
      }
  };
},
created() {
    if(this.campaign.maps.length == 0)
        this.campaign.maps.push(_.cloneDeep(this.defaultMap));

    this.selectMap(0);
},
methods: {
  clearFilter(){
      this.searchQuery = "",
      this.selectMap(0);
  },
  deleteMap(index, name){
      if(!confirm("Delete Map: " + name + " ?")) return;

      this.campaign.maps.splice(index, 1);
      if(this.campaign.maps.length == 0)
          this.campaign.maps.push(_.cloneDeep(this.defaultMap));
      this.selectMap(0);
  },
  addMap(){
      this.searchQuery = "";
      let map = _.cloneDeep(this.defaultMap);
      map.name += " " + this.campaign.maps.length;
      this.campaign.maps.unshift(map);
      this.selectMap(0);
  },
  selectMap(index){
      this.selectedMap = this.filteredMaps[index];
  }
},
computed: {
  filteredMaps(){
      if(this.searchQuery.length == 0) return this.campaign.maps;
      else return this.campaign.maps.filter(x => 
          x.source.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          x.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
  }
},
};
</script>