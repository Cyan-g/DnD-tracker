<template>
 <div id="app">
  <body class="ml-3 mr-5">
    <b-row>
      <b-col cols="2">
        <b-form-input v-model="campaign.name"></b-form-input>
      </b-col>
    </b-row>
    <br>
    <b-tabs 
      vertical 
      pills
      active-nav-item-class="text-light btn-dark"
      active-tab-class="font-weight-bold text-light"
      >

      <b-tab title-link-class="btn-light mb-1" title="Savedata">
        <b-card>
          <h5>Savedata</h5>
          <hr>
          <b-button variant="dark" @click="exportCampaign()">Export</b-button>
          <b-button class="ml-1" variant="dark" :disabled="campaignText.length < 10" @click="importCampaign()">Import</b-button>
          <br>
          <b-form-textarea class="mt-2" style="height: 35rem; width: 100%" v-model="campaignText">
            </b-form-textarea>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Timeline">
        <b-card>
          <Timeline :campaign="campaign"></Timeline>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Combat">
        <b-card>
          <Combat :campaign="campaign"></Combat>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Maps">
        <b-card></b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Places">
        <b-card></b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Characters">
        <b-card></b-card>
      </b-tab>

    </b-tabs>
  </body>
 </div>
</template>

<script>
import _ from "lodash";
import Timeline from "./components/Timeline.vue";
import Combat from "./components/Combat.vue";

export default {
  name: "App",
  components: {
    Timeline,
    Combat
  },
  data() {
    return {
      campaign: null,
      campaignText: "",
      campaignTemplate: {
        name: "New Campaign",
        color1: "#FF2D00",
        color2: "#7F7F7F",
        color3: "#000000",
        timeline: [],
        characters: [],
        locations: [],
        maps: [],
        combat: {players: [], enemies: []}
      }
    };
  },
  created() {
    this.campaign = _.cloneDeep(this.campaignTemplate);
  },
  methods: {
    importCampaign(){
      this.campaign = JSON.parse(this.campaignText);
    },
    exportCampaign(){
      this.campaignText = JSON.stringify(this.campaign);
    }
  },
  computed: {
  },
};
</script>

<style scoped>
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
</style>
