<template>
  <div id="app">
    <b-card> <h1>Coinculator</h1></b-card>
    <hr />

    <!-- add sell form  -->
    <sell-generator
      @update="updatePriceData()"
      @add="addSell"
      :priceArray="prices"
    ></sell-generator>
    <!-- players -->
    <b-card>
      <b-row
        ><b-button
          v-if="sells.length > 0"
          class="mt-2 mb-2"
          pill
          variant="outline-danger"
          @click="clearSells()"
          ><i class="fas fa-times"></i> Clear</b-button
        ><b-button
          class="mt-2 mb-2"
          pill
          variant="outline-success"
          v-b-modal="'sell-form'"
          ><i class="fas fa-plus"></i> Add Sell</b-button
        ></b-row
      >
      <b-row
        ><b-col
          ><b-row
            ><b-col cols="1">Players:</b-col
            ><b-col v-for="(player, index) in players" :key="index">
              <b-form-input v-model.trim="players[index].name"></b-form-input>
            </b-col>
            <b-col cols="1.5"
              ><b-button variant="outline-danger" @click="removePlayer()"
                ><i class="fas fa-minus"></i
              ></b-button>
              <b-button
                variant="outline-success"
                class="ml-2"
                @click="addPlayer()"
                ><i class="fas fa-plus"></i></b-button></b-col></b-row></b-col
      ></b-row>
      <hr />

      <!-- sells -->
      <player-tree @toggle="toggleValue" :sellArray="sells" :depth="0">
      </player-tree>

      <!-- payments -->
      <hr />
      <b-row
        ><b-col
          ><b-row
            ><b-col cols="1">
              <b-row
                >Total: {{ calcTotalRecursive(sells) }}
                <img
                  class="ml-1"
                  style="border-radius: 50%; height: 1.5rem"
                  :src="
                    'https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png'
                  "
              /></b-row>
              <b-row
                >Rest: {{ calcLeftover() }}
                <img
                  class="ml-1"
                  style="border-radius: 50%; height: 1.5rem"
                  :src="
                    'https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png'
                  "/></b-row></b-col
            ><b-col v-for="(player, index) in players" :key="index">
              <b-form-input v-model.trim="players[index].name"></b-form-input>
              <div class="mt-2">
                <span style="font-size: 2rem">
                  {{
                    Math.floor(calcPaymentRecursive(sells, index)) || 0
                  }}</span
                >
                <img
                  class="mb-3 ml-1"
                  style="border-radius: 50%; height: 2rem"
                  :src="
                    'https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png'
                  "
                />
              </div>
            </b-col>
            <b-col cols="1.5"
              ><b-button
                style="height: 2.5rem"
                variant="outline-danger"
                @click="removePlayer()"
                ><i class="fas fa-minus"></i
              ></b-button>
              <b-button
                style="height: 2.5rem"
                variant="outline-success"
                class="ml-2"
                @click="addPlayer()"
                ><i class="fas fa-plus"></i></b-button
            ></b-col>
          </b-row> </b-col
      ></b-row>
    </b-card>

    <!-- footer -->
    <hr />
    <b-card>
      <footer id="smallprint" class="pb-2 pt-2">
        v:{{ version }}
        <br />
        Bugs? Suggestions? Message me
        <b-button
          size="sm"
          pill
          href="https://discordapp.com/users/294831845114380290"
          ><img
            style="height: 1rem"
            :src="'https://cyan-g.github.io/EU-Coins/discord.1f9972ba.png'"
          />
          Cyan#2360</b-button
        >
        <br />
        Need help tracking reactions on your Discord server? Invite the
        <a
          href="https://discord.com/oauth2/authorize?client_id=786255929108201492&scope=bot&permissions=330832"
          >SignUp-Tracker</a
        >
      </footer></b-card
    >
  </div>
</template>

<script>
import priceJSON from "./data/prices.json";
import { required, minLength } from "vuelidate/lib/validators";
import SellGenerator from "./components/SellGenerator.vue";

export default {
  created() {
    this.updatePriceData();
  },
  components: { SellGenerator },
  name: "App",
  data() {
    return {
      provision: 0,
      version: 1.23,
      prices: [],
      players: [
        { name: "Player1" },
        { name: "Player2" },
        { name: "Player3" },
        { name: "Player4" },
        { name: "Player5" },
        { name: "Player6" },
        { name: "Player7" },
        { name: "Player8" },
      ],
      sells: [],
    };
  },
  validations: {
    newSellPackage: {
      name: {
        required,
        minLength: minLength(3),
      },
      subsells: {
        $each: {
          name: {
            required,
            minLength: minLength(3),
          },
          subsells: {
            $each: {
              name: {
                required,
                minLength: minLength(3),
              },
            },
          },
        },
      },
    },
  },
  watch: {
    provision: {
      handler() {
        if (this.provision <= 0) this.provision = 0;
        if (this.provision >= 100) this.provision = 100;
      },
    },
    prices: {
      handler() {
        localStorage.setItem("prices", JSON.stringify(this.prices));
      },
      deep: true,
    },
  },
  methods: {
    toggleValue(payload) {
      let sellObject = this.sells[payload.sellIndex];
      this.toggleValueRecursive(payload, sellObject);
      this.$forceUpdate;
    },
    toggleValueRecursive(payload, sellObject) {
      console.log(payload, sellObject);
      if (payload.playerIndex) {
        sellObject.players[payload.playerIndex] = !sellObject.players[
          payload.playerIndex
        ];
      } else {
        let subSell = sellObject.subsells[payload.sellIndex];
        this.toggleValueRecursive(payload.payload, subSell);
      }
    },
    resetPrices() {
      this.prices = priceJSON;
    },
    clearSells() {
      this.sells = [];
    },
    calcTotalRecursive(sellArray) {
      let sum = 0;
      sellArray.forEach((sell) => {
        if (sell.subsells.length > 0) {
          sum += this.calcTotalRecursive(sell.subsells);
        } else {
          sum += sell.price;
        }
      });
      return sum;
    },
    calcLeftover() {
      let total = this.calcTotalRecursive(this.sells);
      let playerSum = 0;
      this.players.forEach((player, index) => {
        playerSum += this.calcPaymentRecursive(this.sells, index);
      });
      return total - playerSum;
    },
    calcPaymentRecursive(sellArray, playerindex) {
      let sum = 0;
      sellArray.forEach((sell) => {
        if (sell.subsells.length > 0) {
          sum += this.calcPaymentRecursive(sell.subsells, playerindex);
        } else {
          if (sell.players[playerindex]) {
            let totalPlayers = 0;
            sell.players.forEach((player) => {
              if (player) totalPlayers++;
            });
            sum += sell.price / totalPlayers;
          }
        }
      });
      return sum;
    },
    removePlayer() {
      if (this.players.length > 1) {
        this.players.pop();
        this.removePlayerRecursive(this.sells);
      }
    },
    removePlayerRecursive(sellArray) {
      sellArray.forEach((sell) => {
        sell.players.pop();
        this.removePlayerRecursive(sell.subsells);
      });
    },
    addPlayer() {
      let name = "Player" + (this.players.length + 1);
      this.players.push({
        name: name,
      });
      this.addPlayerRecursive(this.sells);
    },
    addPlayerRecursive(sellArray) {
      sellArray.forEach((sell) => {
        sell.players.push(true);
        this.addPlayerRecursive(sell.subsells);
      });
    },
    addSell(sell) {
      this.populateSellRecursive(sell);
      this.sells.push(sell);
    },
    populateSellRecursive(sell) {
      sell.players = [];
      this.players.forEach(() => {
        sell.players.push(true);
        if (sell.subsells.length > 0) {
          sell.subsells.forEach((subsell) => {
            this.populateSellRecursive(subsell);
          });
        }
      });
    },
    removeSell(index) {
      this.totalPrice -= this.sells[index].price;
      this.sells.splice(index, 1);
    },
    updatePriceData() {
      let storedPrices = localStorage.getItem("prices");
      let version = JSON.parse(localStorage.getItem("version"));
      if (!storedPrices || !version || version < this.version) {
        this.prices = priceJSON;
        localStorage.setItem("prices", JSON.stringify(this.prices));
        localStorage.setItem("version", JSON.stringify(this.version));
      } else {
        this.prices = JSON.parse(storedPrices);
      }
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
