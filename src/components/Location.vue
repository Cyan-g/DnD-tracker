<template>
  <div>
      <br>
      <b-form-input style="width: 20%" v-model="location.name"></b-form-input>
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
          <LinkList :linkList="location.links" :campaign="campaign"></LinkList>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import LinkList from "./LinkList.vue"

export default {
props: ["location", "campaign"],
components: {LinkList},
};
</script>