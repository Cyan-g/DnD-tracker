<template>
 <div id="app">
  <body class="ml-3 mr-5">
    <b-row>
      <b-col cols="2">
        <b-form-input :class="getStylingClass('input')" v-model="campaign.name"></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button @click="$bvModal.show('combatInfoModal')"> <i class="fas fa-book"></i> Action Codex</b-button>
        <CombatInfo :getStylingClass="getStylingClass"></CombatInfo>
      </b-col>
      <b-col cols="2">
        <b-button @click="$bvModal.show('conditionInfoModal')"> <i class="fas fa-book"></i> Condition Codex</b-button>
        <ConditionInfo :getStylingClass="getStylingClass"></ConditionInfo>
      </b-col>
    </b-row>
    <br>
    <b-tabs 
      vertical 
      pills
      active-nav-item-class="text-bold"
      >

      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Savedata">
        <b-card :body-class="getStylingClass('background')">
          <h5>Savedata</h5>
          <hr>
          <b-row>
            <b-col lg="3">
              <b-checkbox v-model="campaign.settings.showEnemyHP">Show Enemy HP</b-checkbox>
              <b-checkbox v-model="campaign.settings.showCharacterStats">Show Character Stats</b-checkbox>
            </b-col>
            <b-col lg="3">
              <b-checkbox v-model="campaign.settings.darkMode">Dark Mode</b-checkbox>
            </b-col>
          </b-row>
         
          <hr>
          <b-button variant="dark" @click="exportCampaign()">Save & Export</b-button>
          <b-button class="ml-1" variant="dark" :disabled="campaignText.length < 10" @click="mapImport()">Import Maps from save</b-button>
          <b-button class="ml-1" variant="dark" :disabled="campaignText.length < 10" @click="fullImport()">Import Full save</b-button>
          <br>
          <b-form-textarea :class="getStylingClass('input') + ' mt-2'" style="height: 35rem; width: 100%" v-model="campaignText">
            </b-form-textarea>
        </b-card>
      </b-tab>

      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Combat">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <Combat :campaign="campaign" :getStylingClass="getStylingClass"></Combat>
        </b-card>
      </b-tab>

      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Notebook">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <Timeline :campaign="campaign" :getStylingClass="getStylingClass"></Timeline>
        </b-card>
      </b-tab>
      
      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Characters">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <CharacterList :campaign="campaign" :getStylingClass="getStylingClass"></CharacterList>
        </b-card>
      </b-tab>

      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Spell Tome">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <SpellTome :campaign="campaign" :getStylingClass="getStylingClass"></SpellTome>
        </b-card>
      </b-tab>

      <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Maps">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <MapList :campaign="campaign" :getStylingClass="getStylingClass"></MapList>
        </b-card>
      </b-tab>

      <!-- <b-tab :title-link-class="getStylingClass('button') + ' mb-1'" title="Locations">
        <b-card v-if="campaign" :body-class="getStylingClass('background')">
          <LocationList :campaign="campaign" :getStylingClass="getStylingClass"></LocationList>
        </b-card>
      </b-tab> -->

    </b-tabs>
  </body>
 </div>
</template>

<script>
import _ from "lodash";
import FileSaver from 'file-saver';
import CombatInfo from "./components/CombatInfo.vue";
import ConditionInfo from "./components/ConditionInfo.vue";
import Timeline from "./components/Timeline.vue";
import Combat from "./components/Combat.vue";
import CharacterList from "./components/CharacterList.vue";
import MapList from "./components/MapList.vue";
// import LocationList from "./components/LocationList.vue";
import SpellTome from "./components/SpellTome.vue";

export default {
  name: "App",
  components: {
    CombatInfo,
    ConditionInfo,
    MapList,
    // LocationList,
    CharacterList,
    Timeline,
    SpellTome,
    Combat
  },
  data() {
    return {
      campaign: null,
      defaultSettings: {
        showEnemyHP: false,
        showCharacterStats: false,
        darkMode: false
      },
      campaignText: "",
      campaignTemplate: {
        name: "New Campaign",
        settings: {
          showEnemyHP: false,
          showCharacterStats: false,
          darkMode: false
        },
        timeline: [],
        characters: [],
        locations: [],
        maps: [],
        combat: {players: [], enemies: []},
        spells: [],
        slots1: 0,
        used1: 0,
        slots2: 0,
        used2: 0,
        slots3: 0,
        used3: 0,
        slots4: 0,
        used4: 0,
        slots5: 0,
        used5: 0,
        slots6: 0,
        used6: 0,
        slots7: 0,
        used7: 0,
        slots8: 0,
        used8: 0,
        slots9: 0,
        used9: 0,
      }
    };
  },
  created() {
    this.campaign = _.cloneDeep(this.campaignTemplate);
    var settings = JSON.parse(localStorage.getItem("settings"));
    if(!settings) settings = _.cloneDeep(this.defaultSettings);
      this.campaign.settings = settings;

    var savedCampaign = JSON.parse(localStorage.getItem("campaignData"));
    if(savedCampaign) 
      this.campaign = savedCampaign;
  },
  methods: {
    getStylingClass(element){
      switch(element)
      {
        case 'button':
          {
            if(this.campaign.settings.darkMode)
              return "btn-dark text-light"
            else 
              return "btn-light text-dark"
          }

        case 'buttonReverse':
          {
            if(this.campaign.settings.darkMode)
              return "btn-light text-dark"
            else 
              return "btn-dark text-light"
          }

        case 'background':
          {
            if(this.campaign.settings.darkMode)
              return "bg-gray"

            break;
          }

        case 'input':
          {
            if(this.campaign.settings.darkMode)
              return "bg-black"

            break;
          }
      }
    
    },
    fullImport(){
      this.campaign = null;
      this.campaign = JSON.parse(this.campaignText);
      this.campaignText = "";
    },
    mapImport(){
      var saveFile = JSON.parse(this.campaignText);
      this.campaign.maps = _.cloneDeep(saveFile.maps);
      this.campaignText = "";
    },
    exportCampaign(){
      var blob = new Blob([JSON.stringify(this.campaign)], {
        type: "text/plain;charset=utf-8",
      });
      // Create and save the file using the FileWriter library
      FileSaver.saveAs(blob, this.campaign.name);

      var campaignData = _.cloneDeep(this.campaign);
      campaignData.maps = [];
      localStorage.setItem("campaignData", JSON.stringify(campaignData));
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

.card {
  border: none !important;
  border-radius: 5px !important;
}

.bg-black {
  background-color: black !important;
  color: white !important;
  border-color: #505050 !important;
}
.bg-black:focus {
  background-color: black !important;
  color: white !important;
  border-color: #505050 !important;
}

.bg-gray {
  background-color: #333 !important;
  color: white !important;
  border-color: #505050 !important;
}
.bg-gray:focus {
  background-color: #333 !important;
  color: white !important;
  border-color: #505050 !important;
}

.text-light {
  color: white !important;
}

</style>
