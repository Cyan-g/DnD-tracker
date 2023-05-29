<template>
 <div id="app">
  <body>
    <b-tabs vertical pills>
      <b-tab title="Timeline">
        <b-card>
          <Timeline :timeline="campaign.timeline"></Timeline>
        </b-card>
      </b-tab>
      <b-tab title="Combat Tracker">
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
// import _ from "lodash";
import Timeline from "./components/Timeline.vue";

export default {
  name: "App",
  components: {Timeline},
  data() {
    return {
      campaign: null
    };
  },
  created() {
    var storedCampaign = localStorage.getItem("campaign");
    if(!storedCampaign)
    this.campaign = {
      timeline: [],
      characters: [],
      locations: [],
      maps: []
    }
  },

  methods: {
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
  margin-top: 60px;
}
#app > * {
  background-color: #304152;
}
#smallprint {
  color: black;
  font-size: 0.8rem;
}
</style>
