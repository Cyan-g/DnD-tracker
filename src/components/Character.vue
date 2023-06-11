<template>
  <div>
      <br>
      <b-form-input style="width: 20%" v-model="character.name"></b-form-input>
      <br>
      <b-row>
        <b-col>
          <b-row>

            <!-- NOTES -->
            <b-col>
             <b-row>
              <b-col cols="6">
                <b>Race</b>
                <b-form-input v-model="character.race"></b-form-input>
              </b-col>
              <b-col cols="6">
                <b>Origin</b>
                <b-form-input v-model="character.race"></b-form-input>
              </b-col>
              <b-col cols="12">
                <b>Relationship</b>
                <b-form-textarea v-model="character.relationship" style="height: 4rem;">	
                </b-form-textarea>
              </b-col>
              <b-col>
                <b>Notes</b>
                <b-form-textarea v-model="character.notes" style="height: 25rem;">	
                </b-form-textarea>
              </b-col>
             </b-row>
            </b-col>
            
            <!-- GENERAL -->
            <b-col cols="3" style="min-width: 170px;" v-if="campaign && campaign.settings.showCharacterStats">
             <b-row>

              <b-col cols="6">
                <small>Current HP</small>
                <b-form-input v-model="character.currentHP" style="height: 1rem; width: 100%" class="mt-1"></b-form-input>
              </b-col>

              <b-col cols="6">
                <small>Max HP</small>
                <b-form-input v-model="character.maxHP" style="height: 1rem;  width: 100%" class="mt-1"></b-form-input>
              </b-col>

              <b-col cols="12" class="mb-1">
                  <div class="mt-1" :style="'overflow: hidden;border: solid gray 1px; height: 0.5rem; border-radius: 4px; background-color: ' + 'red' + ';'">
                      <div :style="'width: ' + (character.currentHP/character.maxHP) * 100 + '%; background-color: ' + 'green' +'; height: 100%'"></div>
                  </div>
              </b-col>

              <b-col cols="6">
                <small>Armor Class</small>
                <b-form-input v-model="character.armorClass"></b-form-input>
              </b-col>

              <b-col cols="6">
                <small>Speed</small>
                <b-form-input v-model="character.speed"></b-form-input>
              </b-col>

              <b-col cols="12">
                <hr/>
                Spellcasting

                <b-dropdown variant="dark" style="width:100%" :text="character.spellCasting">
                  <b-dropdown-item
                    v-for="item in castingStats"
                    :key="item"
                    @click="character.spellCasting = item"
                    >{{ item }}</b-dropdown-item
                  >
                </b-dropdown>
              </b-col>

              <b-col cols="12">
                <small>Spell Save DC :</small>
                <span style="float: right;">{{ spellSaveDC }}</span>
                <br>
                <small>Spell Attack Bonus :</small>
                <span style="float: right;">{{ spellAttackBonus }}</span>
              </b-col>

             </b-row>
            </b-col>
            
            <!-- STATS -->
            <b-col cols="4" class="pr-0" style="min-width: 260px;" v-if="campaign && campaign.settings.showCharacterStats"> 
              <b-row>

                <b-col cols="4" class="pr-0 text-left">
                  <div>
                    STR
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.strength">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.strength - 10) /2))}}
                    </div>
                      
                  </div>
                
                  <div>
                    DEX
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.dexterity">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.dexterity - 10) /2))}}
                    </div>
                      
                  </div>
                
                  <div>
                    CON
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.constitution">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.constitution - 10) /2))}}
                    </div>
                      
                  </div>
                
                  <div>
                    INT
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.intelligence">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.intelligence - 10) /2))}}
                    </div>
                      
                  </div>
                
                  <div>
                    WIS
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.wisdom">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.wisdom - 10) /2))}}
                    </div>
                      
                  </div>
                
                  <div>
                    CHA
                    <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="character.charisma">
                      
                    </b-form-input>
                    <div class="number">
                      {{numberFormat(Math.floor((character.charisma - 10) /2))}}
                    </div>
                      
                  </div>

                  
                </b-col>

                <b-col cols="8" class="pl-0">
                  <b-card class="text-left" body-class="p-1">
                    Saves
                   <div v-for="save in character.saves" :key="save.label" style="font-size: small;">

                      <b-form-checkbox v-model="save.value" plain style="height: 0.8rem">
                       <small> {{ save.label }} :</small>
                      </b-form-checkbox>
                      <small style="float:right; border-bottom: 2px solid black; border-radius: 50%; width: 1.3rem; position: relative; bottom: 0.8rem;" class="mr-2 text-center">
                        {{ numberFormat(getStatScaling(save.label) + (save.value ? character.proficiencyBonus : 0))}}
                      </small>

                      <hr class="mt-1 mb-0">
                   </div>
                   
                   Skills
                   <div v-for="skill in character.skills" :key="skill.label" style="font-size: small;">

                      <b-form-checkbox v-model="skill.value" plain style="height: 0.8rem">
                       <small> {{ skill.label }} :</small>
                      </b-form-checkbox>
                      <small style="float:right; border-bottom: 2px solid black; border-radius: 50%; width: 1.3rem; position: relative; bottom: 0.8rem;" class="mr-2 text-center">
                        {{ numberFormat(getStatScaling(skill.label) + (skill.value ? character.proficiencyBonus : 0))}}
                      </small>

                      <hr class="mt-1 mb-0">
                   </div>
                  </b-card>

                </b-col>

                <b-col cols="12">
                  <b-row>
                    <b-col cols="6">
                      <small>Proficiency Bonus</small>
                      <b-form-input style="height: 1.5rem;" v-model="character.proficiencyBonus"></b-form-input>
                    </b-col>
                    <b-col cols="6">
                      <small>Passive Perception:</small><br>
                      <span>{{passivePerception}}</span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
             
            </b-col>

          </b-row>
        </b-col>
        <b-col cols="4" v-if="campaign">
          <LinkList :linkList="character.links" :campaign="campaign" id="CharacterLinkModal"></LinkList>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import LinkList from "./LinkList.vue"

export default {
props: ["character", "campaign"],
data(){
  return {
    castingStats: [
      "None",
      "Intelligence",
      "Wisdom",
      "Charisma"
    ]
}},
components: {LinkList},
methods: {
  numberFormat(number){
    if(number > 0) return "+" + number;
    return number;
  },
  getStatScaling(label){
    switch (label) {
      case "Strength Save":
      case "Strength":
      case "Athletics": return Math.floor((this.character.strength - 10) / 2);

      case "Dexterity Save":
      case "Dexterity":
      case "Acrobatics":
      case "Sleight of Hand":
      case "Stealth": return Math.floor((this.character.dexterity - 10) / 2);

      case "Consitution Save": return Math.floor((this.character.constitution - 10) / 2);

      case "Intelligence Save":
      case "Intelligence":
      case "Arcana":
      case "History":
      case "Investigation":
      case "Nature":
      case "Religion": return Math.floor((this.character.intelligence - 10) / 2);

      case "Wisdom Save":
      case "Wisdom":
      case "Animal Handling":
      case "Insight":
      case "Medicine":
      case "Perception":
      case "Survival":  return Math.floor((this.character.wisdom - 10) / 2);

      case "Charisma Save":
      case "Charisma":
      case "Deception":
      case "Intimidation":
      case "Performance":
      case "Persuasion": return Math.floor((this.character.charisma - 10) / 2);
    }
  }
},
computed: {
  passivePerception(){
    var perception = this.character.skills.find(x => x.label == "Perception");
    return 8 + this.getStatScaling("Perception") + (perception.value ? this.character.proficiencyBonus : 0);
  },
  spellSaveDC(){
    if(this.character.spellCasting == "None") return 0;

    return 8 + this.getStatScaling(this.character.spellCasting) +  this.character.proficiencyBonus;
  },

  spellAttackBonus(){
    if(this.character.spellCasting == "None") return 0;

    return this.numberFormat(this.getStatScaling(this.character.spellCasting) +  this.character.proficiencyBonus);
  }
}
};
</script>

<style>
.number {
  position: relative;
  text-align: center;
  right: 1.5rem;
  top: -1.8rem;
  float: right;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  border-bottom: 2px solid black;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>