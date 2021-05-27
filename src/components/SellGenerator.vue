<template
  ><b-modal size="xl" hide-footer title="Add a Sell" id="sell-form">
    <b-form-group>
      <b-row>
        <b-col class="border-right">
          <b-card
            ><b-row
              ><b-col cols="4"
                ><b-form-input
                  placeholder="name"
                  v-model="customSell.name"
                ></b-form-input
              ></b-col>
              <b-col cols="4"
                ><b-form-input
                  @blur="calcGlobalPrice(customSell, lastTotalPrice)"
                  v-model.number="customSell.price"
                ></b-form-input
              ></b-col>
              <b-col cols="1"></b-col>
              <b-col cols="1"
                ><b-button
                  v-if="customSell.subsells.length > 0"
                  v-b-toggle="'customSellx'"
                  ><i class="fas fa-chevron-down"></i></b-button></b-col
            ></b-row>
            <div>
              <b-collapse id="customSellx">
                <hr />
                <prices-tree
                  @remove="removeFromCustomArray"
                  :priceArray="customSell.subsells"
                  :editMode="true"
                  :priceMode="false"
                ></prices-tree>
              </b-collapse>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <prices-tree
            @add="addToCustomArray"
            :priceArray="priceArray"
            :editMode="false"
            :priceMode="false"
          ></prices-tree>
        </b-col>
      </b-row>
      <hr />
      <b-form-group class="mt-2">
        <b-col cols="5"></b-col>
        <b-button
          v-b-popover.hover.top="'Add this sell'"
          variant="outline-success"
          @click="$emit('add', customSell)"
          :disabled="customSell.subsells.length < 1 || customSell.price < 1"
          ><i class="fas fa-plus"></i> Finish</b-button
        ><b-button
          class="ml-2"
          v-b-popover.hover.top="'Reset Template'"
          variant="outline-danger"
          @click="reset()"
          ><i class="fas fa-times"></i> Reset</b-button
        ><b-button
          class="ml-2"
          :disabled="
            customSell.subsells.length < 1 || customSell.name.length < 1
          "
          v-b-popover.hover.top="'Remember this Template'"
          variant="outline-success"
          @click="saveToLocalStorage()"
          ><i class="fas fa-save"></i> Save</b-button
        >
      </b-form-group>
    </b-form-group>
  </b-modal>
</template>

<script>
export default {
  props: ["priceArray"],
  data() {
    return {
      correction: 0,
      lastTotalPrice: 0,
      customSell: {
        name: "Custom Sell",
        price: 0,
        subsells: [],
      },
    };
  },
  methods: {
    reset() {
      this.customSell = {
        name: "Custom Sell",
        price: 0,
        subsells: [],
      };
    },
    saveToLocalStorage() {
      let priceSheat = JSON.parse(localStorage.getItem("prices"));
      if (priceSheat.includes((x) => x.name == this.customSell.name)) return;
      priceSheat.push(this.customSell);
      localStorage.setItem("prices", JSON.stringify(priceSheat));
      this.$emit("update");
    },
    removeFromCustomArray(value) {
      console.log(value);
      this.customSell.price -= value;
      this.lastTotalPrice -= value;
    },
    addToCustomArray(sell) {
      let newSell = JSON.parse(JSON.stringify(sell));
      let sum = this.priceSum(newSell);
      this.scalePrice(newSell, sum);
      this.customSell.subsells.push(newSell);
      this.customSell.price += newSell.price;
      this.lastTotalPrice += newSell.price;
      this.calcGlobalPrice(this.customSell, this.priceSum(this.customSell));
    },
    calcGlobalPrice(sellObject, oldPrice) {
      sellObject.price = this.scalePrice(sellObject, oldPrice);
      this.lastTotalPrice = sellObject.price;
    },
    scalePrice(sellObject, oldPrice) {
      let factor = sellObject.price / oldPrice;
      let original = sellObject.price;
      this.scalePriceRecursive(sellObject, factor);
      this.correction = original - sellObject.price;
      this.correctPrice(sellObject);
      this.correction = 0;
      return sellObject.price;
    },
    scalePriceRecursive(sellObject, factor) {
      if (sellObject.subsells.length > 0) {
        sellObject.price = 0;
        sellObject.subsells.forEach((subsell) => {
          sellObject.price += this.scalePriceRecursive(subsell, factor);
        });
      } else {
        sellObject.price = Math.round(sellObject.price * factor);
      }
      return sellObject.price;
    },
    priceSum(sellObject) {
      let sum = 0;
      if (sellObject.subsells.length > 0) {
        sellObject.subsells.forEach((subsell) => {
          sum += this.priceSum(subsell);
        });
      } else {
        sum += sellObject.price;
      }
      return sum;
    },
    correctPrice(sellObject) {
      if (sellObject.subsells.length > 0) {
        sellObject.price += this.correction;
        this.correctPrice(sellObject.subsells[0]);
      } else {
        sellObject.price += this.correction;
      }
    },
  },
};
</script>
