<template>
  <div id="app">
    <b-card> <h1>Damage Calculator</h1></b-card>
    <hr />
    <b-card v-if="info">
      <!-- <b-button size="xs" @click="info.key = !key">Load</b-button> -->
      <b-row>
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
        </b-col>
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
        <b-col>
          <h5>Rampage Skills</h5>
          <span>Narwa Soul (Affinity)</span>
          <b-dropdown style="width:100%" :text="info.narwaSoul.label">
            <b-dropdown-item
              :disabled="info.species || info.valstrax"
              v-for="item in data.narwaSoulArray"
              :key="item.label"
              @click="info.narwaSoul = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          <span>Daora Soul (Affinity)</span>
          <b-dropdown style="width:100%" :text="info.kushalaSoul.label">
            <b-dropdown-item
              :disabled="info.species || info.valstrax"
              v-for="item in data.kushalaSoulArray"
              :key="item.label"
              @click="info.kushalaSoul = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Valstrax Soul (Dragon)
          <b-checkbox
            :disabled="info.species || info.narwaSoul.label != 'None'"
            style="margin-bottom: 1rem"
            v-model="info.valstrax"
          ></b-checkbox>
          Species Jewel
          <b-checkbox
            :disabled="info.valstrax || info.narwaSoul.label != 'None'"
            style="margin-bottom: 1rem"
            v-model="info.species"
          ></b-checkbox>
        </b-col>
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
        </b-col>
        <b-col style="border-left: solid white 1px">
          <h5>Stats</h5>
          <div style="text-align: left">
            <b>Raw Attack: {{ effectiveRaw.toFixed() }}</b
            ><br />
            <b>Element: {{ effectiveElement.toFixed() }}</b
            ><br />
            <b>Total: {{ effectiveTotal.toFixed() }}</b
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
                <b-td>{{ hitRaw.toFixed() }}</b-td>
                <b-td>{{ hitAverageRaw.toFixed() }}</b-td>
                <b-td>{{ hitCritRaw.toFixed() }}</b-td>
              </b-tr>
              <b-tr>
                <b-td><b>ele</b></b-td>
                <b-td>{{ hitElement.toFixed() }}</b-td>
                <b-td>{{ hitAverageElement.toFixed() }}</b-td>
                <b-td>{{ hitCritElement.toFixed() }}</b-td>
              </b-tr>
              <b-tr>
                <b-td><b>total</b></b-td>
                <b-td>{{ hitTotal.toFixed() }}</b-td>
                <b-td>{{ hitAverageTotal.toFixed() }}</b-td>
                <b-td>{{ hitCritTotal.toFixed() }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import arrayFile from "./data/data.json";

//Move Hitzone Values after the effective damage calculations liek motion values
//fix elemental dmg cap
//split Effective and Actual + crit and non crit damage
//check correct values for skills again
//Add element types
//Make valstrax soul conditional
//!Add Hunting Horn buffs
//!Add Petalace choices
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
      info: null,
      template: {
        weaponType: "Sword n Shield",
        type: "dragon",
        scroll: "red",
        valstrax: false,
        species: false,
        powerCharm: false,
        powerTalon: false,
        megaDemonDrug: false,
        demonDrug: false,
        demonPowder: false,
        mightSeed: false,
        raw: 300,
        element: 25,
        affinity: 0,
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
  watch: {
    total: {
      handler() {
        localStorage.setItem("monhun", JSON.stringify(this.info));
      },
      deep: true,
    },
  },
  created() {
    this.data = arrayFile;
    this.info = this.template;
  },
  computed: {
    // UI STATS
    effectiveAffinity() {
      if (!this.info) return 0;
      let total = (
        (parseInt(this.info.affinity) +
          parseInt(this.info.wex.value) +
          parseInt(this.info.kushalaSoul.value) +
          parseInt(this.info.latentPower.value) +
          parseInt(this.info.narwaSoul.value) +
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
      //mods
      if (this.info.species) total += this.info.raw * 0.05;
      if (this.info.powerCharm) total += 6;
      if (this.info.powerTalon) total += 9;
      if (this.info.megaDemonDrug) total += 7;
      if (this.info.demonDrug) total += 5;
      if (this.info.demonPowder) total += 10;
      if (this.info.mightSeed) total += 10;

      total += this.info.raw * this.info.grinder.raw;
      total += this.info.raw * this.info.attackBoost.mod;
      total += this.info.raw * this.info.dragonHeart.mod;
      total += this.info.raw * this.info.heroics.mod;
      total += this.info.raw * this.info.fortify.mod;
      //extra
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

      return total;
    },
    effectiveElement() {
      if (!this.info || this.info == 0 || this.info.type == "none") return 0;
      //Total Element
      let total = parseInt(this.info.element);
      //multipliers
      if (
        this.info.valstrax &&
        this.info.dragonHeart.label != "None" &&
        this.info.type != "none"
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
      if (this.info.scroll == "blue") total += this.info.mailOfHellfire.element;
      else total += this.info.dereliction.element;

      if (total > 110) return 110;
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
      var total = this.effectiveRaw;
      // Sharpness
      total *= this.info.sharpness.raw;
      // Hitzone
      total *= this.info.partPhys / 100.0;
      // MotionValue
      total *= this.info.motionValuePhys / 100.0;

      return total;
    },
    hitElement() {
      var total = this.effectiveElement;

      // Sharpness
      total *= this.info.sharpness.element;
      // Hitzone
      total *= this.info.partEle[this.info.type] / 100.0;
      // MotionValue
      total *= this.info.motionValueEle;

      return total;
    },
    hitTotal() {
      return this.hitRaw + this.hitElement;
    },
    hitAverageRaw() {
      var total = this.averageRaw;
      // Sharpness
      total *= this.info.sharpness.raw;
      // Hitzone
      total *= this.info.partPhys / 100.0;
      // MotionValue
      total *= this.info.motionValuePhys / 100.0;

      return total;
    },
    hitAverageElement() {
      var total = this.averageElement;

      // Sharpness
      total *= this.info.sharpness.element;
      // Hitzone
      total *= this.info.partEle[this.info.type] / 100.0;
      // MotionValue
      total *= this.info.motionValueEle;

      return total;
    },
    hitAverageTotal() {
      return this.hitAverageRaw + this.hitAverageElement;
    },
    hitCritRaw() {
      var total = this.critRaw;
      // Sharpness
      total *= this.info.sharpness.raw;
      // Hitzone
      total *= this.info.partPhys / 100.0;
      // MotionValue
      total *= this.info.motionValuePhys / 100.0;

      return total;
    },
    hitCritElement() {
      var total = this.critElement;

      // Sharpness
      total *= this.info.sharpness.element;
      // Hitzone
      total *= this.info.partEle[this.info.type] / 100.0;
      // MotionValue
      total *= this.info.motionValueEle;

      return total;
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
