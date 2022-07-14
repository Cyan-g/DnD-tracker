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
          <b-form-input v-model="info.partEle" type="number"></b-form-input>
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
          <b> Effective Raw: {{ effectiveRaw.toFixed() }} </b><br />
          <b> Effective Element: {{ effectiveElement.toFixed() }} </b><br />
          <b> Effective Affinity: {{ (effectiveAffinity * 100).toFixed() }} </b
          ><br />
          <b>Total: {{ total.toFixed() }}</b>
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

          Attack Raw:
          {{ (effectiveRaw * (info.motionValuePhys / 100.0)).toFixed() }}
          <br />
          Attack Element:
          {{ (effectiveElement * info.motionValueEle).toFixed() }}
          <br />
          Attack Total:
          {{
            effectiveRaw * (info.motionValuePhys / 100.0).toFixed(0) +
              effectiveElement * info.motionValueEle.toFixed(0)
          }}
          <br />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import arrayFile from "./data/data.json";

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
        elementAttack: { label: "None", mod: 0, element: 0 },
        attackBoost: { label: "None", mod: 0, raw: 0 },
        heroics: { label: "None", mod: 0 },
        fortify: { label: "None", mod: 0 },
        resuscitate: { label: "None", raw: 0 },
        peakPerformance: { label: "None", raw: 0 },
        resentment: { label: "None", raw: 0 },
        elderBlessing: { label: "None", mod: 0 },
        chargeMaster: { label: "None", mod: 0, bow: 0 },
        dragonHeart: { label: "None", mod: 0 },
        mailOfHellfire: { label: "None", element: 0, raw: 0 },
        dereliction: { label: "None", element: 0, raw: 0 },
        sharpness: { label: "white", raw: 1.32, element: 1.15 },
        partPhys: 100,
        partEle: 100,
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
      let total = this.info.raw;
      //mods
      if (this.info.species) total += this.info.raw * 0.05;
      if (this.info.powerCharm) total += 6;
      if (this.info.powerTalon) total += 9;
      if (this.info.megaDemonDrug) total += 7;
      if (this.info.demonDrug) total += 5;
      if (this.info.demonPowder) total += 10;
      if (this.info.mightSeed) total += 10;

      total += this.info.raw * this.info.attackBoost.mod;
      total += this.info.raw * this.info.dragonHeart.mod;
      total += this.info.raw * this.info.heroics.mod;
      total += this.info.raw * this.info.fortify.mod;
      //extra
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

      //Crit
      let critMod =
        this.effectiveAffinity > 0 ? this.info.critBoost.value : 0.75;
      let effectiveCrit = (critMod - 1) * Math.abs(this.effectiveAffinity) + 1;
      total *= effectiveCrit;

      //Sharpness / Hitzone
      total *= this.info.sharpness.raw;
      total *= this.info.partPhys / 100.0;

      return total;
    },
    effectiveElement() {
      if (!this.info) return 0;
      //Total Element
      let total = this.info.element;
      //multipliers
      if (this.info.valstrax && this.info.dragonHeart.label != "None")
        total += this.info.element * 0.2;

      if (this.info.weaponType == "bow")
        total += this.info.element * this.info.chargeMaster.bow;
      else if (this.chargeMasterWeapons.includes(this.info.weaponType))
        total += this.info.element * this.info.chargeMaster.mod;

      total += this.info.element * this.info.elementAttack.mod;
      total += this.info.element * this.info.elderBlessing.mod;
      //total extra
      total += this.info.chainCrit.element;
      total += this.info.elementAttack.element;

      //Scroll
      if (this.info.scroll == "blue") total += this.info.mailOfHellfire.element;
      else total += this.info.dereliction.element;

      //Crit Element
      let critMod =
        this.effectiveAffinity > 0 ? this.info.critElement.value : 1;
      let effectiveCrit = (critMod - 1) * Math.abs(this.effectiveAffinity) + 1;
      total *= effectiveCrit;

      //Sharpness / Hitzone
      total *= this.info.sharpness.element;
      total *= this.info.partEle / 100.0;
      if (total > 110) return 110;
      return total;
    },
    total() {
      return this.effectiveRaw + this.effectiveElement;
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
