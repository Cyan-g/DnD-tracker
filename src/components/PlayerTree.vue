<template>
  <div>
    <b-row class="mt-3" v-for="(sell, i) in sellArray" :key="i">
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
      ></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["sellArray"],
};
</script>
