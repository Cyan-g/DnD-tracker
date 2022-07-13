<template>
  <div id="app">
    <b-card> <h1>Damage Calculator</h1></b-card>
    <hr />
    <b-card>
      <!-- <b-button size="xs" @click="info.key = !key">Load</b-button> -->
      <b-row>
        <b-col style="border-right: solid white 1px">
          <h5>Weapon</h5>
          Raw Damage
          <b-form-input v-model="info.raw" type="number"></b-form-input>
          Element Damage
          <b-form-input v-model="info.element" type="number"></b-form-input>
          <span>Sharpness</span>
          <b-dropdown style="width:100%" :text="info.sharpness.label">
            <b-dropdown-item
              v-for="item in sharpnessArray"
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
          <h5>Monster Part</h5>
          Raw Modifier
          <b-form-input v-model="info.partPhys" type="number"></b-form-input>
          Element Modifier
          <b-form-input v-model="info.partEle" type="number"></b-form-input>
        </b-col>
        <b-col>
          <h5>Stat Boost</h5>
          Chain Crit
          <b-dropdown style="width:100%" :text="info.chainCrit.label">
            <b-dropdown-item
              v-for="item in chainCritArray"
              :key="item.label"
              @click="info.chainCrit = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Element Attack
          <b-dropdown style="width:100%" :text="info.elementAttack.label">
            <b-dropdown-item
              v-for="item in elementAttackArray"
              :key="item.label"
              @click="info.elementAttack = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Attack Boost
          <b-dropdown style="width:100%" :text="info.attackBoost.label">
            <b-dropdown-item
              v-for="item in attackBoostArray"
              :key="item.label"
              @click="info.attackBoost = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Peak Performance
          <b-dropdown style="width:100%" :text="info.peakPerformance.label">
            <b-dropdown-item
              v-for="item in peakPerformanceArray"
              :key="item.label"
              @click="info.peakPerformance = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Resentment
          <b-dropdown style="width:100%" :text="info.resentment.label">
            <b-dropdown-item
              v-for="item in resentmentArray"
              :key="item.label"
              @click="info.resentment = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Resuscitate
          <b-dropdown style="width:100%" :text="info.resuscitate.label">
            <b-dropdown-item
              v-for="item in resuscitateArray"
              :key="item.label"
              @click="info.resuscitate = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Mail of Hellfire
          <b-dropdown style="width:100%" :text="info.mailOfHellfire.label">
            <b-dropdown-item
              v-for="item in mailOfHellfireArray"
              :key="item.label"
              @click="info.mailOfHellfire = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Dereliction
          <b-dropdown style="width:100%" :text="info.dereliction.label">
            <b-dropdown-item
              v-for="item in derelictionArray"
              :key="item.label"
              @click="info.dereliction = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
        <b-col>
          <h5>Crit</h5>
          Crit Element
          <b-dropdown style="width:100%" :text="info.critElement.label">
            <b-dropdown-item
              v-for="item in critElementArray"
              :key="item.label"
              @click="info.critElement = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Crit Boost
          <b-dropdown style="width:100%" :text="info.critBoost.label">
            <b-dropdown-item
              v-for="item in critBoostArray"
              :key="item.label"
              @click="info.critBoost = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Crit Eye
          <b-dropdown style="width:100%" :text="info.critEye.label">
            <b-dropdown-item
              v-for="item in critEyeArray"
              :key="item.label"
              @click="info.critEye = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Weakness Ex
          <b-dropdown style="width:100%" :text="info.wex.label">
            <b-dropdown-item
              v-for="item in wexArray"
              :key="item.label"
              @click="info.wex = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Maximum Might
          <b-dropdown style="width:100%" :text="info.maxMight.label">
            <b-dropdown-item
              v-for="item in maxMightArray"
              :key="item.label"
              @click="info.maxMight = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Latent Power
          <b-dropdown style="width:100%" :text="info.latentPower.label">
            <b-dropdown-item
              v-for="item in latentPowerArray"
              :key="item.label"
              @click="info.latentPower = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Foray
          <b-dropdown style="width:100%" :text="info.foray.label">
            <b-dropdown-item
              v-for="item in forayArray"
              :key="item.label"
              @click="info.foray = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>

        <b-col>
          <h5>Modifiers</h5>
          Elder Dragon Blessings
          <b-dropdown style="width:100%" :text="info.elderBlessing.label">
            <b-dropdown-item
              v-for="item in elderBlessingArray"
              :key="item.label"
              @click="info.elderBlessing = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Dragon Heart
          <b-dropdown style="width:100%" :text="info.dragonHeart.label">
            <b-dropdown-item
              v-for="item in dragonHeartArray"
              :key="item.label"
              @click="info.dragonHeart = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Heroics
          <b-dropdown style="width:100%" :text="info.heroics.label">
            <b-dropdown-item
              v-for="item in heroicsArray"
              :key="item.label"
              @click="info.heroics = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
          Fortify
          <b-dropdown style="width:100%" :text="info.fortify.label">
            <b-dropdown-item
              v-for="item in fortifyArray"
              :key="item.label"
              @click="info.fortify = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
        <b-col>
          <h5>Rampage Skills</h5>
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
          <span>Narwa Soul (Affinity)</span>
          <b-dropdown style="width:100%" :text="info.narwaSoul.label">
            <b-dropdown-item
              :disabled="info.species || info.valstrax"
              v-for="item in narwaSoulArray"
              :key="item.label"
              @click="info.narwaSoul = item"
              >{{ item.label }}</b-dropdown-item
            >
          </b-dropdown>
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
        <b-col>
          <b> Effective Raw: {{ effectiveRaw.toFixed() }} </b><br />
          <b> Effective Element: {{ effectiveElement.toFixed() }} </b><br />
          <b> Effective Affinity: {{ (effectiveAffinity * 100).toFixed() }} </b
          ><br />
          <b>Total: {{ total.toFixed() }}</b>
          <hr />
          <h5>Motion Values</h5>
          Raw
          <b-form-input
            v-model="info.motionvaluePhys"
            type="number"
          ></b-form-input>
          Element
          <b-form-input
            v-model="info.motionValueEle"
            type="number"
          ></b-form-input>
          <hr />

          Attack Raw: {{ (effectiveRaw * info.motionValueEle).toFixed() }}
          <br />
          Attack Element:
          {{ (effectiveElement * info.motionValueEle).toFixed() }} <br />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sharpnessArray: [
        { label: "purple", raw: 1.39, element: 1.25 },
        { label: "white", raw: 1.32, element: 1.15 },
        { label: "blue", raw: 1.2, element: 1.0625 },
        { label: "green", raw: 1.05, element: 1 },
        { label: "yellow", raw: 1, element: 0.75 },
        { label: "orange", raw: 0.75, element: 0.5 },
      ],
      critElementArray: [
        { label: "None", value: 1 },
        { label: "Level 1", value: 1.05 },
        { label: "Level 2", value: 1.1 },
        { label: "Level 3", value: 1.15 },
      ],
      critBoostArray: [
        { label: "None", value: 1.25 },
        { label: "Level 1", value: 1.3 },
        { label: "Level 2", value: 1.35 },
        { label: "Level 3", value: 1.4 },
      ],
      wexArray: [
        { label: "None", value: 0 },
        { label: "Level 1", value: 15.0 },
        { label: "Level 2", value: 30.0 },
        { label: "Level 3", value: 50.0 },
      ],
      latentPowerArray: [
        { label: "None", value: 0 },
        { label: "Level 1", value: 10.0 },
        { label: "Level 2", value: 20.0 },
        { label: "Level 3", value: 30.0 },
        { label: "Level 4", value: 40.0 },
        { label: "Level 5", value: 50.0 },
      ],
      maxMightArray: [
        { label: "None", value: 0 },
        { label: "Level 1", value: 10.0 },
        { label: "Level 2", value: 20.0 },
        { label: "Level 3", value: 30.0 },
      ],
      critEyeArray: [
        { label: "None", value: 0 },
        { label: "Level 1", value: 5.0 },
        { label: "Level 2", value: 10.0 },
        { label: "Level 3", value: 15.0 },
        { label: "Level 4", value: 20.0 },
        { label: "Level 5", value: 25.0 },
        { label: "Level 6", value: 30.0 },
        { label: "Level 7", value: 40.0 },
      ],
      chainCritArray: [
        { label: "None", raw: 0, element: 0 },
        { label: "Level 1", raw: 15, element: 12 },
        { label: "Level 2", raw: 17, element: 15 },
        { label: "Level 3", raw: 20, element: 20 },
      ],
      elementAttackArray: [
        { label: "None", mod: 0, element: 0 },
        { label: "Level 1", mod: 0, element: 2 },
        { label: "Level 2", mod: 0, element: 3 },
        { label: "Level 3", mod: 0.05, element: 4 },
        { label: "Level 4", mod: 0.1, element: 4 },
        { label: "Level 5", mod: 0.2, element: 4 },
      ],
      elderBlessingArray: [
        { label: "None", mod: 0 },
        { label: "Level 1", mod: 0.05 },
        { label: "Level 2", mod: 0.1 },
        { label: "Level 3 (Thunder/Dragon only)", mod: 0.15 },
      ],
      dragonHeartArray: [
        { label: "None", mod: 0 },
        { label: "Level 1", mod: 0 },
        { label: "Level 2", mod: 0 },
        { label: "Level 3", mod: 0 },
        { label: "Level 4", mod: 0.05 },
        { label: "Level 5", mod: 0.1 },
      ],
      attackBoostArray: [
        { label: "None", mod: 0, raw: 0 },
        { label: "Level 1", mod: 0, raw: 3 },
        { label: "Level 2", mod: 0, raw: 6 },
        { label: "Level 3", mod: 0, raw: 9 },
        { label: "Level 4", mod: 0.05, raw: 7 },
        { label: "Level 5", mod: 0.06, raw: 8 },
        { label: "Level 6", mod: 0.08, raw: 9 },
        { label: "Level 7", mod: 0.1, raw: 10 },
      ],
      heroicsArray: [
        { label: "None", mod: 0 },
        { label: "Level 1", mod: 0 },
        { label: "Level 2", mod: 0.05 },
        { label: "Level 3", mod: 0.05 },
        { label: "Level 4", mod: 0.1 },
        { label: "Level 5", mod: 0.3 },
      ],
      fortifyArray: [
        { label: "None", mod: 0 },
        { label: "1 Death", mod: 0.1 },
        { label: "2 Death's", mod: 0.2 },
      ],
      peakPerformanceArray: [
        { label: "None", raw: 0 },
        { label: "Level 1", raw: 5 },
        { label: "Level 2", raw: 10 },
        { label: "Level 3", raw: 20 },
      ],
      resuscitateArray: [
        { label: "None", raw: 0 },
        { label: "Level 1", raw: 5 },
        { label: "Level 2", raw: 10 },
        { label: "Level 3", raw: 20 },
      ],
      resentmentArray: [
        { label: "None", raw: 0 },
        { label: "Level 1", raw: 5 },
        { label: "Level 2", raw: 10 },
        { label: "Level 3", raw: 15 },
        { label: "Level 4", raw: 20 },
        { label: "Level 5", raw: 25 },
      ],
      forayArray: [
        { label: "None", affinity: 0, raw: 0 },
        { label: "Level 1", affinity: 0, raw: 10 },
        { label: "Level 2", affinity: 10, raw: 10 },
        { label: "Level 3", affinity: 20, raw: 15 },
      ],
      agitatorArray: [
        { label: "None", affinity: 0, raw: 0 },
        { label: "Level 1", affinity: 3, raw: 4 },
        { label: "Level 2", affinity: 5, raw: 8 },
        { label: "Level 3", affinity: 7, raw: 12 },
        { label: "Level 4", affinity: 10, raw: 16 },
        { label: "Level 5", affinity: 15, raw: 20 },
      ],
      mailOfHellfireArray: [
        { label: "None", element: 0, raw: 0 },
        { label: "Level 1", element: 3, raw: 15 },
        { label: "Level 2", element: 7, raw: 25 },
        { label: "Level 3", element: 11, raw: 35 },
      ],
      derelictionArray: [
        { label: "None", element: 0, raw: 0 },
        { label: "Level 1", element: 12, raw: 25 },
        { label: "Level 2", element: 15, raw: 30 },
        { label: "Level 3", element: 20, raw: 35 },
      ],
      narwaSoulArray: [
        { label: "None", value: 0 },
        { label: "1 Ibushi Piece", value: 5 },
        { label: "2 Ibushi Pieces", value: 10 },
        { label: "3 Ibushi Pieces", value: 15 },
        { label: "4 Ibushi Pieces", value: 20 },
        { label: "5 Ibushi Pieces", value: 25 },
      ],
      info: {
        scroll: "red",
        valstrax: false,
        species: false,
        powerCharm: true,
        powerTalon: true,
        megaDemonDrug: true,
        demonDrug: true,
        demonPowder: true,
        mightSeed: true,
        raw: 300,
        element: 25,
        affinity: 0,
        critElement: { label: "None", value: 1 },
        critBoost: { label: "None", value: 1.25 },
        wex: { label: "None", value: 0 },
        latentPower: { label: "None", value: 0 },
        maxMight: { label: "None", value: 0 },
        narwaSoul: { label: "None", value: 0 },
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
        dragonHeart: { label: "None", mod: 0 },
        mailOfHellfire: { label: "None", element: 0, raw: 0 },
        dereliction: { label: "None", element: 0, raw: 0 },
        sharpness: { label: "white", raw: 1.32, element: 1.15 },
        partPhys: 0.3,
        partEle: 0.25,
        motionvaluePhys: 0.3,
        motionValueEle: 0.25,
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
    let stored = localStorage.getItem("monhun");
    if (stored) {
      this.info = JSON.parse(stored);
    }
  },
  computed: {
    effectiveAffinity() {
      let total = (
        (parseInt(this.info.affinity) +
          parseInt(this.info.wex.value) +
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
      total *= this.info.partPhys;

      return total;
    },
    effectiveElement() {
      //Total Element
      let total = this.info.element;
      //multipliers
      if (this.info.valstrax && this.info.dragonHeart.label != "None")
        total += this.info.element * 0.2;
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
      total *= this.info.partEle;
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
