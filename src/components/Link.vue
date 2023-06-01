<template>
  <div :name="link.label + '_' + link.number">
    <a style="cursor: pointer" @click="findContent()">
      <i :class="linkIcon"></i> 
        {{link.label}}
    </a>
    <b-modal id="contentModal" size="lg">
      <TimelineNote v-if="link.type == 'note'" :note="content"></TimelineNote>
      <Character v-if="link.type == 'character'" :character="content"></Character>
      <Location v-if="link.type == 'location'" :location="content"></Location>
      <Map v-if="link.type == 'map'" :map="content"></Map>
    </b-modal>
  </div>
</template> 

<script>
import TimelineNote from "./TimelineNote.vue";
import Character from "./Character.vue";
import Location from "./Location.vue";
import Map from "./Map.vue";

export default {
  props: ["link", "campaign"],
  components: {
    TimelineNote,
    Character,
    Location,
    Map
  },
  data() {
    return {
      content: null
    };
  },
  created() {
  },
  methods: {
    findContent(){
      if(this.link.type == "note"){
        let content = this.campaign.timeline[this.campaign.timeline.length - this.link.number -1];
        this.content = content;
      }
      if(this.link.type == "character"){
        // let content = this.campaign.timeline[this.campaign.timeline.length - this.link.number];
        // this.content = content;
      }
      if(this.link.type == "location"){
        // let content = this.campaign.timeline[this.campaign.timeline.length - this.link.number];
        // this.content = content;
      }
      if(this.link.type == "map"){
        // let content = this.campaign.timeline[this.campaign.timeline.length - this.link.number];
        // this.content = content;
      }

      this.$nextTick(() => {
          this.$bvModal.show("contentModal");
      });
    }
  },
  computed: {
    linkIcon(){
      switch (this.link.type) 
      {
        case "note": return "fas fa-scroll";
        case "character": return "fas fa-user";
        case "map": return "fas fa-map";
        case "place": return "fas fa-map-marker-alt";
        default: return "fas fa-note";
      }
    }
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
