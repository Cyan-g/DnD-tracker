<template>
  <div >
      <b-row>

          <b-col cols="2" >
              <h5>Characters</h5>
              <hr/>
              <b-form-input v-model="searchQuery" placeholder="type to search"></b-form-input>
              <b-button 
                  variant="outline-success"
                  class="mb-1 mt-1"
                  style="width: 100%;"
                  @click="addCharacter()"> 
                  <i class="fas fa-plus"></i> Add Character
              </b-button>
              <hr>

              <div :key="searchQuery" style="overflow-y: scroll; height: 30rem;">
                  <div v-for="(character, index) in filteredCharacters" :key="index + '_TLN'" >
                      <b-button-group 
                          class="mb-1"
                          style="width: 100%;"
                          >
                          <b-button 
                              :variant="selectedCharacter.name == character.name ? 'dark' : 'outline-dark'"
                              style="width: 90%;"
                              @click="selectCharacter(index)"
                              >
                              {{ character.name }}
                          </b-button>

                          <b-button variant="outline-danger" @click="deleteCharacter(index, character.name)">
                              <i class="fas fa-lg fa-trash mt-2"></i>
                          </b-button>
                      </b-button-group>
                  </div>
              </div>
            
          </b-col>

          <b-col cols="10">
              <Character v-if="campaign.characters.length > 0" :character="selectedCharacter" :campaign="campaign"></Character>
          </b-col>

      </b-row>
  </div>
</template>

<script>
import _ from "lodash";

export default {
props: ["campaign"],
data() {
  return {
      searchQuery: "",
      selectedCharacter: null,
      defaultCharacter: 
      {
          name: "New Character",
          notes: "",
          race: "Human",
          origin: "unknown",
          relationship: "good",
          links: [],
          spellCasting: "None",
          money: 0,
          maxHP: 20,
          currentHP: 20,
          armorClass: 10,
          speed: 30,
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          proficiencyBonus: 2,
          saves: 
            [
              {label: "Strength Save", value: false},
              {label: "Dexterity Save", value: false},
              {label: "Consitution Save", value: false},
              {label: "Intelligence Save", value: false},
              {label: "Wisdom Save", value: false},
              {label: "Charisma Save", value: false}
            ],
          skills: 
            [
              {label: "Acrobatics", value: false},
              {label: "Animal Handling", value: false},
              {label: "Arcana", value: false},
              {label: "Athletics", value: false},
              {label: "Deception", value: false},
              {label: "History", value: false},
              {label: "Insight", value: false},
              {label: "Intimidation", value: false},
              {label: "Investigation", value: false},
              {label: "Medicine", value: false},
              {label: "Nature", value: false},
              {label: "Perception", value: false},
              {label: "Performance", value: false},
              {label: "Persuasion", value: false},
              {label: "Religion", value: false},
              {label: "Sleight of Hand", value: false},
              {label: "Stealth", value: false},
              {label: "Survival", value: false}
            ]
          },
      }
  },
created() {
  if(this.campaign.characters.length == 0)
      this.campaign.characters.push(_.cloneDeep(this.defaultCharacter));
  this.selectCharacter(0);
},
methods: {
  clearFilter(){
      this.searchQuery = "",
      this.selectCharacter(0);
  },
  deleteCharacter(index, name){
      if(!confirm("Delete Character: " + name + " ?")) return;

      this.campaign.characters.splice(index, 1);
      if(this.campaign.characters.length == 0)
          this.campaign.characters.push(_.cloneDeep(this.defaultCharacter));
      this.selectCharacter(0);
  },
  addCharacter(){
      this.searchQuery = "";
      let character = _.cloneDeep(this.defaultCharacter);
      character.name += " " + this.campaign.characters.length;
      this.campaign.characters.unshift(character);
      this.selectCharacter(0);
  },
  selectCharacter(index){
      this.selectedCharacter = this.filteredCharacters[index];
  }
},
computed: {
  filteredCharacters(){
      if(this.searchQuery.length == 0) return this.campaign.characters;
      else return this.campaign.characters.filter(x => 
          x.notes.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          x.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
  }
},
};
</script>