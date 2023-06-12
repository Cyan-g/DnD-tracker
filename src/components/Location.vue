<template>
  <div>
      <br>
     <b-row>
      <b-col cols="3">
        <b-form-input style="width: 100%" v-model="location.name"></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button variant="outline-success" @click="addSubLocation()">Add Sub-Location</b-button>
      </b-col>
     </b-row>
      <br>
      <b-row>
        <b-col>
          <b-row>
            <b-col cols="6">
              <b>Type of Location</b>
              <b-form-textarea style="height: 4rem;" v-model="location.type">
              </b-form-textarea>
            </b-col>
            <b-col cols="6">
              <b>Inhabitants</b>
              <b-form-textarea style="height: 4rem;" v-model="location.inhabitants">
              </b-form-textarea>
            </b-col>
            <b-col cols="12">
              <b>Notes</b>
              <b-form-textarea style="height: 30rem; width: 100%" v-model="location.description">
              </b-form-textarea>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="4" v-if="campaign">
          <LinkList :linkList="location.links" :campaign="campaign" id="LocationLinkModal"></LinkList>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import _ from "lodash";
import LinkList from "./LinkList.vue"

export default {
props: ["location", "campaign","defaultLocation"],
components: {LinkList},
methods: {
  addSubLocation(){
    if(!this.location.subLocations) this.location.subLocations = [];
    var newSubLocation = _.cloneDeep(this.defaultLocation);
    newSubLocation.name = this.location.name + " " + this.location.subLocations.length;
    this.location.subLocations.push(newSubLocation);
  }
}
};
</script>