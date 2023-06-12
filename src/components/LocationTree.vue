<template>
    <div>

        <b-button-group 
            class="mb-1"
            style="width: 100%; height: 2rem;"
            >
            <b-button :key="showTree" v-if="location.subLocations.length > 0" @click="showTree = !showTree"> 
                <i :class="showTree ? 'fas fa-chevron-circle-down':'fas fa-chevron-circle-up'"></i>
            </b-button>

            <b-button 
                class="p-1"
                :variant="selectedLocation.name == location.name ? 'dark' : 'outline-dark'"
                style="width: 90%;"
                @click="selectLocation(location)"
                >
                {{ location.name }}
            </b-button>

            <b-button class="p-1" variant="outline-danger" @click="deleteLocation(index, location.name)">
                <i class="fas fa-trash"></i>
            </b-button>
        </b-button-group>
        <LocationTree 
            class="ml-2"
            v-show="showTree"
            v-for="(subLocation, j) in location.subLocations" 
            :key="index + '_' + j" 
            :location="subLocation"
            :selectLocation="selectLocation"
            :selectedLocation="selectedLocation"
            :index="index + '_' + j"
            :deleteLocation="deleteSubLocation">
        </LocationTree>
    </div>
</template>

<script>
export default { 
props: [
    "location", 
    "defaultLocation", 
    "index", 
    "deleteLocation", 
    "selectLocation", 
    "selectedLocation"
],
data(){
    return {
        showTree: false
    }
},
methods: {
    deleteSubLocation(index, name){
      if(!confirm("Delete Location: " + name + " ?")) return;
      this.location.subLocations.splice(index, 1);
  },
}
};
</script>