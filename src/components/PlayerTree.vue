<template>
  <div>
    <b-card class="mt-1 darktheme" v-for="(sell, i) in sellArray" :key="i">
      <b-row>
        <b-col cols="1">
          <b-form-group>
            <label>{{ sell.name }}</label>
            <b-form-input v-model.number="sell.price"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col v-for="(player, j) in sell.players" :key="j">
          <b-button
            pill
            @click="$emit('toggle', { sellIndex: i, playerIndex: j })"
            ><i
              :class="
                player
                  ? 'fas fa-coins text-warning'
                  : 'fas fa-coins text-secondary'
              "
            ></i></b-button
        ></b-col>
        <b-col cols="1"
          ><b-button
            v-if="sell.subsells.length > 0"
            v-b-toggle="sell.name.replace(/\s/g, '') + String(-1 * i)"
            ><span class="when-opened">
              <i class="fa fa-minus" aria-hidden="true"></i
            ></span>
            <span class="when-closed">
              <i class="fa fa-plus" aria-hidden="true"></i></span></b-button
        ></b-col>
      </b-row>
      <b-collapse
        v-if="sell.subsells.length > 0"
        :id="sell.name.replace(/\s/g, '') + String(-1 * i)"
      >
        <player-tree
          @toggle="toggleValue($event, i)"
          :sellArray="sell.subsells"
        ></player-tree>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["sellArray"],
  methods: {
    toggleValue(navigateObject, index) {
      let payload = {
        sellIndex: index,
        payload: navigateObject,
      };
      this.$emit("toggle", payload);
    },
  },
};
</script>

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
.darktheme > .card-body {
  background-color: #304152;
  margin: 0;
}
.darktheme {
  background-color: #304152 !important;
}
</style>
