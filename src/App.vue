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
          <h5>Campaigns</h5>
          <hr>
          <b-row>
            <b-col cols="3" v-for="(saveState, index) in storedCampaigns" :key="index + '_save'">
              <b-card :title="saveState.name">
                <b-button size="lg" variant="success" @click="saveCampaignTo(index)">Save current</b-button>
                <b-button class="ml-2" size="sm" variant="dark" @click="loadCampaign(index)">Load</b-button>
              </b-card>
            </b-col>
          </b-row>
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
      storedCampaigns: [],
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
    this.storedCampaigns = JSON.parse(localStorage.getItem("campaigns"));
    
    if (this.storedCampaigns && this.storedCampaigns.length > 0)
      this.loadCampaign(0);
    else  {
      this.campaign = _.cloneDeep(this.campaignTemplate);
      this.storedCampaigns = [this.campaign];
      this.saveCampaigns();
    }
  },

  methods: {
    loadCampaign(index){
      this.campaign = _.cloneDeep(this.storedCampaigns[index]);
    },
    saveCampaignTo(index){
      this.storedCampaigns[index] = _.cloneDeep(this.campaign);
      this.saveCampaigns();
      this.loadCampaign(index);
    },
    saveCampaigns(){
      localStorage.setItem("campaigns", JSON.stringify(this.storedCampaigns));
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
