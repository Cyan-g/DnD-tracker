<template>
  <div :name="link.label + '_' + link.number">
    <b-button 
      size="sm" 
      variant="outline-dark" 
      @click="findContent()"
      v-b-popover.hover.top="'show ' + link.type"
      >
      <i :class="linkIcon"></i> 
        {{link.label}}
    </b-button>
    <b-modal :id="link.label + '--' + link.number" size="lg" v-if="content" hide-footer hide-header>
      <TimelineNote v-if="link.type == 'note'" :note="content"></TimelineNote>
      <Character v-if="link.type == 'character'" :character="content"></Character>
      <!-- <Location v-if="link.type == 'location'" :location="content"></Location> -->
      <Map v-if="link.type == 'map'" :map="content"></Map>
    </b-modal>
  </div>
</template> 

<script>

export default {
  props: ["link", "campaign", "getStylingClass"],
  data() {
    return {
      content: null
    };
  },
  methods: {
    findContent(){
      if(this.link.type == "note"){
        let content = this.campaign.timeline[this.campaign.timeline.length - this.link.number -1];
        if(!content || content.date != this.link.label) content = this.campaign.timeline.find(x => x.date == this.link.label);
        this.content = content;
      }
      if(this.link.type == "character"){
        let content = this.campaign.characters[this.campaign.characters.length - this.link.number ];
        if(!content || content.name != this.link.label) content = this.campaign.characters.find(x => x.name == this.link.label);
        this.content = content;
      }
      // if(this.link.type == "location"){
      //   let content = this.campaign.locations[this.campaign.locations.length - this.link.number -1];
      //   this.content = content;
      // }
      if(this.link.type == "map"){
        let content = this.campaign.maps[this.campaign.maps.length - this.link.number -1];
        this.content = content;
      }

      this.$nextTick(() => {
          this.$bvModal.show(this.link.label + '--' + this.link.number);
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
        case "location": return "fas fa-map-marker-alt";
        default: return "fas fa-note";
      }
    }
  },
};
</script>
