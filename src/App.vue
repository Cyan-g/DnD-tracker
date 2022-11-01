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
          cols="12"
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
          <b-button
            style="width:100%; margin-top: 1rem"
            @click="$bvModal.show('weaponModal')"
            >Choose Weapon</b-button
          >
          <br />
          <hr />
          <h6>
            {{ info.weaponName }}
          </h6>
          <!-- Damage -->
          <b-row>
            <b-col>
              Raw
              <b-form-input v-model="info.raw" type="number"></b-form-input>
            </b-col>
            <b-col>
              Element
              <b-form-input v-model="info.element" type="number"></b-form-input>
            </b-col>
          </b-row>
          <!-- Sharpness and ElementType -->
          <b-row>
            <b-col>
              <b-dropdown style="width:100%" :text="info.sharpness.label">
                <b-dropdown-item
                  v-for="item in data.sharpnessArray"
                  :key="item.label"
                  @click="info.sharpness = item"
                  >{{ item.label }}</b-dropdown-item
                >
              </b-dropdown>
            </b-col>
            <b-col>
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
            </b-col>
          </b-row>
          <!-- Affinity and Rampage Slot -->
          <b-row>
            <b-col>
              Affinity
              <b-form-input
                v-model="info.affinity"
                type="number"
              ></b-form-input>
            </b-col>
            <b-col>
              Rampage Slot
              <b-badge
                style="cursor: pointer"
                @click="
                  info.rampageSlot == 1
                    ? (info.rampageSlot = 0)
                    : (info.rampageSlot = 1)
                "
                variant="dark"
                :class="info.rampageSlot >= 1 ? 'text-danger' : ''"
                pill
              >
                <i class="fas fa-circle"></i
              ></b-badge>
              <b-badge
                style="cursor: pointer"
                @click="
                  info.rampageSlot == 2
                    ? (info.rampageSlot = 0)
                    : (info.rampageSlot = 2)
                "
                variant="dark"
                :class="info.rampageSlot >= 2 ? 'text-danger' : ''"
                pill
              >
                <i class="fas fa-circle"></i
              ></b-badge>
              <b-badge
                style="cursor: pointer"
                @click="
                  info.rampageSlot == 3
                    ? (info.rampageSlot = 0)
                    : (info.rampageSlot = 3)
                "
                variant="dark"
                :class="info.rampageSlot >= 3 ? 'text-danger' : ''"
                pill
              >
                <i class="fas fa-circle"></i
              ></b-badge>
            </b-col>
          </b-row>

          <hr />
          <h5>Augments</h5>
          <div
            :key="lockAugment"
            :class="lockAugment ? 'text-primary' : 'text-light'"
            style="float: right; cursor: pointer; width: 1rem"
            @click="lockAugment = !lockAugment"
          >
            <i :class="lockAugment ? 'fas fa-lock' : 'fas fa-lock-open'"></i>
          </div>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 1 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 2 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 3 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 4 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 5 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <b-badge
            variant="dark"
            :class="augmentSlotsFilled >= 6 ? 'text-danger' : ''"
            pill
          >
            <i class="fas fa-circle"></i
          ></b-badge>
          <div v-for="augment in data.augments" :key="augment.key">
            <b-dropdown
              class="mt-1"
              style="width:100%"
              :text="info[augment.key].label"
            >
              <b-dropdown-item
                v-for="item in augment.values"
                :key="item.label"
                :disabled="
                  item.slots + augmentSlotsFilled - info[augment.key].slots > 5
                "
                @click="info[augment.key] = item"
                >{{ item.label }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
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
          <h5>Misc</h5>
          <b-row>
            <b-col cols="12">
              Dango Booster
              <b-dropdown style="width:100%" :text="info.dangoBooster.label">
                <b-dropdown-item
                  v-for="item in data.dangoBooster"
                  :key="item.label"
                  @click="info.dangoBooster = item"
                  >{{ item.label }}</b-dropdown-item
                >
              </b-dropdown>
            </b-col>
            <b-col>
              Power Drum
              <b-checkbox v-model="info.powerDrum"></b-checkbox>
            </b-col>
            <b-col>
              Rousing Roar
              <b-checkbox v-model="info.rousingRoar"></b-checkbox>
            </b-col>
          </b-row>
        </b-col>

        <!-- SKILL SECTION -->
        <b-col cols="7">
          <b-row>
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
                <b-dropdown
                  v-if="skill.key != 'bloodlust'"
                  style="width:100%"
                  :text="info[skill.key].label"
                >
                  <b-dropdown-item
                    v-for="item in skill.values"
                    :key="item.label"
                    @click="info[skill.key] = item"
                    >{{ item.label }}</b-dropdown-item
                  >
                </b-dropdown>
                <b-row v-else>
                  <b-col cols="10">
                    <b-dropdown
                      style="width:100%"
                      :text="info[skill.key].label"
                    >
                      <b-dropdown-item
                        v-for="item in skill.values"
                        :key="item.label"
                        @click="info[skill.key] = item"
                        >{{ item.label }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </b-col>
                  <b-col cols="1">
                    <b-checkbox
                      v-b-popover.hover.top="'recovered state'"
                      v-model="info.recovered"
                    ></b-checkbox>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <!-- MODIFIERS -->
            <b-col>
              <h5>Modifiers</h5>
              <div
                v-for="skill in data.modifiers"
                :key="skill.key"
                v-show="
                  ((skill.key != 'chargeMaster' ||
                    chargeMasterWeapons.includes(info.weaponType)) &&
                    !skill.meleeOnly &&
                    !skill.rangedOnly) ||
                    (skill.meleeOnly && !isRanged) ||
                    (skill.rangedOnly && isRanged)
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
                <b-badge
                  v-b-popover.hover.top="'2-slot Active during dragonblight'"
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
                  v-b-popover.hover.top="
                    '2-slot 5% Raw against specific species'
                  "
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
                  v-b-popover.hover.top="
                    '3-slot 20% Affinity while in demon mode'
                  "
                  ><i class="fas fa-question"></i></b-badge
              ></span>
              <b-checkbox
                v-if="info.weaponType == 'Dual Blades'"
                style="margin-bottom: 1rem"
                v-model="info.raging"
              ></b-checkbox>
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
                v-model="info.elementUp"
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
                v-model="info.infernalMelody"
              ></b-checkbox>
            </b-col>
            <!-- Optimiser -->
            <b-col cols="12">
              <hr />
              <b-overlay :key="isCalculating" :show="isCalculating">
                <b-button @click="optimizeWeapon()">Optimise Weapon</b-button>
                <br />
                <b-button
                  class="mt-1 mr-1"
                  variant="dark"
                  v-for="entry in optimizedArray"
                  :key="entry.weapon.label"
                  @click="
                    loadWeapon(entry.weapon);
                    loadAugments(entry.augments);
                  "
                >
                  {{ entry.weapon.label }} <br />
                  base: {{ entry.base }} avg: {{ entry.average }} crit:
                  {{ entry.crit }}
                </b-button>
              </b-overlay>
            </b-col>
          </b-row>
        </b-col>

        <!-- ANALYSIS -->
        <b-col cols="3" style="border-left: solid white 1px">
          <b-row>
            <b-col>
              <h5>Stats</h5>
              <div style="text-align: left">
                <b>Raw Attack: {{ Math.floor(effectiveRaw) }}</b
                ><br />
                <b>Element: {{ Math.floor(effectiveElement) }} </b><br />
                <b>Total: {{ Math.floor(effectiveTotal) }}</b
                ><br />
                <b>Affinity: {{ (effectiveAffinity * 100).toFixed(0) }}</b
                ><br /></div
            ></b-col>
            <b-col>
              <b-button @click="$bvModal.show('saveModal')" class="float-right"
                >Saves</b-button
              ></b-col
            >
          </b-row>
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
          <b-row
            v-for="(motionValue, index) in info.motionValueArray"
            :key="index + 'motionValue'"
          >
            <b-col cols="4">
              Motion Value
              <b-form-input
                v-model="motionValue.motionValuePhys"
                type="number"
              ></b-form-input>
            </b-col>
            <b-col cols="2">
              <small>Can Crit</small>
              <b-checkbox v-model="motionValue.canCrit"></b-checkbox>
            </b-col>
            <b-col cols="4">
              Element Mod
              <b-form-input
                v-model="motionValue.motionValueEle"
                type="number"
              ></b-form-input
            ></b-col>
            <b-col v-if="index == 0"
              ><br /><b-button
                size="xs"
                @click="
                  info.motionValueArray.push({
                    motionValuePhys: 0,
                    motionValueEle: 0,
                    canCrit: true,
                  })
                "
                ><i class="fas fa-plus"></i></b-button
            ></b-col>
            <b-col v-else
              ><br /><b-button
                @click="info.motionValueArray.splice(index, 1)"
                size="xs"
                ><i class="fas fa-minus"></i></b-button
            ></b-col>
          </b-row>
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
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import _ from "lodash";
import arrayFile from "./data/data.json";
import weapons from "./data/weapons.json";

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
      recovered: false,
      isCalculating: false,
      lockWeapon: false,
      lockAugment: false,
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
        attackBoostAugment: { label: "Attack Boost 0", raw: 0, slots: 0 },
        affinityBoostAugment: { label: "Affinity Boost 0", aff: 0, slots: 0 },
        elementBoostAugment: { label: "Element Boost 0", element: 0, slots: 0 },
        rampageSlotAugment: {
          label: "Rampage Slot 0",
          rampageSlot: 0,
          slots: 0,
        },
        rousingRoar: false,
        powerDrum: false,
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
        dangoBooster: { label: "None", raw: 0 },
        critElement: { label: "None", value: 1 },
        critBoost: { label: "None", value: 1.25 },
        wex: { label: "None", value: 0 },
        bloodlust: { label: "None", raw: 0, element: 0, affinity: 0 },
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
        normalUp: { label: "None", mod: 1 },
        pierceUp: { label: "None", mod: 1 },
        bludgeoner: { label: "None", mod: 1 },
        mindsEye: { label: "None", mod: 1 },
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
        motionValueArray: [
          { motionValuePhys: 50, motionValueEle: 1, canCrit: true },
        ],
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
      if (weapon.augments) this.loadAugments(weapon.augments);
      this.$bvModal.hide("weaponModal");
    },
    loadAugments(combination) {
      this.info.attackBoostAugment = this.data.augments.find(
        (x) => x.key == "attackBoostAugment"
      ).values[combination.attackBoostAugment];
      this.info.elementBoostAugment = this.data.augments.find(
        (x) => x.key == "elementBoostAugment"
      ).values[combination.elementBoostAugment];
      this.info.affinityBoostAugment = this.data.augments.find(
        (x) => x.key == "affinityBoostAugment"
      ).values[combination.affinityBoostAugment];
      this.info.rampageSlotAugment = this.data.augments.find(
        (x) => x.key == "rampageSlotAugment"
      ).values[combination.rampageSlotAugment];
    },
    optimizeWeapon() {
      this.isCalculating = true;
      // save old setup
      let oldSetup = _.cloneDeep(this.info);

      //iterate all weapons of selected type
      let resultArray = [];
      this.weapons[this.info.weaponType].forEach((weapon) => {
        this.loadWeapon(weapon);

        var combination = {
          attackBoostAugment: this.info.attackBoostAugment.label.slice(-1),
          affinityBoostAugment: this.info.affinityBoostAugment.label.slice(-1),
          elementBoostAugment: this.info.elementBoostAugment.label.slice(-1),
          rampageSlotAugment: this.info.rampageSlotAugment.label.slice(-1),
        };

        // test out augment combinations
        if (!this.lockAugment) {
          let augmentTestArray = [];
          for (var atkAug = 0; atkAug <= 3; atkAug++) {
            for (var eleAug = 0; eleAug <= 5; eleAug++) {
              for (var slotAug = 0; slotAug <= 1; slotAug++) {
                for (var affAug = 0; affAug <= 1; affAug++) {
                  combination = {
                    attackBoostAugment: atkAug,
                    affinityBoostAugment: affAug,
                    elementBoostAugment: eleAug,
                    rampageSlotAugment: slotAug,
                  };

                  this.loadAugments(combination);

                  if (this.augmentSlotsFilled <= 6) {
                    augmentTestArray.push({
                      combination: combination,
                      base: this.hitTotal,
                      average: this.hitAverageTotal,
                      crit: this.hitCritTotal,
                    });
                  }
                }
              }
            }
          }

          // find best augment combination
          augmentTestArray.sort((x, y) => y.average - x.average);
          combination = augmentTestArray[0].combination;
          this.loadAugments(combination);
        }

        // Add to final list
        resultArray.push({
          augments: combination,
          weapon: weapon,
          base: this.hitTotal,
          average: this.hitAverageTotal,
          crit: this.hitCritTotal,
        });
      });

      // find top 10
      resultArray.sort((x, y) => y.average - x.average);
      resultArray = resultArray.splice(0, 10);
      this.optimizedArray = resultArray;

      // restore old setup
      this.info = oldSetup;
      this.isCalculating = false;
    },
    applyHitzoneRaw(base, index) {
      var total = base;

      if (this.info.species && this.effectiveRampageSlots >= 2)
        total += this.info.raw * 0.05;

      // Melee Hit skills
      if (!this.isRanged) {
        if (!this.isWeakspot) total *= this.info.mindsEye.mod;

        if (this.info.sharpness.raw <= 1) total *= this.info.bludgeoner.mod;
        else if (
          this.info.sharpness.raw <= 1.05 &&
          this.info.bludgeoner.label == "Level 3"
        )
          total *= this.info.bludgeoner.mod;
      } else {
        total *= this.info.normalUp.mod;
        total *= this.info.pierceUp.mod;
      }

      // Sharpness
      total *= this.info.sharpness.raw;
      // Hitzone
      total *= this.info.partPhys / 100.0;
      // MotionValue
      total *= this.info.motionValueArray[index].motionValuePhys / 100.0;

      return total;
    },
    applyHitzoneElement(base, index) {
      var total = base;

      //Element Exploit
      if (this.info.partEle[this.info.type] >= 20)
        total += this.info.element * this.info.elementExploit.mod; //! TO BE TESTED
      //Elembane
      if (
        this.effectiveRampageSlots >= 3 &&
        this.info.elemBane &&
        this.info.partEle[this.info.type] >= 25
      )
        total += this.info.element * 0.15; //! TO BE TESTED

      // Sharpness
      total *= this.info.sharpness.element;
      // Hitzone
      total *= this.info.partEle[this.info.type] / 100.0;
      // MotionValue
      total *= this.info.motionValueArray[index].motionValueEle;

      return total;
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
    isRanged() {
      return ["Bow", "Light Bowgun", "Heavy Bowgun"].includes(
        this.info.weaponType
      );
    },
    isWeakspot() {
      return (this.info.partPhys / 100.0) * this.info.sharpness.raw >= 0.42;
    },
    augmentSlotsFilled() {
      let total = 0;
      total += this.info.attackBoostAugment.slots;
      total += this.info.affinityBoostAugment.slots;
      total += this.info.elementBoostAugment.slots;
      total += this.info.rampageSlotAugment.slots;

      return total;
    },
    // UI STATS
    effectiveRampageSlots() {
      let total = this.info.rampageSlot;
      total += this.info.rampageSlotAugment.rampageSlot;
      return total;
    },
    effectiveAffinity() {
      if (!this.info) return 0;
      let total = (
        (parseInt(this.info.affinity) +
          parseInt(this.isWeakspot ? this.info.wex.value : 0) +
          parseInt(this.info.affinityBoostAugment.aff) +
          //Raging Jewel
          parseInt(
            this.info.raging &&
              this.effectiveRampageSlots >= 3 &&
              this.info.weaponType == "Dual Blades"
              ? 20
              : 0
          ) +
          parseInt(this.info.affinityUp ? 20 : 0) +
          parseInt(this.info.rousingRoar ? 30 : 0) +
          parseInt(
            this.effectiveRampageSlots >= 3 ? this.info.kushalaSoul.value : 0
          ) +
          parseInt(this.info.recovered ? this.info.bloodlust.affinity : 0) +
          parseInt(this.info.latentPower.value) +
          parseInt(
            this.effectiveRampageSlots >= 2 ? this.info.narwaSoul.value : 0
          ) +
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

      //Augment
      total += this.info.attackBoostAugment.raw;

      //Buffs
      if (this.info.powerCharm) total += 6;
      if (this.info.powerTalon) total += 9;
      if (this.info.megaDemonDrug) total += 7;
      if (this.info.demonDrug) total += 5;
      if (this.info.demonPowder) total += 10;
      if (this.info.mightSeed) total += 10;

      //mods
      if (this.info.powerDrum) total += this.info.raw * 0.05;
      total += this.info.raw * this.info.grinder.raw;
      total += this.info.raw * this.info.attackBoost.mod;
      total += this.info.raw * this.info.dragonHeart.mod;
      total += this.info.raw * this.info.heroics.mod;
      total += this.info.raw * this.info.fortify.mod;

      //extra
      if (this.info.magna) total += 12;
      if (!this.info.recovered) total += this.info.bloodlust.raw;
      total += this.info.petalace.raw;
      total += this.info.dangoBooster.raw;
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

      //Augment
      total += this.info.elementBoostAugment.element;

      //multipliers
      if (
        this.effectiveRampageSlots >= 2 &&
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
      if (!this.info.recovered) total += this.info.bloodlust.element;
      total += this.info.chainCrit.element;
      total += this.info.coalescence.element;
      total += this.info.elementAttack.element;

      //Scroll
      if (this.info.scroll == "blue")
        total += this.info.element * this.info.mailOfHellfire.element;
      else total += this.info.dereliction.element;

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
    // HITZONE / MOTION VALUE / SHARPNESS
    hitRaw() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(this.applyHitzoneRaw(this.effectiveRaw, index));
      });
      return total;
    },
    hitElement() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(
          this.applyHitzoneElement(this.effectiveElement, index)
        );
      });
      return total;
    },

    hitAverageRaw() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(
          this.applyHitzoneRaw(
            skill.canCrit ? this.averageRaw : this.effectiveRaw,
            index
          )
        );
      });
      return total;
    },
    hitAverageElement() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(
          this.applyHitzoneElement(
            skill.canCrit ? this.averageElement : this.effectiveElement,
            index
          )
        );
      });
      return total;
    },

    hitCritRaw() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(
          this.applyHitzoneRaw(
            skill.canCrit ? this.critRaw : this.effectiveRaw,
            index
          )
        );
      });
      return total;
    },
    hitCritElement() {
      var total = 0;
      this.info.motionValueArray.forEach((skill, index) => {
        total += Math.floor(
          this.applyHitzoneElement(
            skill.canCrit ? this.critElement : this.effectiveElement,
            index
          )
        );
      });
      return total;
    },

    // Final Values
    hitTotal() {
      return this.hitRaw + this.hitElement;
    },

    hitAverageTotal() {
      return this.hitAverageRaw + this.hitAverageElement;
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
