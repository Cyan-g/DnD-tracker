<template>
  <div>
    <b-form-group v-for="(sell, i) in priceArray" :key="i">
      <b-card>
        <b-row
          ><b-col cols="2"
            ><label>{{ sell.name }}</label></b-col
          >
          <b-col cols="3"
            ><b-form-input
              :disabled="!editMode"
              v-model.number="priceArray[i].price"
            ></b-form-input
          ></b-col>
          <b-col cols="1">
            <b-button
              v-b-popover.hover.top="'Add this sell'"
              v-if="sell.price > 0"
              variant="outline-success"
              @click="addSells(sell)"
              ><i class="fas fa-plus"></i></b-button
          ></b-col>
          <b-col cols="2"
            ><b-button
              v-b-popover.hover.top="'Add with discount'"
              variant="outline-info"
              class="ml-2"
              @click="discountModal(sell)"
              ><i class="fas fa-gift"></i></b-button
          ></b-col>
          <b-col cols="1"
            ><b-button
              v-if="sell.subsells"
              v-b-toggle="sell.name.replace(/\s/g, '') + String(i)"
              ><i class="fas fa-chevron-down"></i></b-button
          ></b-col>
          <b-col cols="1"
            ><b-button
              v-if="editMode"
              @click="deletePackage(i)"
              variant="outline-danger"
              ><i class="fas fa-times"></i></b-button></b-col
        ></b-row>
      </b-card>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["editMode", "priceArray"],
};
</script>
