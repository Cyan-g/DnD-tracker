<template>
  <div id="app">
    <h1>Coinculator</h1>
    <hr />
    <!-- discount modal -->
    <b-modal ref="discount-input" title="Add package deal" hide-footer>
      <label>Discounted Price:</label>
      <b-form-input v-model.number="discount"></b-form-input>
      <hr />
      <b-row>
        <b-col cols="8"></b-col>
        <b-button
          variant="outline-secondary"
          @click="$refs['discount-input'].hide()"
          >Cancel</b-button
        >
        <b-button
          class="ml-2"
          variant="outline-success"
          @click="addSellPackage()"
          >Add</b-button
        >
      </b-row>
    </b-modal>
    <!-- add sell form  -->
    <b-modal size="xl" hide-footer title="Add a Sell" id="sell-form">
      <b-form-group v-for="(pack, i) in prices" :key="i">
        <b-card>
          <b-row
            ><b-col cols="2"
              ><label>{{ pack.name }}</label></b-col
            >
            <b-col cols="3"
              ><b-form-input v-model.number="prices[i].price"></b-form-input
            ></b-col>
            <b-col cols="1">
              <b-button variant="outline-success" @click="addSells(pack)"
                ><i class="fas fa-plus"></i></b-button
            ></b-col>
            <b-col cols="2"
              ><b-button
                variant="outline-warning"
                class="ml-2"
                @click="discountModal(pack)"
                ><i class="fas fa-gift"></i></b-button
            ></b-col>
            <b-col cols="1"
              ><b-button v-if="pack.subsells" v-b-toggle="pack.name + String(i)"
                ><i class="fas fa-chevron-down"></i></b-button></b-col
          ></b-row>
          <div v-if="pack.subsells">
            <hr />
            <b-collapse
              :id="pack.name + String(i)"
              class="ml-2 mt-2"
              v-for="(sell, j) in pack.subsells"
              :key="j"
            >
              <b-row
                ><b-col cols="4"
                  ><label>{{ pack.subsells[j].name }}</label></b-col
                >
                <b-col cols="3"
                  ><b-form-input
                    v-model.number="prices[i].subsells[j].price"
                  ></b-form-input
                ></b-col>
                <b-col cols="3">
                  <b-button variant="outline-success" @click="addSells(sell)"
                    ><i class="fas fa-plus"></i></b-button></b-col
                ><b-col
                  ><b-button
                    v-if="sell.subsells"
                    v-b-toggle="sell.name + String(j)"
                    ><i class="fas fa-chevron-down"></i></b-button></b-col
              ></b-row>
              <div v-if="sell.subsells">
                <hr />
                <b-collapse
                  :id="sell.name + String(j)"
                  class="ml-2 mt-2"
                  v-for="(boss, k) in sell.subsells"
                  :key="k"
                >
                  <b-row
                    ><b-col cols="1"></b-col
                    ><b-col cols="4"
                      ><label>{{ sell.subsells[k].name }}</label></b-col
                    >
                    <b-col cols="3"
                      ><b-form-input
                        v-model.number="prices[i].subsells[j].subsells[k].price"
                      ></b-form-input
                    ></b-col>
                    <b-col cols="3">
                      <b-button
                        variant="outline-success"
                        @click="addSells(boss)"
                        ><i class="fas fa-plus"></i></b-button></b-col
                  ></b-row>
                </b-collapse>

                <hr />
              </div>
            </b-collapse>
          </div>
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
      <b-row class="mt-3" v-for="(sell, i) in sells" :key="i">
        <b-col cols="1">
          <b-form-group>
            <label>{{ sell.name }}</label>
            <b-form-input v-model.number="sell.price"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-for="(player, j) in sell.players" :key="j">
          <b-button
            pill
            :variant="player ? 'warning' : 'secondary'"
            @click="toggleValue(i, j)"
            ><i class="fas fa-coins"></i></b-button
        ></b-col>
        <b-col cols="1.5"
          ><b-button
            @click="removeSell(i)"
            variant="outline-danger"
            style="margin-right: 3rem; width: 2.5rem"
            ><i class="fas fa-times"></i></b-button
        ></b-col> </b-row
      ><b-button
        class="mt-2 mb-2"
        style="margin-left:1rem"
        pill
        variant="outline-success"
        v-b-modal="'sell-form'"
        ><i class="fas fa-plus"></i
      ></b-button>

      <!-- payments -->
      <b-row
        ><b-col
          ><b-row
            ><b-col cols="1">
              <b-row
                >Total: {{ calcLeftover().total }}
                <img
                  class="ml-1"
                  style="border-radius: 50%; height: 1.5rem"
                  src="https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png"
              /></b-row>
              <b-row
                >Rest: {{ calcLeftover().rest }}
                <img
                  class="ml-1"
                  style="border-radius: 50%; height: 1.5rem"
                  src="https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png"/></b-row></b-col
            ><b-col v-for="(player, index) in players" :key="index">
              <b-form-input v-model="players[index].name"></b-form-input>
              <div class="mt-2">
                <span style="font-size: 2rem">
                  {{ calcPayment(index) || 0 }}</span
                >
                <img
                  class="mb-3 ml-1"
                  style="border-radius: 50%; height: 2rem"
                  src="https://cyan-g.github.io/EU-Coins/Mystic_Coin.34ceded9.png"
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
          src="https://cyan-g.github.io/EU-Coins/discord.1f9972ba.png"
        />
        Cyan#2360</b-button
      >
    </footer>
  </div>
</template>

<script>
import priceJSON from "./data/prices.json";

export default {
  name: "App",
  data() {
    return {
      originalPackage: null,
      discount: 0,
      version: 1.21,
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
    clearSells() {
      this.sells = [];
      this.discount = 0;
      this.originalPackage = null;
    },
    discountModal(pack) {
      this.discount = Math.ceil(pack.price);
      this.originalPackage = JSON.parse(JSON.stringify(pack));
      this.$refs["discount-input"].show();
      this.originalPackage.price = 0;
      this.originalPackage.subsells.forEach((sell) => {
        if (sell.subsells) {
          sell.subsells.forEach((subsell) => {
            this.originalPackage.price += subsell.price;
          });
        } else {
          this.originalPackage.price += sell.price;
        }
      });
    },
    addSellPackage() {
      this.$refs["discount-input"].hide();
      let modifier = this.discount / this.originalPackage.price;

      let oldTotal = 0;
      this.sells.forEach((x) => {
        oldTotal += x.price;
      });

      if (this.originalPackage.subsells) {
        this.originalPackage.subsells.forEach((sell) => {
          if (sell.subsells) {
            sell.subsells.forEach((subsell) => {
              this.addSells({
                name: subsell.name,
                price: Math.ceil(subsell.price * modifier),
              });
            });
          } else {
            this.addSells({
              name: sell.name,
              price: Math.ceil(sell.price * modifier),
            });
          }
        });
      }

      let newTotal = 0;
      this.sells.forEach((x) => {
        newTotal += x.price;
      });

      let delta = newTotal - (this.discount + oldTotal);
      for (let i = 0; i < delta; i++) {
        this.sells[i].price--;
      }
    },
    calcLeftover() {
      let total = 0;
      let playerTotal = 0;
      this.sells.forEach((x) => {
        total += x.price;
      });
      this.players.forEach((x) => {
        playerTotal += x.coins;
      });
      return { total: total, rest: total - playerTotal };
    },
    calcPayment(playerindex) {
      let coins = 0;
      this.sells.forEach((sell) => {
        if (sell.players[playerindex]) {
          let totalPlayers = 0;
          sell.players.forEach((x) => {
            if (x) totalPlayers++;
          });
          coins += sell.price / totalPlayers;
        }
      });
      this.players[playerindex].coins = Math.floor(coins);
      return Math.floor(coins);
    },
    toggleValue(i, j) {
      this.sells[i].players[j] = !this.sells[i].players[j];
      this.$forceUpdate();
    },
    removePlayer() {
      if (this.players.length > 1) {
        this.players.pop();
        this.sells.forEach((sell) => sell.players.pop());
      }
    },
    addPlayer() {
      this.players.push({
        name: "Player" + (this.players.length + 1),
        coins: 0,
      });
      this.sells.forEach((sell) => sell.players.push(true));
    },
    addSells(sell) {
      let newSell = { name: sell.name, price: sell.price, players: [] };
      newSell.price = Math.ceil(newSell.price);
      this.players.forEach(() => {
        newSell.players.push(true);
      });

      this.sells.push(newSell);
    },
    removeSell(index) {
      this.totalPrice -= this.sells[index].price;
      this.sells.splice(index, 1);
    },
  },
  created() {
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
