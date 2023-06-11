<template>
    <div >
        <h5>Spell Tome</h5>
        <hr/>
        <!-- Filters -->
        <b-row>
            <b-col cols="3">
                <b>Search</b><br>
                <b-form-input v-model="searchQuery" placeholder="type to search"></b-form-input>
            </b-col>
            <b-col cols="3">
                <b-button 
                    variant="outline-success"
                    class="mb-1 mt-4"
                    style="width: 100%;"
                    @click="addSpell()"> 
                    <i class="fas fa-plus"></i> Add Spell
                </b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="3">
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

            <b-col cols="3">
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

            <b-col cols="3">
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

            <b-col cols="3">
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
            <b-col cols="4">
             
                <b-card class="mb-1" no-header body-class="p-1 bg-dark text-light" v-if="filteredSpells.filter(x => x.level == 'Cantrip').length > 0">
                    <h4 class="ml-2">Cantrips</h4>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == 'Cantrip')" 
                        :key="'cantrip_' + index"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        ></Spell>
                </b-card>

                <b-card class="mb-1" v-for="level in 2" :key="'_'+level" no-header body-class="p-1 bg-dark text-light" v-show="filteredSpells.filter(x => x.level == 'Level '+ level).length > 0">
                    <h4 class="ml-2">Level {{ level }}</h4>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == ('Level '+ level))" 
                        :key="level + '+' + index"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        ></Spell>
                </b-card>

            </b-col>

            <b-col cols="4">
                <b-card class="mb-1" v-for="level in 3" :key="'_'+(level +2)" no-header body-class="p-1 bg-dark text-light" v-show="filteredSpells.filter(x => x.level == 'Level '+ (level +2)).length > 0">
                    <h4 class="ml-2">Level {{ (level +2) }}</h4>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == ('Level '+ (level +2)))" 
                        :key="(level +2) + '+' + index"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        ></Spell>
                </b-card>
            </b-col>

            <b-col cols="4">
                <b-card class="mb-1" v-for="level in 4" :key="'_'+(level + 5)" no-header body-class="p-1 bg-dark text-light" v-show="filteredSpells.filter(x => x.level == 'Level '+ (level + 5)).length > 0">
                    <h4 class="ml-2">Level {{ (level + 5) }}</h4>
                    <hr>
                    <Spell 
                        v-for="(spell, index) in filteredSpells.filter(x => x.level == ('Level '+ (level + 5)))" 
                        :key="(level + 5) + '+' + index"
                        :spell="spell"
                        :spellSchools="spellSchools"
                        :spellActions="spellActions"
                        :spellArea="spellArea"
                        :spellType="spellType"
                        :spellLevels="spellLevels"
                        ></Spell>
                </b-card>
            </b-col>

        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import Spell from "./Spell.vue";

export default {
  props: ["campaign"],
  components: {Spell},
  data() {
    return {
        searchQuery: "",
        searchSchool: "Other",
        searchAction: "Other",
        searchArea: "Other",
        searchType: "Other",
        spellSchools: [
            "Conjuration",
            "Necromancy",
            "Evocation",
            "Abjuration",
            "Transmutation",
            "Divination",
            "Enchantment",
            "Illusion",
            "Other"
        ],
        spellActions: [
            "Action",
            "Bonus Action",
            "Reaction",
            "Ritual",
            "Other"
        ],
        spellArea: [
            "Targeted",
            "Cone",
            "Cube",
            "Cylinder",
            "Line",
            "Sphere",
            "Other",
        ],
        spellType: [
            "Other",
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
            type: "Other",
            cost: "",
            prepared: false,
            concentration: false,
            verbal: false,
            somatic: false,
            material: false,
            school: "Other",
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
    deleteSpell(index, name){
        if(!confirm("Delete Spell: " + name + " ?")) return;

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
  },
  computed: {
    filteredSpells(){
        if(this.searchQuery.length == 0) return this.campaign.spells;
        else return this.campaign.spells.filter(x => 
            (this.searchSchool == "Other" || x.school == this.searchSchool) &&
            (this.searchType == "Other" || x.type == this.searchType) &&
            (this.searchAction == "Other" || x.castingTime == this.searchAction) &&
            (this.searchArea == "Other" || x.area == this.searchArea) &&
            (x.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            x.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        )
    }
  },
};
</script>