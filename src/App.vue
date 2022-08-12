<template>
  <div id="app">
    <b-card>
      <h1>Damage Calculator</h1>
    </b-card>
    <hr />
    <!-- WEAPON MODAL -->
    <b-modal title="Weapon List" id="weaponModal" hideFooter>
      <b-row class="mb-2">
        <b-col>
          <b-input-group prepend="Search">
            <b-form-input
              v-model="info.filter"
              type="text"
            ></b-form-input> </b-input-group
        ></b-col>
      </b-row>
      <b-row :key="info.filter" v-if="weapons">
        <b-col
          v-for="(weapon, index) in weapons[info.weaponType].filter(
            (x) => !info.filter || x.label.includes(info.filter)
          )"
          :key="index"
          cols="6"
        >
          <b-input-group class="mb-1">
            <b-button @click="loadWeapon(weapon)" style="width: 70%">{{
              weapon.label
            }}</b-button></b-input-group
          >
        </b-col>
      </b-row>
    </b-modal>
    <!-- SAVE MODAL -->
    <b-modal title="Saved Configs" id="saveModal" hideFooter>
      <b-row class="mb-2">
        <b-col>
          <b-input-group prepend="Title of current setup">
            <b-form-input v-model="info.title" type="text"></b-form-input>
            <b-button :disabled="!info.title" @click="saveSetup()" class="ml-1"
              >Save</b-button
            ></b-input-group
          ></b-col
        >
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <b-input-group prepend="Search">
            <b-form-input
              v-model="info.filter"
              type="text"
            ></b-form-input> </b-input-group
        ></b-col>
      </b-row>
      <b-row :key="info.filter" v-if="saves">
        <b-col
          v-for="(save, index) in saves.filter(
            (x) => !info.filter || x.title.includes(info.filter)
          )"
          :key="index"
          cols="6"
        >
          <b-input-group class="mb-1">
            <b-button
              @click="
                info = save;
                $bvModal.hide('saveModal');
              "
              style="width: 70%"
              >{{ save.title }}</b-button
            >
            <b-button
              variant="dark"
              @click="deleteSetup(index)"
              style="width: 20%"
              ><i class="fas fa-times"></i></b-button
          ></b-input-group>
        </b-col>
      </b-row>
    </b-modal>
    <!-- MAIN INTERFACE -->
    <b-card v-if="info">
      <b-row>
        <!-- WEAPON -->
        <b-col style="border-right: solid white 1px">
          <h5>Weapon</h5>
          <b-dropdown style="width:100%" :text="info.weaponType">
            <b-dropdown-item
              v-for="item in data.weaponArray"
              :key="item"
              @click="info.weaponType = item"
              >{{ item }}</b-dropdown-item
            >
          </b-dropdown>
          <b-button style="width:100%; margin-top: 1rem" @click="showModal()"
            >Choose Weapon</b-button
          >
          {{ info.weaponName }}
          <br />
          <hr />
          Raw Damage
          <b-form-input v-model="info.raw" type="number"></b-form-input>
          Element Damage
          <b-form-input v-model="info.element" type="number"></b-form-input>
          <b-dropdown
            :disabled="!info.element"
            style="width:100%"
            :text="info.type"
          >
            <b-dropdown-item
              v-for="item in data.elementArray"
              :key="item"
              @click="info.type = item"
              >{{ item }}</b-dropdown-item
            >
          </b-dropdown>
          <span>Sharpness</span>
          <b-dropdown style="width:100%" :text="info.sharpness.label">
            <b-dropdown-item
              v-for="item in data.sharpnessArray"
              :key="item.label"
              @click="info.sharpness = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Affinity
          <b-form-input v-model="info.affinity" type="number"></b-form-input>
          <hr />
          <h5>Scroll</h5>
          <b-button
            @click="
              info.scroll == 'red'
                ? (info.scroll = 'blue')
                : (info.scroll = 'red')
            "
            >{{ info.scroll }}</b-button
          >
          <hr />
          <h5>Petalace</h5>
          <b-dropdown style="width:100%" :text="info.petalace.label">
            <b-dropdown-item
              v-for="item in data.petalace"
              :key="item.label"
              @click="info.petalace = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          <hr />
          <b-button @click="optimizeWeapon()">Optimise Weapon</b-button>
          <b-button
            class="mt-1"
            variant="dark"
            v-for="entry in optimizedArray"
            :key="entry.weapon.label"
            @click="loadWeapon(entry.weapon)"
          >
            {{ entry.weapon.label }} <br />
            base: {{ entry.base }} avg: {{ entry.average }} crit:
            {{ entry.crit }}
          </b-button>
        </b-col>
        <!-- STATS -->
        <b-col>
          <h5>Stat Boost</h5>
          <div v-for="skill in data.statBoost" :key="skill.key">
            {{ skill.label }}
            <b-badge v-b-popover.hover.top="skill.description"
              ><i class="fas fa-question"></i
            ></b-badge>
            <b-dropdown style="width:100%" :text="info[skill.key].label">
              <b-dropdown-item
                v-for="item in skill.values"
                :key="item.label"
                @click="info[skill.key] = item"
                >{{ item.label }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-col>
        <!-- CRIT -->
        <b-col>
          <h5>Crit</h5>
          <div v-for="skill in data.crit" :key="skill.key">
            {{ skill.label }}
            <b-badge v-b-popover.hover.top="skill.description"
              ><i class="fas fa-question"></i
            ></b-badge>
            <b-dropdown style="width:100%" :text="info[skill.key].label">
              <b-dropdown-item
                v-for="item in skill.values"
                :key="item.label"
                @click="info[skill.key] = item"
                >{{ item.label }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-col>
        <!-- MODIFIERS -->
        <b-col>
          <h5>Modifiers</h5>
          <div
            v-for="skill in data.modifiers"
            :key="skill.key"
            v-show="
              skill.key != 'chargeMaster' ||
                chargeMasterWeapons.includes(info.weaponType)
            "
          >
            {{ skill.label }}
            <b-badge v-b-popover.hover.top="skill.description"
              ><i class="fas fa-question"></i
            ></b-badge>
            <b-dropdown style="width:100%" :text="info[skill.key].label">
              <b-dropdown-item
                v-for="item in skill.values"
                :key="item.label"
                @click="info[skill.key] = item"
                >{{ item.label }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-col>
        <!-- RAMPAGE SKILLS -->
        <b-col>
          <h5>Rampage Skills</h5>
          <span
            >Narwa Soul (Affinity)
            <b-badge
              v-b-popover.hover.top="'5% Affinity per Ibushi armor piece'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-dropdown style="width:100%" :text="info.narwaSoul.label">
            <b-dropdown-item
              v-for="item in data.narwaSoulArray"
              :key="item.label"
              @click="info.narwaSoul = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          <span
            >Daora Soul (Affinity)
            <b-badge
              v-b-popover.hover.top="'3-slot Active after 1 hit, full at 5'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-dropdown style="width:100%" :text="info.kushalaSoul.label">
            <b-dropdown-item
              v-for="item in data.kushalaSoulArray"
              :key="item.label"
              @click="info.kushalaSoul = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          <span
            >Valstrax Soul (Dragon)
            <b-badge v-b-popover.hover.top="'2-slot Active during dragonblight'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.valstrax"
          ></b-checkbox>
          <span
            >Magnamalo Soul
            <b-badge
              v-b-popover.hover.top="'2-slot Active during hellfireblight'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.magna"
          ></b-checkbox>
          <span
            >Species Jewel
            <b-badge
              v-b-popover.hover.top="'2-slot 5% Raw against specific species'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.species"
          ></b-checkbox>
          <span
            >Elembane Jewel
            <b-badge
              v-b-popover.hover.top="
                '3-slot 15% Element on hitzones with 25 or above of that element'
              "
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.elembane"
          ></b-checkbox>
          <span v-if="info.weaponType == 'Dual Blades'"
            >Raging Jewel
            <b-badge
              v-b-popover.hover.top="'3-slot 20% Affinity while in demon mode'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            v-if="info.weaponType == 'Dual Blades'"
            style="margin-bottom: 1rem"
            v-model="info.raging"
          ></b-checkbox>
        </b-col>
        <!-- BUFFS -->
        <b-col>
          <h5>Buffs</h5>
          Powercharm
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.powerCharm"
          ></b-checkbox>
          Powertalon
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.powerTalon"
          ></b-checkbox>
          Mega Demon Drug
          <b-checkbox
            :disabled="info.demonDrug"
            style="margin-bottom: 1rem"
            v-model="info.megaDemonDrug"
          ></b-checkbox>
          Demon Drug
          <b-checkbox
            :disabled="info.megaDemonDrug"
            style="margin-bottom: 1rem"
            v-model="info.demonDrug"
          ></b-checkbox>
          Demon Powder
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.demonPowder"
          ></b-checkbox>
          Might Seed
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.mightSeed"
          ></b-checkbox>
          <hr />
          <h5>Songs</h5>
          <span
            >Affinity Up
            <b-badge v-b-popover.hover.top="'20% Affinity'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.affinityUp"
          ></b-checkbox>
          <span
            >Attack Up
            <b-badge v-b-popover.hover.top="'10% more physical damage'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.attackUp"
          ></b-checkbox>
          <span
            >Element Up
            <b-badge
              v-b-popover.hover.top="'10% more elemental damage (uncapped)'"
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.affinityUp"
          ></b-checkbox>
          <span
            >Infernal Melody
            <b-badge
              v-b-popover.hover.top="
                '20% more raw attack (overwrites attack up, lasts 30 seconds)'
              "
              ><i class="fas fa-question"></i></b-badge
          ></span>
          <b-checkbox
            style="margin-bottom: 1rem"
            v-model="info.affinityUp"
          ></b-checkbox>
        </b-col>
        <!-- ANALYSIS -->
        <b-col style="border-left: solid white 1px">
          <h5>Stats</h5>
          <div style="text-align: left">
            <b>Raw Attack: {{ Math.floor(effectiveRaw) }}</b
            ><br />
            <b>Element: {{ Math.floor(effectiveElement) }}</b
            ><br />
            <b>Total: {{ Math.floor(effectiveTotal) }}</b
            ><br />
            <b>Affinity: {{ (effectiveAffinity * 100).toFixed(0) }}</b
            ><br />
          </div>
          <hr />
          <h5>
            Monster Part
            <b-badge
              v-b-popover.hover.top="
                'Monster Part Data can be found in the Hunters Notes. Leave at 100 to ignore.'
              "
              ><i class="fas fa-question"></i
            ></b-badge>
          </h5>
          Raw Modifier
          <b-form-input v-model="info.partPhys" type="number"></b-form-input>
          Element Modifier
          <b-row>
            <b-col style="padding-left: 3px;padding-right: 3px" cols="6"
              ><b-input-group style="padding: 3px;" size="sm" prepend="Dragon">
                <b-form-input
                  style="width: 2rem !important; padding-left: 3px"
                  v-model="info.partEle.dragon"
                  type="number"
                ></b-form-input> </b-input-group
            ></b-col>
            <b-col style="padding-left: 3px;padding-right: 3px" cols="6"
              ><b-input-group style="padding: 3px;" size="sm" prepend="Fire">
                <b-form-input
                  style="width: 2rem !important; padding-left: 3px"
                  v-model="info.partEle.fire"
                  type="number"
                ></b-form-input> </b-input-group
            ></b-col>
            <b-col style="padding-left: 3px;padding-right: 3px" cols="6"
              ><b-input-group style="padding: 3px;" size="sm" prepend="Water">
                <b-form-input
                  style="width: 2rem !important; padding-left: 3px"
                  v-model="info.partEle.water"
                  type="number"
                ></b-form-input> </b-input-group
            ></b-col>

            <b-col style="padding-left: 3px;padding-right: 3px" cols="6"
              ><b-input-group style="padding: 3px;" size="sm" prepend="Ice">
                <b-form-input
                  style="width: 2rem !important; padding-left: 3px"
                  v-model="info.partEle.ice"
                  type="number"
                ></b-form-input> </b-input-group
            ></b-col>
            <b-col style="padding-left: 3px;padding-right: 3px" cols="6"
              ><b-input-group style="padding: 3px;" size="sm" prepend="Thunder">
                <b-form-input
                  style="width: 2rem !important; padding-left: 3px"
                  v-model="info.partEle.thunder"
                  type="number"
                ></b-form-input> </b-input-group
            ></b-col>
          </b-row>
          <hr />
          <h5>Move Dependant Modifier</h5>
          <a
            href="https://docs.google.com/spreadsheets/d/1KSH0Uf-DsbFixdldQvcH-5zFXpX303dIzThTYMVH33Q/edit#gid=0"
            >Motion Value Data Sheet</a
          ><br />
          Motion Value
          <b-form-input
            v-model="info.motionValuePhys"
            type="number"
          ></b-form-input>
          Element Modifier
          <b-form-input
            v-model="info.motionValueEle"
            type="number"
          ></b-form-input>
          <hr />
          <h5>Attack Data</h5>
          <b-table-simple class="text-light">
            <b-tr>
              <b-th></b-th>
              <b-th>base</b-th>
              <b-th>avg</b-th>
              <b-th>crit</b-th>
            </b-tr>
            <b-tbody>
              <b-tr>
                <b-td><b>raw</b></b-td>
                <b-td>{{ Math.floor(hitRaw) }}</b-td>
                <b-td>{{ Math.floor(hitAverageRaw) }}</b-td>
                <b-td>{{ Math.floor(hitCritRaw) }}</b-td>
              </b-tr>
              <b-tr>
                <b-td><b>ele</b></b-td>
                <b-td>{{ Math.floor(hitElement) }}</b-td>
                <b-td>{{ Math.floor(hitAverageElement) }}</b-td>
                <b-td>{{ Math.floor(hitCritElement) }}</b-td>
              </b-tr>
              <b-tr>
                <b-td><b>total</b></b-td>
                <b-td>{{ Math.floor(hitTotal) }}</b-td>
                <b-td>{{ Math.floor(hitAverageTotal) }}</b-td>
                <b-td>{{ Math.floor(hitCritTotal) }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <b-button @click="$bvModal.show('saveModal')" class="float-right"
            >Saves</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import arrayFile from "./data/data.json";
import weapons from "./data/weapons.json";

//Move Hitzone Values after the effective damage calculations liek motion values
//fix elemental dmg cap
//split Effective and Actual + crit and non crit damage
//check correct values for skills again
//Add element types
//Make valstrax soul conditional
//Elembane, Raging, Switcher, Magnamalo Soul, Brutal Strike
//Add Petalace choices
//Save Feature
//Add Hunting Horn buffs
//!Add Weapon Selection For Hammer
//!Make an optimizer algorithm that tests all of selected weapon type for current setup

//!Add Qurious base stats once you know how they work

export default {
  name: "App",
  data() {
    return {
      chargeMasterWeapons: [
        "Greatsword",
        "Longsword",
        "Sword n Shield",
        "Hammer",
        "Lance",
        "Charge Blade",
        "Gun Lance",
        "Heavy Bowgun",
      ],
      data: null,
      filter: "",
      weapons: [],
      optimizedArray: [],
      saves: [],
      info: null,
      template: {
        title: "",
        weaponName: "",
        weaponType: "Sword n Shield",
        petalace: { label: "Absolute", raw: 15 },
        type: "dragon",
        scroll: "red",
        valstrax: false,
        magna: false,
        elembane: false,
        raging: false,
        species: false,
        powerCharm: false,
        powerTalon: false,
        megaDemonDrug: false,
        demonDrug: false,
        demonPowder: false,
        mightSeed: false,
        affinityUp: false,
        attackUp: false,
        elementUp: false,
        infernalMelody: false,
        raw: 300,
        element: 25,
        affinity: 0,
        rampageSlot: 0,
        critElement: { label: "None", value: 1 },
        critBoost: { label: "None", value: 1.25 },
        wex: { label: "None", value: 0 },
        latentPower: { label: "None", value: 0 },
        maxMight: { label: "None", value: 0 },
        narwaSoul: { label: "None", value: 0 },
        kushalaSoul: { label: "None", value: 0 },
        critEye: { label: "None", value: 0 },
        foray: { label: "None", affinity: 0, raw: 0 },
        agitator: { label: "None", affinity: 0, raw: 0 },
        chainCrit: { label: "None", raw: 0, element: 0 },
        grinder: { label: "None", raw: 0, element: 0 },
        elementAttack: { label: "None", mod: 0, element: 0 },
        attackBoost: { label: "None", mod: 0, raw: 0 },
        heroics: { label: "None", mod: 0 },
        fortify: { label: "None", mod: 0 },
        resuscitate: { label: "None", raw: 0 },
        coalescence: { label: "None", raw: 0, element: 0 },
        peakPerformance: { label: "None", raw: 0 },
        resentment: { label: "None", raw: 0 },
        elderBlessing: { label: "None", mod: 0 },
        elementExploit: { label: "None", mod: 0 },
        chargeMaster: { label: "None", mod: 0, bow: 0 },
        dragonHeart: { label: "None", mod: 0 },
        mailOfHellfire: { label: "None", element: 0, raw: 0 },
        counterStrike: { label: "None", raw: 0 },
        dereliction: { label: "None", element: 0, raw: 0 },
        sharpness: { label: "white", raw: 1.32, element: 1.15 },
        partPhys: 100,
        partEle: {
          dragon: 30,
          fire: 30,
          water: 30,
          thunder: 30,
          ice: 30,
          none: 0,
        },
        motionValuePhys: 100,
        motionValueEle: 1,
      },
    };
  },
  created() {
    this.data = arrayFile;
    this.weapons = weapons;
    this.info = this.template;
    this.loadSaves();
  },
  methods: {
    loadWeapon(weapon) {
      this.info.raw = weapon.raw;
      this.info.element = weapon.element;
      this.info.affinity = weapon.affinity;
      this.info.rampageSlot = weapon.rampageSlot;
      this.info.type = weapon.type;
      this.info.weaponName = weapon.label;
      this.info.sharpness = this.data.sharpnessArray.find(
        (x) => x.label == weapon.sharpness
      );
      this.$bvModal.hide("weaponModal");
    },
    optimizeWeapon() {
      let oldSetup = {
        raw: this.info.raw,
        element: this.info.element,
        affinity: this.info.affinity,
        rampageSlot: this.info.rampageSlot,
        type: this.info.type,
        weaponName: this.info.label,
        sharpness: this.info.sharpness.label,
      };
      let resultArray = [];
      this.weapons[this.info.weaponType].forEach((weapon) => {
        this.loadWeapon(weapon);
        resultArray.push({
          weapon: weapon,
          base: this.hitTotal,
          average: this.hitAverageTotal,
          crit: this.hitCritTotal,
        });
      });
      resultArray.sort((x, y) => y.average - x.average);
      resultArray = resultArray.splice(0, 3);
      this.optimizedArray = resultArray;
      this.loadWeapon(oldSetup);
    },
    applyHitzoneRaw(base) {
      var total = base;

      if (this.info.species && this.info.rampageSlot >= 2)
        total += this.info.raw * 0.05;

      // Sharpness
      total *= this.info.sharpness.raw;
      // Hitzone
      total *= this.info.partPhys / 100.0;
      // MotionValue
      total *= this.info.motionValuePhys / 100.0;

      return total;
    },
    applyHitzoneElement(base) {
      var total = base;

      //Element Exploit
      if (this.info.partEle[this.info.type] >= 20)
        total += this.info.element * this.info.elementExploit.mod; //! TO BE TESTED
      //Elembane
      if (
        this.info.rampageSlot >= 3 &&
        this.info.elemBane &&
        this.info.partEle[this.info.type] >= 25
      )
        total += this.info.element * 0.15; //! TO BE TESTED

      // Sharpness
      total *= this.info.sharpness.element;
      // Hitzone
      total *= this.info.partEle[this.info.type] / 100.0;
      // MotionValue
      total *= this.info.motionValueEle;

      return total;
    },
    showModal() {
      this.$bvModal.show("weaponModal");
    },
    loadSaves() {
      let saveFile = localStorage.getItem("monHunSaves");
      if (saveFile) this.saves = JSON.parse(saveFile);
    },
    saveSetup() {
      this.saves.push(this.info);
      localStorage.setItem("monHunSaves", JSON.stringify(this.saves));
    },
    deleteSetup(index) {
      this.saves.splice(index, 1);
      localStorage.setItem("monHunSaves", JSON.stringify(this.saves));
    },
  },
  computed: {
    // UI STATS
    effectiveAffinity() {
      if (!this.info) return 0;
      let total = (
        (parseInt(this.info.affinity) +
          parseInt(this.info.wex.value) +
          //Raging Jewel
          parseInt(
            this.info.raging && this.info.weaponType == "Dual Blades" ? 20 : 0
          ) +
          parseInt(this.info.affinityUp ? 20 : 0) +
          parseInt(
            this.info.rampageSlot >= 3 ? this.info.kushalaSoul.value : 0
          ) +
          parseInt(this.info.latentPower.value) +
          parseInt(this.info.rampageSlot >= 2 ? this.info.narwaSoul.value : 0) +
          parseInt(this.info.maxMight.value) +
          parseInt(this.info.foray.affinity) +
          parseInt(this.info.agitator.affinity) +
          parseInt(this.info.critEye.value)) /
        100.0
      ).toFixed(2);
      if (total > 1) return 1;
      return total;
    },
    effectiveRaw() {
      if (!this.info) return 0;
      //Total
      let total = parseInt(this.info.raw);

      //Buffs
      if (this.info.powerCharm) total += 6;
      if (this.info.powerTalon) total += 9;
      if (this.info.megaDemonDrug) total += 7;
      if (this.info.demonDrug) total += 5;
      if (this.info.demonPowder) total += 10;
      if (this.info.mightSeed) total += 10;

      //mods
      total += this.info.raw * this.info.grinder.raw;
      total += this.info.raw * this.info.attackBoost.mod;
      total += this.info.raw * this.info.dragonHeart.mod;
      total += this.info.raw * this.info.heroics.mod;
      total += this.info.raw * this.info.fortify.mod;

      //extra
      if (this.info.magna) total += 12;
      total += this.info.petalace.raw;
      total += this.info.counterStrike.raw;
      total += this.info.coalescence.raw;
      total += this.info.chainCrit.raw;
      total += this.info.foray.raw;
      total += this.info.peakPerformance.raw;
      total += this.info.resuscitate.raw;
      total += this.info.agitator.raw;
      total += this.info.resentment.raw;
      total += this.info.attackBoost.raw;

      //Scroll
      if (this.info.scroll == "red") total += this.info.mailOfHellfire.raw;
      else total += this.info.dereliction.raw;

      //Songs
      if (this.info.infernalMelody) total += this.info.raw * 0.2;
      else if (this.info.attackUp) total *= 1.1;

      return total;
    },
    effectiveElement() {
      if (!this.info || this.info == 0 || this.info.type == "none") return 0;
      //Total Element
      let total = parseInt(this.info.element);
      //multipliers
      if (
        this.info.rampageSlot >= 2 &&
        this.info.valstrax &&
        this.info.dragonHeart.label != "None" &&
        this.info.type == "dragon"
      )
        total += this.info.element * 0.2;

      if (this.info.weaponType == "bow")
        total += this.info.element * this.info.chargeMaster.bow;
      else if (this.chargeMasterWeapons.includes(this.info.weaponType))
        total += this.info.element * this.info.chargeMaster.mod;

      total += this.info.element * this.info.grinder.element;
      total += this.info.element * this.info.elementAttack.mod;

      if (this.info.type == "thunder" || this.info.type == "dragon")
        total += this.info.element * this.info.elderBlessing.mod;
      else if (this.info.elderBlessing.mod > 0.1)
        total += this.info.element * 0.1;

      //total extra
      total += this.info.chainCrit.element;
      total += this.info.coalescence.element;
      total += this.info.elementAttack.element;

      //Scroll
      if (this.info.scroll == "blue")
        total += this.info.element * this.info.mailOfHellfire.element;
      else total += this.info.dereliction.element;

      //CAP
      if (total > 110) total = 110;

      //Songs
      if (this.info.elementUp) total *= 1.1;

      return total;
    },
    effectiveTotal() {
      return this.effectiveRaw + this.effectiveElement;
    },
    // AVERAGE BETWEEN CRIT AND NON CRIT
    averageRaw() {
      let total = this.effectiveRaw;

      let critMod =
        this.effectiveAffinity > 0 ? this.info.critBoost.value : 0.75;
      let effectiveCrit = (critMod - 1) * Math.abs(this.effectiveAffinity) + 1;
      total *= effectiveCrit;

      return total;
    },
    averageElement() {
      let total = this.effectiveElement;

      let critMod =
        this.effectiveAffinity > 0 ? this.info.critElement.value : 1;
      let effectiveCrit = (critMod - 1) * Math.abs(this.effectiveAffinity) + 1;
      total *= effectiveCrit;

      return total;
    },
    averageTotal() {
      return this.averageRaw + this.averageElement;
    },
    // CRITICALS
    critRaw() {
      let total = this.effectiveRaw;

      let critMod =
        this.effectiveAffinity >= 0 ? this.info.critBoost.value : 0.75;
      if (this.effectiveAffinity == 0) critMod = 1;
      total *= critMod;

      return total;
    },
    critElement() {
      let total = this.effectiveElement;

      let critMod =
        this.effectiveAffinity > 0 ? this.info.critElement.value : 1;
      total *= critMod;

      return total;
    },
    critTotal() {
      return this.critRaw + this.critElement;
    },
    // HITZONE / MOTION VALUE / SHARPNESS
    hitRaw() {
      return Math.floor(this.applyHitzoneRaw(this.effectiveRaw));
    },
    hitElement() {
      return Math.floor(this.applyHitzoneElement(this.effectiveElement));
    },
    hitTotal() {
      return this.hitRaw + this.hitElement;
    },
    hitAverageRaw() {
      return Math.floor(this.applyHitzoneRaw(this.averageRaw));
    },
    hitAverageElement() {
      return Math.floor(this.applyHitzoneElement(this.averageElement));
    },
    hitAverageTotal() {
      return this.hitAverageRaw + this.hitAverageElement;
    },
    hitCritRaw() {
      return Math.floor(this.applyHitzoneRaw(this.critRaw));
    },
    hitCritElement() {
      return Math.floor(this.applyHitzoneElement(this.critElement));
    },
    hitCritTotal() {
      return this.hitCritRaw + this.hitCritElement;
    },
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
  margin-top: 60px;
}
#app > * {
  background-color: #304152;
}
#smallprint {
  color: black;
  font-size: 0.8rem;
}
</style>
