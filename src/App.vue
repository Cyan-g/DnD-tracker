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
      >

      <b-tab title-link-class="btn-light mb-1" title="Savedata">
        <b-card>
          <h5>Savedata</h5>
          <hr>
          <b-checkbox v-model="campaign.settings.showEnemyHP">Show Enemy HP</b-checkbox>
          <b-checkbox v-model="campaign.settings.showCharacterStats">Show Character Stats</b-checkbox>
          <hr>
          <b-button variant="dark" @click="exportCampaign()">Export</b-button>
          <b-button class="ml-1" variant="dark" :disabled="campaignText.length < 10" @click="importCampaign()">Import</b-button>
          <br>
          <b-form-textarea class="mt-2" style="height: 35rem; width: 100%" v-model="campaignText">
            </b-form-textarea>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Combat">
        <b-card v-if="campaign">
          <Combat :campaign="campaign"></Combat>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Notebook">
        <b-card v-if="campaign">
          <Timeline :campaign="campaign"></Timeline>
        </b-card>
      </b-tab>
      
      <b-tab title-link-class="btn-light mb-1" title="Characters">
        <b-card v-if="campaign">
          <CharacterList :campaign="campaign"></CharacterList>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Spell Tome">
        <b-card></b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Maps">
        <b-card v-if="campaign">
          <MapList :campaign="campaign"></MapList>
        </b-card>
      </b-tab>

      <b-tab title-link-class="btn-light mb-1" title="Locations">
        <b-card v-if="campaign">
          <LocationList :campaign="campaign"></LocationList>
        </b-card>
      </b-tab>



    </b-tabs>
  </body>
 </div>
</template>

<script>
import _ from "lodash";
import Timeline from "./components/Timeline.vue";
import Combat from "./components/Combat.vue";
import CharacterList from "./components/CharacterList.vue";
import MapList from "./components/MapList.vue";
import LocationList from "./components/LocationList.vue";

export default {
  name: "App",
  components: {
    MapList,
    LocationList,
    CharacterList,
    Timeline,
    Combat
  },
  data() {
    return {
      campaign: null,
      defaultSettings: {
        showEnemyHP: false,
        showCharacterStats: false,
        color1: "#FF2D00",
        color2: "#7F7F7F",
        color3: "#000000"
      },
      campaignText: "",
      campaignTemplate: {
        name: "New Campaign",
        settings: {
          showEnemyHP: false,
          showCharacterStats: false,
          color1: "#FF2D00",
          color2: "#7F7F7F",
          color3: "#000000",
        },
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
    var settings = JSON.parse(localStorage.getItem("settings"));
    if(!settings) settings = _.cloneDeep(this.defaultSettings);
    this.campaign.settings = settings;
  },
  methods: {
    importCampaign(){
      this.campaign = null;
      this.campaign = JSON.parse(this.campaignText);
    },
    exportCampaign(){
      this.campaignText = JSON.stringify(this.campaign);
    }
  },
  computed: {
  },
  watch: {
    "campaign.settings": {
        handler() {
            localStorage.setItem("settings", JSON.stringify(this.campaign.settings));
        },
        deep: true,
    },
  }
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
