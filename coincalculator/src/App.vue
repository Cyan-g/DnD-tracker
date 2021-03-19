<template>
  <div id="app">
    <h1>EU-CoinCalculator</h1>
    <!-- sell form  -->
    <b-modal hide-footer title="Add a Sell" id="sell-form">
      <b-form-group v-for="(wing, i) in prices" :key="i">
        <b-card>
          <b-row
            ><b-col cols="2"
              ><label>{{ wing.name }}</label></b-col
            >
            <b-col cols="3"
              ><b-form-input v-model.number="prices[i].price"></b-form-input
            ></b-col>
            <b-col cols="2">
              <b-button variant="outline-success" @click="addSells(wing)"
                ><i class="fas fa-plus"></i></b-button></b-col
          ></b-row>
          <hr />
          <b-row class="ml-2 mt-2" v-for="(boss, j) in wing.bosses" :key="j">
            <b-col cols="4"
              ><label>{{ wing.bosses[j].name }}</label></b-col
            >
            <b-col cols="3"
              ><b-form-input
                v-model.number="prices[i].bosses[j].price"
              ></b-form-input
            ></b-col>
            <b-col cols="3">
              <b-button variant="outline-success" @click="addSells(boss)"
                ><i class="fas fa-plus"></i></b-button
            ></b-col>
          </b-row>
        </b-card>
      </b-form-group>
    </b-modal>
    <b-card>
      <!-- players -->
      <b-row
        ><b-col
          ><b-row
            ><b-col cols="1">Players:</b-col
            ><b-col v-for="(player, index) in players" :key="index">
              <b-form-input v-model="players[index].name"></b-form-input>
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

      <!-- sells -->
      <b-row v-for="(sell, index) in sells" :key="index">
        <b-col cols="1">
          <b-form-group>
            <label>{{ sell.name }}</label>
            <b-form-input v-model.number="sell.price"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-for="(player, index) in players" :key="index">
          <b-form-radio size="lg"></b-form-radio>
        </b-col>
        <b-col cols="1.5"></b-col>
      </b-row>
      <b-button
        class="mt-2 mb-2"
        style="margin-left:2rem"
        pill
        variant="outline-success"
        v-b-modal="'sell-form'"
        ><i class="fas fa-plus"></i
      ></b-button>

      <!-- payments -->
      <b-row
        ><b-col
          ><b-row
            ><b-col cols="1">Payment:</b-col
            ><b-col v-for="(player, index) in players" :key="index">
              <b-form-input v-model="players[index].name"></b-form-input>
              <b-button class="mt-2" variant="success">{{
                players[index].coins
              }}</b-button>
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
  </div>
</template>

<script>
import priceJSON from "./data/prices.json";

export default {
  name: "App",
  data() {
    return {
      prices: [],
      players: [
        { name: "Player1", coins: 0 },
        { name: "Player2", coins: 0 },
        { name: "Player3", coins: 0 },
        { name: "Player4", coins: 0 },
        { name: "Player5", coins: 0 },
        { name: "Player6", coins: 0 },
        { name: "Player7", coins: 0 },
        { name: "Player8", coins: 0 },
      ],
      sells: [],
    };
  },
  watch: {
    prices: {
      handler() {
        localStorage.setItem("prices", JSON.stringify(this.prices));
      },
      deep: true,
    },
  },
  methods: {
    removePlayer() {
      this.players.pop();
    },
    addPlayer() {
      this.players.push({
        name: "Player" + (this.players.length + 1),
        coins: 0,
      });
    },
    addSells(sell) {
      this.sells.push({ name: sell.name, price: sell.price });
      this.players.forEach((player) => {
        player.boss[this.sells.length] = true;
      });
    },
    removeSell() {},
    savePrices() {},
  },
  created() {
    let storedPrices = localStorage.getItem("prices");
    if (!storedPrices) {
      this.prices = priceJSON;
      localStorage.setItem("prices", JSON.stringify(this.prices));
    } else {
      this.prices = JSON.parse(storedPrices);
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
