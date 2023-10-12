<template>
    <div>

      <b-row>
        <b-col cols="4">
          <h4>Links</h4> 
        </b-col>
        <b-col>
          <b-button variant="outline-success" size="sm" @click="openModal()"><i class="fas fa-plus"></i> Add Link</b-button>
        </b-col>
      </b-row>
      <hr>

      <b-row>
        <b-col class="mb-1" cols="6" v-for="(link, index) in linkList" :key="index + '_link'" >
          <b-button-group>
            <Link :link="link" :campaign="campaign" :getStylingClass="getStylingClass"></Link> 
            <b-button 
              variant="outline-danger" 
              size="sm" 
              @click="linkList.splice(index, 1)">
              <i class="fas fa-trash"></i>
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
     
      <b-modal :id="id" hide-header hide-footer>	
        <b-row>
          <b-col cols="6">
            <b>Type of Link</b>
            <b-dropdown variant="dark" style="width:100%" :text="newLink.type">
              <b-dropdown-item
                v-for="item in typeList"
                :key="item"
                @click="newLink.type = item; searchQuery = '';"
                >{{ item }}</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
          <b-col cols="6">
            <b>Link to</b>
            <b-form-input v-model="searchQuery" placeholder="Type to search" debounce="1000"></b-form-input>
            <b-dropdown ref="ddown" variant="dark" style="width:100%">
              <b-dropdown-item
                v-for="item in getOptions()"
                :key="item.number"
                @click="newLink.label = item.label; newLink.number = item.number;"
                >{{ item.label }}</b-dropdown-item
              >
            </b-dropdown>
            
          </b-col>
          <b-col cols="12" class="text-center mt-1">
            <hr>
            <b-button @click="addLink()" style="width: 50%;" size="md" :disabled="!newLink.label"> Add Link</b-button>
          </b-col>
         
        </b-row>
      </b-modal>
    </div>
</template> 

<script>
import _ from "lodash";

export default {
  props: ["linkList", "campaign", "id", "getStylingClass"],
  data() {
    return {
      typeList: ["note","character", "map"],
      searchQuery: "",
      showDropdown: false,
      newLink: {
        label: "",
        type: "note",
        number: null
      },
      linkTemplate: {
        label: "",
        type: "note",
        number: 0
      }
    };
  },
  watch: {
    "searchQuery": {
      handler(){
       this.openDdwn();
      }
    }
  },
  methods: {
    openDdwn(){
      this.$refs.ddown.visible = true // to show;
    },
    closeDdwn(){
      this.$refs.ddown.visible = false // to hide;
    },
    openModal(){
      this.$bvModal.show(this.id);
    },
    addLink(){
      this.linkList.push(_.cloneDeep(this.newLink));
      this.newLink = _.cloneDeep(this.linkTemplate);
      this.searchQuery = "";
      this.$bvModal.hide(this.id);
    },
    getOptions(){
      let list = [];
      if(this.newLink.type == "note")
        list = this.campaign.timeline
        .map((x, i) => 
          ({label: x.date, number: this.campaign.timeline.length - i - 1})
        );

      else if(this.newLink.type == "character")
        list = this.campaign.characters
        .map((x, i) => 
          ({label: x.name, number: this.campaign.characters.length - i - 1})
        );

      else if(this.newLink.type == "location")
        list = this.campaign.locations
        .map((x, i) => 
          ({label: x.name, number: this.campaign.timeline.length - i - 1})
        );

      else if(this.newLink.type == "map")
        list = this.campaign.maps
        .map((x, i) => 
          ({label: x.name, number: this.campaign.timeline.length - i - 1})
        );
        
      return list.filter(x => x.label.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
}
};
</script>
