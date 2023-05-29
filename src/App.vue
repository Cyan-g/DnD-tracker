<template>
 <div id="app">
  <body class="ml-3 mr-3">
    <b-row>
      <b-col cols="2">
        <b-form-input v-model="campaign.name"></b-form-input>
      </b-col>
    </b-row>
    <br>
    <b-tabs vertical pills>
      <b-tab title="Campaigns">
        <b-card>
          <h5>Savedata</h5>
          <hr>
          <b-button variant="dark" @click="exportCampaign()">Export</b-button>
          <b-button class="ml-2" variant="dark" :disabled="campaignText.length < 10" @click="importCampaign()">Import</b-button>
          <br>
          <b-form-textarea class="mt-2" style="height: 35rem; width: 100%" v-model="campaignText">
            </b-form-textarea>
        </b-card>
      </b-tab>
      <b-tab title="Timeline">
        <b-card>
          <Timeline :timeline="campaign.timeline"></Timeline>
        </b-card>
      </b-tab>
      <b-tab title="Combat">
        <b-card></b-card>
      </b-tab>
      <b-tab title="Maps">
        <b-card></b-card>
      </b-tab>
      <b-tab title="Places">
        <b-card></b-card>
      </b-tab>
      <b-tab title="Characters">
        <b-card></b-card>
      </b-tab>
    </b-tabs>
  </body>
 </div>
</template>

<script>
import _ from "lodash";
import Timeline from "./components/Timeline.vue";

export default {
  name: "App",
  components: {Timeline},
  data() {
    return {
      campaign: null,
      campaignText: "",
      campaignTemplate: {
        name: "New Campaign",
        timeline: [],
        characters: [],
        locations: [],
        maps: []
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
