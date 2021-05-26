<template
  ><b-modal size="xl" hide-footer title="Add a Sell" id="sell-form">
    <b-form-group>
      <b-row>
        <b-col class="border-right">
          <prices-tree :priceArray="customSell" :editMode="true"></prices-tree>
        </b-col>
        <b-col>
          <prices-tree :priceArray="priceArray" :editMode="false"></prices-tree>
        </b-col>
      </b-row>
    </b-form-group>
    <!--
        <b-row
      ><b-col cols="10"></b-col
      ><b-col>
        <b-button-group
          ><b-button
            v-b-popover.hover.top="'Manage Sells'"
            variant="outline-warning"
            @click="editMode = !editMode"
            ><i class="fas fa-pen"></i> </b-button
          ><b-button
            v-b-popover.hover.top="'Add custom package'"
            variant="outline-success"
            v-if="editMode"
            @click="$refs['new-package'].show()"
            ><i class="fas fa-plus"></i> New</b-button
          ><b-button
            v-b-popover.hover.top="'Reset prices to original'"
            variant="outline-secondary"
            v-if="editMode"
            @click="resetPrices()"
            ><i class="fas fa-sync"></i></b-button
        ></b-button-group>
      </b-col>
    </b-row>
    -->
  </b-modal>
</template>

<script>
import PricesTree from "./PricesTree.vue";

export default {
  props: ["priceArray"],
  components: { PricesTree },
  data() {
    return {
      customSell: {},
    };
  },
};
</script>
