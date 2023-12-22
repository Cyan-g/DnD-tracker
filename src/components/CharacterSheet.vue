<template>
    <div v-if="campaign && campaign.character">
        <b-row>
            <b-col lg="3">
                <b>Name</b>
                <b-form-input 
                    :class="getStylingClass('input')"
                    v-model="campaign.character.name">
                </b-form-input>
            </b-col>
            <b-col lg="3">
                <b>Race</b>
                <b-form-input 
                    :class="getStylingClass('input')"
                    v-model="campaign.character.race">
                </b-form-input>
            </b-col>
            <b-col lg="3">
                <b>Class</b>
                <b-form-input 
                    :class="getStylingClass('input')"
                    v-model="campaign.character.class">
                </b-form-input>
            </b-col>
            <b-col lg="3">
                <br>
                <b-button 
                    :class="getStylingClass('buttonReverse')">
                    <i class="fas fa-campground"></i> Long Rest
                </b-button>
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <!-- STATS -->
            <b-col lg="4" class="pr-0 text-left" style="min-width: 260px;"> 
                <div class="d-inline-block" style="width: 260px;">
                    STR
                    <b-input-group style="width:3rem">
                        <b-form-input 
                            type="number" 
                            max="20" 
                            :class="getStylingClass('input')"
                            style="width: 2.8rem; height: 2.8rem; border-radius: 0 50%;" 
                            v-model="campaign.character.strength">
                        </b-form-input>
                        <template #append>
                            <div class="number">
                                {{numberFormat(Math.floor((campaign.character.strength - 10) /2))}}
                            </div>
                        </template>

                    </b-input-group>
                    <b-card class="d-block" style="width: 3rem;"></b-card>
                </div>
                <!-- <b-row class="text-left">
                    <b-col lg="4" class="pr-0 text-left">
               
                    
                    <div>
                        DEX
                        <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="campaign.character.dexterity">
                        
                        </b-form-input>
                        <div class="number">
                        {{numberFormat(Math.floor((campaign.character.dexterity - 10) /2))}}
                        </div>
                        
                    </div>
                    
                    <div>
                        CON
                        <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="campaign.character.constitution">
                        
                        </b-form-input>
                        <div class="number">
                        {{numberFormat(Math.floor((campaign.character.constitution - 10) /2))}}
                        </div>
                        
                    </div>
                    
                    <div>
                        INT
                        <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="campaign.character.intelligence">
                        
                        </b-form-input>
                        <div class="number">
                        {{numberFormat(Math.floor((campaign.character.intelligence - 10) /2))}}
                        </div>
                        
                    </div>
                    
                    <div>
                        WIS
                        <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="campaign.character.wisdom">
                        
                        </b-form-input>
                        <div class="number">
                        {{numberFormat(Math.floor((campaign.character.wisdom - 10) /2))}}
                        </div>
                        
                    </div>
                    
                    <div>
                        CHA
                        <b-form-input type="number" max="20" class="mb-1 mr-0" style="width: 2.8rem; height: 2.8rem; border-radius: 50%;" v-model="campaign.character.charisma">
                        
                        </b-form-input>
                        <div class="number">
                        {{numberFormat(Math.floor((campaign.character.charisma - 10) /2))}}
                        </div>
                        
                    </div>

                    
                    </b-col>

                    <b-col lg="8" class="pl-0">
                    <b-card class="text-left" body-class="p-1">
                        Saves
                        <div v-for="save in campaign.character.saves" :key="save.label" style="font-size: small;">

                        <b-form-checkbox v-model="save.value" plain style="height: 0.8rem">
                            <small> {{ save.label }} :</small>
                        </b-form-checkbox>
                        <small style="float:right; border-bottom: 2px solid black; border-radius: 50%; width: 1.3rem; position: relative; bottom: 0.8rem;" class="mr-2 text-center">
                            {{ numberFormat(getStatScaling(save.label) + (save.value ? campaign.character.proficiencyBonus : 0))}}
                        </small>

                        <hr class="mt-1 mb-0">
                        </div>
                        
                        Skills
                        <div v-for="skill in campaign.character.skills" :key="skill.label" style="font-size: small;">

                        <b-form-checkbox v-model="skill.value" plain style="height: 0.8rem">
                            <small> {{ skill.label }} :</small>
                        </b-form-checkbox>
                        <small style="float:right; border-bottom: 2px solid black; border-radius: 50%; width: 1.3rem; position: relative; bottom: 0.8rem;" class="mr-2 text-center">
                            {{ numberFormat(getStatScaling(skill.label) + (skill.value ? campaign.character.proficiencyBonus : 0))}}
                        </small>

                        <hr class="mt-1 mb-0">
                        </div>
                    </b-card>

                    </b-col>

                    <b-col lg="12">
                    <b-row>
                        <b-col lg="6">
                        <small>Proficiency Bonus</small>
                        <b-form-input style="height: 1.5rem;" v-model="campaign.character.proficiencyBonus"></b-form-input>
                        </b-col>
                        <b-col lg="6">
                        <small>Passive Perception:</small><br>
                        <span>{{passivePerception}}</span>
                        </b-col>
                    </b-row>
                    </b-col>
                </b-row> -->
            </b-col>
            <!-- NOTES -->
            <!-- <b-col>
                <b>Notes</b>
                <b-form-textarea 
                    :class="getStylingClass('input')"
                    v-model="campaign.character.notes" style="height: 25rem;">	
                </b-form-textarea>
            </b-col> -->
            
            <!-- GENERAL -->
            <b-col lg="3" style="min-width: 170px;">
                <b-row>
                    <b-col lg="6">
                        <small>Current HP</small>
                        <b-form-input v-model="campaign.character.currentHP" style="height: 1rem; width: 100%" class="mt-1"></b-form-input>
                    </b-col>

                    <b-col lg="6">
                        <small>Max HP</small>
                        <b-form-input v-model="campaign.character.maxHP" style="height: 1rem;  width: 100%" class="mt-1"></b-form-input>
                    </b-col>

                    <b-col lg="12" class="mb-1">
                        <div class="mt-1" :style="'overflow: hidden;border: solid gray 1px; height: 0.5rem; border-radius: 4px; background-color: ' + 'red' + ';'">
                            <div :style="'width: ' + (campaign.character.currentHP/campaign.character.maxHP) * 100 + '%; background-color: ' + 'green' +'; height: 100%'"></div>
                        </div>
                    </b-col>

                    <b-col lg="6">
                        <small>Armor Class</small>
                        <b-form-input v-model="campaign.character.armorClass"></b-form-input>
                    </b-col>

                    <b-col lg="6">
                        <small>Speed</small>
                        <b-form-input v-model="campaign.character.speed"></b-form-input>
                    </b-col>

                    <b-col lg="12">
                        <hr/>
                        Spellcasting

                        <b-dropdown variant="dark" style="width:100%" :text="campaign.character.spellCasting">
                        <b-dropdown-item
                            v-for="item in castingStats"
                            :key="item"
                            @click="campaign.character.spellCasting = item"
                            >{{ item }}</b-dropdown-item
                        >
                        </b-dropdown>
                    </b-col>

                    <b-col lg="12">
                        <small>Spell Save DC :</small>
                        <span style="float: right;">{{ spellSaveDC }}</span>
                        <br>
                        <small>Spell Attack Bonus :</small>
                        <span style="float: right;">{{ spellAttackBonus }}</span>
                    </b-col>
                </b-row>
            </b-col>
            
       

        </b-row>
    </div>
  </template>
  
  <script>
  export default {
  props: ["campaign", "getStylingClass"],
  created(){
    if(this.campaign.character == null)
        this.campaign.character =  {
            name: "New Character",
            notes: "",
            race: "Human",
            class: "Level 1 Fighter",
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
            }
  },
  data(){
    return {
      castingStats: [
        "None",
        "Intelligence",
        "Wisdom",
        "Charisma"
      ]
  }},
  methods: {
    numberFormat(number){
      if(number > 0) return "+" + number;
      return number;
    },
    getStatScaling(label){
      switch (label) {
        case "Strength Save":
        case "Strength":
        case "Athletics": return Math.floor((this.campaign.character.strength - 10) / 2);
  
        case "Dexterity Save":
        case "Dexterity":
        case "Acrobatics":
        case "Sleight of Hand":
        case "Stealth": return Math.floor((this.campaign.character.dexterity - 10) / 2);
  
        case "Consitution Save": return Math.floor((this.campaign.character.constitution - 10) / 2);
  
        case "Intelligence Save":
        case "Intelligence":
        case "Arcana":
        case "History":
        case "Investigation":
        case "Nature":
        case "Religion": return Math.floor((this.campaign.character.intelligence - 10) / 2);
  
        case "Wisdom Save":
        case "Wisdom":
        case "Animal Handling":
        case "Insight":
        case "Medicine":
        case "Perception":
        case "Survival":  return Math.floor((this.campaign.character.wisdom - 10) / 2);
  
        case "Charisma Save":
        case "Charisma":
        case "Deception":
        case "Intimidation":
        case "Performance":
        case "Persuasion": return Math.floor((this.campaign.character.charisma - 10) / 2);
      }
    }
  },
  computed: {
    passivePerception(){
      var perception = this.campaign.character.skills.find(x => x.label == "Perception");
      return 8 + this.getStatScaling("Perception") + (perception.value ? this.campaign.character.proficiencyBonus : 0);
    },

    spellSaveDC(){
      if(this.campaign.character.spellCasting == "None") return 0;
  
      return 8 + this.getStatScaling(this.campaign.character.spellCasting) +  this.campaign.character.proficiencyBonus;
    },
  
    spellAttackBonus(){
      if(this.campaign.character.spellCasting == "None") return 0;
  
      return this.numberFormat(this.getStatScaling(this.campaign.character.spellCasting) +  this.campaign.character.proficiencyBonus);
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