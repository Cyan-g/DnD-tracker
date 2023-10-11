<template>
    <div >
        <h5>Spell Tome</h5>
        <hr/>
        <!-- Filters -->
        <b-row>
            <b-col lg="3">
                <b>Search</b><br>
                <b-form-input 
                    :class="getStylingClass('input')"    
                    v-model="searchQuery" placeholder="type to search"></b-form-input>
            </b-col>
            <b-col lg="3">
                <b-button 
                    variant="outline-success"
                    class="mb-1 mt-4"
                    style="width: 100%;"
                    @click="addSpell()"> 
                    <i class="fas fa-plus"></i> Add Spell
                </b-button>
            </b-col>
            <b-col lg="3">
                <b-button 
                    variant="outline-primary"
                    class="mb-1 mt-4"
                    style="width: 100%;"
                    @click="refreshSlots()"> 
                    <i class="fas fa-sync"></i> Refresh Spell Slots
                </b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="3">
                <b>School</b><br>
                <b-dropdown style="width: 100%" variant="dark" :text="searchSchool">
                    <b-dropdown-item
                        v-for="item in spellSchools"
                        :key="item"
                        @click="searchSchool = item"
                        >{{ item }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>

            <b-col lg="3">
                <b>Type</b><br>
                <b-dropdown style="width: 100%" variant="dark" :text="searchType">
                    <b-dropdown-item
                        v-for="item in spellType"
                        :key="item"
                        @click="searchType = item"
                        >{{ item }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>

            <b-col lg="3">
                <b>Cast Time</b><br>
                <b-dropdown style="width: 100%" variant="dark" :text="searchAction">
                    <b-dropdown-item
                        v-for="item in spellActions"
                        :key="item"
                        @click="searchAction = item"
                        >{{ item }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>

            <b-col lg="3">
                <b>Target</b> <br>
                <b-dropdown style="width: 100%" variant="dark" :text="searchArea">
                    <b-dropdown-item
                        v-for="item in spellArea"
                        :key="item"
                        @click="searchArea = item"
                        >{{ item }}</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>
        </b-row>

        <hr>

        <b-row>
            <b-col lg="4">
             
                <b-card class="mb-1" no-header body-class="p-1 bg-dark text-light" v-if="filteredSpells.filter(x => x.level == 'Cantrip').length > 0">
                    <h4 class="ml-2">Cantrips</h4>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == 'Cantrip')" 
                        :key="'cantrip_' + index"
                        :getStylingClass="getStylingClass"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        @delete="deleteSpell(spell)"
                        ></Spell>
                </b-card>
            </b-col>
            
            <b-col lg="4"  
                v-for="level in 9" 
                :key="'_'+level" >
                <b-card 
                    class="mb-1" 
                    no-header 
                    body-class="p-1 bg-dark text-light" 
                    v-show="filteredSpells.filter(x => x.level == 'Level '+ level).length > 0">
                    <b-row>
                        <b-col cols="5">
                            <h4 class="ml-2">Level {{ level }}</h4>
                        </b-col>
                        <b-col>
                            Total
                            <b-form-input :class="getStylingClass('input')" style="height: 1.3rem;" v-model="campaign['slots' + level]"></b-form-input>
                        </b-col>
                        <b-col>
                            Remaining
                            <b-form-input :class="getStylingClass('input')" style="height: 1.3rem;" v-model="campaign['used' + level]"></b-form-input>
                        </b-col>
                    </b-row>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == ('Level '+ level))" 
                        :key="level + '+' + index"
                        :getStylingClass="getStylingClass"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        @delete="deleteSpell(spell)"
                        ></Spell>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import _ from "lodash";

export default {
  props: ["campaign", "getStylingClass"],
  data() {
    return {
        searchQuery: "",
        searchSchool: "Any",
        searchAction: "Any",
        searchArea: "Any",
        searchType: "Any",
        spellSchools: [
            "Any",
            "Conjuration",
            "Necromancy",
            "Evocation",
            "Abjuration",
            "Transmutation",
            "Divination",
            "Enchantment",
            "Illusion",
        ],
        spellActions: [
            "Any",
            "Action",
            "Bonus Action",
            "Reaction"
        ],
        spellArea: [
            "Any",
            "Targeted",
            "Cone",
            "Cube",
            "Cylinder",
            "Line",
            "Sphere",
        ],
        spellType: [
            "Any",
            "Utility",
            "Spell Attack",
            "STR Save",
            "DEX Save",
            "CON Save",
            "INT Save",
            "WIS Save",
            "CHA Save",
        ],
        spellLevels: [
            "Cantrip",
            "Level 1",
            "Level 2",
            "Level 3",
            "Level 4",
            "Level 5",
            "Level 6",
            "Level 7",
            "Level 8",
            "Level 9",
        ],
        defaultSpell: {
            name: "New Spell",
            description: "",
            type: "Any",
            cost: "",
            prepared: false,
            concentration: false,
            ritual: false,
            verbal: false,
            somatic: false,
            material: false,
            school: "Any",
            castingTime: "Action",
            areaType: "Targeted",
            areaSize: 0,
            range: "self",
            duration: "Instant",
            level: "Cantrip",
        }
    };
  },
  created() {
    if(this.campaign.spells.length == 0)
        this.campaign.spells.push(_.cloneDeep(this.defaultSpell));
  },
  methods: {
    clearFilter(){
        this.searchQuery = "";
    },
    deleteSpell(spell){
        if(!confirm("Delete Spell: " + spell.name + " ?")) return;

        let index = this.campaign.spells.findIndex(x => x.name == spell.name && x.description == spell.description);
        this.campaign.spells.splice(index, 1);

        if(this.campaign.spells.length == 0)
            this.campaign.spells.push(_.cloneDeep(this.defaultSpell));
    },
    addSpell(){
        this.searchQuery = "";
        let spell = _.cloneDeep(this.defaultSpell);
        spell.name += " " + this.campaign.spells.length;
        this.campaign.spells.unshift(spell);
    },
    refreshSlots(){
        for (var i = 1; i <= 9; i++)
            this.campaign['used' + i] = this.campaign['slots' + i];
    }
  },
  computed: {
    filteredSpells(){
        return this.campaign.spells.filter(x => 
            (this.searchSchool == "Any" || x.school == this.searchSchool) &&
            (this.searchType == "Any" || x.type == this.searchType) &&
            (this.searchAction == "Any" || x.castingTime == this.searchAction) &&
            (this.searchArea == "Any" || x.area == this.searchArea) &&
            (this.searchQuery.length == 0 || x.description.toLowerCase().includes(this.searchQuery.toLowerCase()) || x.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        )
    }
  },
};
</script>