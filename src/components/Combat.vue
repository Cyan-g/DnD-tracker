<template>
    <div>
        <h5>Combat</h5>
        <hr>
        <div class="text-center"><b>Turn order</b></div>
        <div class="text-center">
            <b-badge 
            class="mr-1 ml-1" 
            v-for="(entity, i) in turnOrder" 
            :key="i + '_turns'"
            :variant="entity.isAlly ? 'success' : 'dark'">
            {{ entity.name }} <br> {{ entity.initiative }}
        </b-badge>
        </div>
        <hr>
        <b-row >
            <b-col class="border-right text-right">
                <div>
                    <b-button 
                        variant="success" 
                        class="mr-2"
                        @click="addAlly()">Add Ally
                    </b-button>
                    Allies
                </div>

                <div v-for="(ally, index) in campaign.combat.players" :key="index + '_ally'" class="border-top mt-2">
                    <b-button 
                        v-for="(save, j) in ally.deathsaves" :key="index + '-' + j + '_dSave' + reload" 
                        size="xs" 
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        v-b-popover.hover.top="'death save ' + (j +1)"
                        pill
                        :variant="deathSaveVariant(save)"
                        @click="deathSaveNext(index,j,save)"
                        >
                        <i class="fas fa-skull"></i>
                    </b-button>

                    <b-button 
                        @click="ally.stunned = !ally.stunned"
                        :key="ally.stunned + '_stunned'"
                        v-b-popover.hover.top="'stunned'"
                        :variant="ally.stunned ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1 ml-2"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-star"></i>
                    </b-button>

                    <b-button 
                        @click="ally.incapacitated = !ally.incapacitated"
                        :key="ally.incapacitated + '_incapacitated'"
                        v-b-popover.hover.top="'incapacitated'"
                        :variant="ally.incapacitated ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-link"></i>
                    </b-button>

                    <b-button 
                        @click="ally.blinded = !ally.blinded"
                        :key="ally.blinded + '_blinded'"
                        v-b-popover.hover.top="'blinded'"
                        :variant="ally.blinded ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-eye-slash"></i>
                    </b-button>

                    <b-button 
                        @click="ally.deafened = !ally.deafened"
                        :key="ally.deafened + '_deafened'"
                        v-b-popover.hover.top="'deafened'"
                        :variant="ally.deafened ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-deaf"></i>
                    </b-button>

                    <b-button 
                        @click="ally.charmed = !ally.charmed"
                        :key="ally.charmed + '_charmed'"
                        v-b-popover.hover.top="'charmed'"
                        :variant="ally.charmed ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-grin-hearts"></i>
                    </b-button>

                    <b-button 
                        @click="ally.poisoned = !ally.poisoned"
                        :key="ally.poisoned + '_poisoned'"
                        v-b-popover.hover.top="'poisoned'"
                        :variant="ally.poisoned ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-tint"></i>
                    </b-button>
                    
                    <b-row style="margin-left: auto; margin-right: 0; width: 100%;">
                        <b-col cols="2">
                            <b-button 
                                pill 
                                v-b-popover.hover.top="'remove'"
                                variant="outline-danger"
                                @click="campaign.combat.players.splice(index, 1)"
                                >
                                <i class="fas fa-skull"></i>
                            </b-button>
                        </b-col>
                        <b-col cols="4" >
                            <b-row>
                                <b-col cols="12">
                                    <b-form-input
                                        v-b-popover.hover.top="'initiative'"
                                        label="initiative" style="height: 1.8rem;" v-model="ally.initiative"></b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input 
                                        v-b-popover.hover.top="'current HP'"
                                        style="height: 1.4rem" v-model="ally.hp" class="mt-1 text-right">
                                    </b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input 
                                        v-b-popover.hover.top="'max HP'"
                                        style="height: 1.4rem" v-model="ally.maxHp" class="mt-1 text-right">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>

                        <b-col cols="6">
                            <b-row>
                                <b-col cols="12">
                                    <b-form-input v-model="ally.name" class="mt-1 text-right" ></b-form-input>
                                </b-col>
                               
                                <b-col cols="12">
                                    <div class="mt-1" :style="'overflow: hidden;border: solid gray 1px; height: 0.5rem; border-radius: 4px; background-color: ' + 'red' + ';'">
                                        <div :key="ally.hp + ally.maxHp + '_hp_' + index" :style="'width: ' + (ally.hp/ally.maxHp) * 100 + '%; background-color: ' + 'green' +'; height: 100%'"></div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="3"></b-col>
                        <b-col cols="9">
                            <b-form-textarea class="mt-1" v-model="ally.notes"></b-form-textarea>
                        </b-col>
                    </b-row>
                </div>
            </b-col>

            <b-col class="border-left text-left">
                <div >Enemies
                    <b-button 
                    variant="dark" 
                    class="ml-2"
                    @click="addEnemy()">Add Enemy</b-button>
                </div>
                
                <div v-for="(enemy, index) in campaign.combat.enemies" :key="index + '_ally'" class="border-top mt-2">
                    <b-button 
                        @click="enemy.stunned = !enemy.stunned"
                        :key="enemy.stunned + '_stunned'"
                        v-b-popover.hover.top="'stunned'"
                        :variant="enemy.stunned ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1 ml-2"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-star"></i>
                    </b-button>

                    <b-button 
                        @click="enemy.incapacitated = !enemy.incapacitated"
                        :key="enemy.incapacitated + '_incapacitated'"
                        v-b-popover.hover.top="'incapacitated'"
                        :variant="enemy.incapacitated ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-link"></i>
                    </b-button>

                    <b-button 
                        @click="enemy.blinded = !enemy.blinded"
                        :key="enemy.blinded + '_blinded'"
                        v-b-popover.hover.top="'blinded'"
                        :variant="enemy.blinded ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-eye-slash"></i>
                    </b-button>

                    <b-button 
                        @click="enemy.deafened = !enemy.deafened"
                        :key="enemy.deafened + '_deafened'"
                        v-b-popover.hover.top="'deafened'"
                        :variant="enemy.deafened ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-deaf"></i>
                    </b-button>

                    <b-button 
                        @click="enemy.charmed = !enemy.charmed"
                        :key="enemy.charmed + '_charmed'"
                        v-b-popover.hover.top="'charmed'"
                        :variant="enemy.charmed ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-grin-hearts"></i>
                    </b-button>

                    <b-button 
                        @click="enemy.poisoned = !enemy.poisoned"
                        :key="enemy.poisoned + '_poisoned'"
                        v-b-popover.hover.top="'poisoned'"
                        :variant="enemy.poisoned ? 'info' : 'dark'"
                        pill
                        size="xs"
                        class="p-0 mr-1"
                        style="width: 1.4rem; height: 1.4rem;"
                        >
                        <i class="fas fa-tint"></i>
                    </b-button>
                    
                    <b-row style="margin-left: 0; margin-right: auto; width: 100%;">
                        <b-col cols="6">
                            <b-row>
                                <b-col cols="12">
                                    <b-form-input v-model="enemy.name" class="mt-1 text-right" ></b-form-input>
                                </b-col>
                               
                                <b-col cols="12" v-if="campaign.settings.showEnemyHP">
                                    <div class="mt-1" :style="'overflow: hidden;border: solid gray 1px; height: 0.5rem; border-radius: 4px; background-color: ' + 'red' + ';'">
                                        <div :key="enemy.hp + enemy.maxHp + '_hp_' + index" :style="'float:right; width: ' + (enemy.hp/enemy.maxHp) * 100 + '%; background-color: ' + 'green' +'; height: 100%'"></div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>

                        <b-col cols="4" v-if="campaign.settings.showEnemyHP">
                            <b-row>
                                <b-col cols="12">
                                    <b-form-input
                                        v-b-popover.hover.top="'initiative'"
                                        label="initiative" style="height: 1.8rem;" v-model="enemy.initiative"></b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input 
                                        v-b-popover.hover.top="'current HP'"
                                        style="height: 1.4rem" v-model="enemy.hp" class="mt-1 text-right">
                                    </b-form-input>
                                </b-col>
                                <b-col cols="6">
                                    <b-form-input 
                                        v-b-popover.hover.top="'max HP'"
                                        style="height: 1.4rem" v-model="enemy.maxHp" class="mt-1 text-right">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </b-col>

                        <b-col cols="2">
                            <b-button 
                                pill 
                                v-b-popover.hover.top="'remove'"
                                variant="outline-danger"
                                @click="campaign.combat.enemies.splice(index, 1)"
                                >
                                <i class="fas fa-skull"></i>
                            </b-button>
                        </b-col>
                        <b-col cols="9">
                            <b-form-textarea class="mt-1" v-model="enemy.notes"></b-form-textarea>
                        </b-col>
                        <b-col cols="3"></b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </div>
</template> 

<script>
import _ from "lodash";

export default {
  props: ["campaign"],
  components: {},
  data() {
    return {
        reload: false,
        allyTemplate: {
            name: "new ally",
            deathsaves: [null, null, null],
            initiative: 10,
            maxHp: 20,
            hp: 20,
            stunned: false,
            incapacitated: false,
            blinded: false,
            deafened: false,
            charmed: false,
            poisoned: false,
            notes: ""
        },
        enemyTemplate: {
            name: "new enemy",
            initiative: 10,
            maxHp: 20,
            hp: 20,
            stunned: false,
            incapacitated: false,
            blinded: false,
            deafened: false,
            charmed: false,
            poisoned: false,
            notes: ""
        }
    };
  },
  created() {
  },
  methods: {
    addAlly(){
        this.campaign.combat.players.push(_.cloneDeep(this.allyTemplate));
    },
    addEnemy(){
        this.campaign.combat.enemies.push(_.cloneDeep(this.enemyTemplate));
    },
    deathSaveVariant(save){
        if(save === null) return "dark"
        if(save === true) return "success"
        if(save === false) return "danger"
    },
    deathSaveNext(i, j, save){
        if(save === null) this.campaign.combat.players[i].deathsaves[j] = true
        else if(save === true) this.campaign.combat.players[i].deathsaves[j] = false
        else if(save === false) this.campaign.combat.players[i].deathsaves[j] = null
        this.reloadView();
    },
    reloadView(){
        this.reload = !this.reload;
    }
  },
  computed: {
    turnOrder(){
        let allies = this.campaign.combat.players.map(x => ({name: x.name, initiative: x.initiative, isAlly: true}));
        let enemies = this.campaign.combat.enemies.map(x => ({name: x.name, initiative: x.initiative, isAlly: false}));
        let sortedList = allies.concat(enemies).sort(    
            function (a, b) {
                return b.initiative - a.initiative;
            }
        );
        return sortedList;
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
