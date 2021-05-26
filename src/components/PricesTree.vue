<template>
  <div>
    <b-form-group v-for="(sell, i) in priceArray" :key="i">
      <b-card>
        <b-row
          ><b-col cols="4"
            ><label>{{ sell.name }}</label></b-col
          >
          <b-col cols="4"
            ><b-form-input
              :disabled="!priceMode"
              v-model.number="priceArray[i].price"
            ></b-form-input
          ></b-col>
          <b-col cols="1">
            <b-button
              v-if="editMode"
              v-b-popover.hover.top="'Remove this sell'"
              variant="outline-danger"
              @click="removeSell(sell.price, i)"
              ><i class="fas fa-times"></i></b-button
          ></b-col>
          <b-col cols="1">
            <b-button
              v-if="sell.price > 0 && !editMode"
              v-b-popover.hover.top="'Add this sell'"
              variant="outline-success"
              @click="$emit('add', sell)"
              ><i class="fas fa-plus"></i></b-button
          ></b-col>
          <b-col cols="1"
            ><b-button
              class="ml-1"
              v-if="sell.subsells.length > 0"
              v-b-toggle="sell.name.replace(/\s/g, '') + String(i) + editMode"
              ><i class="fas fa-chevron-down"></i></b-button></b-col
        ></b-row>
        <div v-if="sell.subsells.length > 0">
          <b-collapse :id="sell.name.replace(/\s/g, '') + String(i) + editMode"
            ><hr />
            <prices-tree
              @remove="emitRemove"
              @add="addSell"
              :priceArray="sell.subsells"
              :editMode="editMode"
              :priceMode="priceMode"
            ></prices-tree>
          </b-collapse>
        </div>
      </b-card>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["editMode", "priceMode", "priceArray"],
  methods: {
    emitRemove(value) {
      this.priceArray.forEach((sell) => {
        sell.price = 0;
        sell.subsells.forEach((subsell) => {
          sell.price += subsell.price;
        });
      });
      this.$emit("remove", value);
    },
    addSell(sell) {
      this.$emit("add", sell);
    },
    removeSell(value, index) {
      this.priceArray.splice(index, 1);
      this.$emit("remove", value);
    },
  },
};
</script>
