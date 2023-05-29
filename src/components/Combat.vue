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
        <b-row :key="reload">
            <b-col class="border-right text-right">
                <div>
                    <b-button 
                    variant="success" 
                    class="mr-2"
                    @click="addAlly()">Add Ally</b-button>Allies
                </div>

                <div v-for="(ally, index) in combat.players" :key="index + '_ally'" class="border-top mt-2">
                    <span v-for="(save, j) in ally.deathsaves" :key="index + '-' + j + '_dSave'">
                        <b-button 
                            v-if="save === null"
                            size="xs" 
                            class="p-0 mr-1"
                            style="width: 1.4rem; height: 1.4rem;"
                            pill
                            variant="dark"
                            @click="deathSaveNext(index,j,save)"
                            >
                           <div> <i class="fas fa-skull"></i></div>
                        </b-button>
                        <b-button 
                            v-else-if="save === true"
                            size="xs" 
                            class="p-0 mr-1"
                            style="width: 1.4rem; height: 1.4rem;"
                            pill
                            variant="success"
                            @click="deathSaveNext(index,j,save)"
                            >
                           <div> <i class="fas fa-check"></i></div>
                        </b-button>
                        <b-button 
                            v-else-if="save === false"
                            size="xs" 
                            class="p-0 mr-1"
                            style="width: 1.4rem; height: 1.4rem;"
                            pill
                            variant="danger"
                            @click="deathSaveNext(index,j,save)"
                            >
                            <div><i class="fas fa-times"></i></div>
                        </b-button>
                    </span>
                    <b-form-input v-model="ally.name" class="text-right" style="margin-left: auto; margin-right: 0; width: 10rem;"></b-form-input>
                </div>
            </b-col>

            <b-col class="border-left text-left">
                <div >Enemies
                    <b-button 
                    variant="dark" 
                    class="ml-2"
                    @click="addEnemy()">Add Enemy</b-button>
                </div>
                
                <div v-for="(enemy, index) in combat.enemies" :key="index + '_enemy'" class="border-top mt-2">
                    <br>
                    <b-form-input style="width: 10rem;" v-model="enemy.name" ></b-form-input>
                </div>
            </b-col>
        </b-row>
    </div>
</template> 

<script>
import _ from "lodash";

export default {
  props: ["combat"],
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
            notes: ""
        }
    };
  },
  created() {
  },
  methods: {
    addAlly(){
        this.combat.players.push(_.cloneDeep(this.allyTemplate));
    },
    addEnemy(){
        this.combat.enemies.push(_.cloneDeep(this.enemyTemplate));
    },
    deathSaveNext(i, j, save){
        if(save === null) {this.combat.players[i].deathsaves[j] = true; return}
        if(save === true) {this.combat.players[i].deathsaves[j] = false; return}
        if(save === false) {this.combat.players[i].deathsaves[j] = null; return}
        this.reloadView();
    },
    reloadView(){
        this.reload = !this.reload;
    }
  },
  computed: {
    turnOrder(){
        let allies = this.combat.players.map(x => ({name: x.name, initiative: x.initiative, isAlly: true}));
        let enemies = this.combat.enemies.map(x => ({name: x.name, initiative: x.initiative, isAlly: false}));
        let sortedList = allies.concat(enemies).sort(x => x.initiative);
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
