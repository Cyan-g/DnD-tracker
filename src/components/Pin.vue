<template>
    <div 
      @mouseenter="$emit('enter')"
      @mouseleave="$emit('leave')"
      class="text-danger"
      >
      <div
        class="pin"
        @click="openModal()"
        v-b-popover.hover.top="pin.name"
        >
        <i 
          class="fas fa-lg fa-map-pin"
        ></i>
      </div>

        <b-modal hide-header hide-footer :id="pin.x + '-' + pin.y">
          <b-row>
            <b-col cols="6">
              <b-form-input v-model="pin.name"></b-form-input>
            </b-col>

            <b-col cols="6">
              <b-button variant="outline-danger" pill @click="$emit('delete')"><i class="fas fa-trash"></i></b-button>
            </b-col>

            <b-col cols="12">
              <hr>
              <b-form-textarea v-model="pin.notes" style="height: 20rem" class="mb-2"></b-form-textarea>
            </b-col>
          </b-row>
          <LinkList :linkList="pin.links" :campaign="campaign"></LinkList>
        </b-modal>
    </div>
</template> 

<script>
// import _ from "lodash";
import LinkList from "./LinkList.vue";

export default {
  props: ["pin", "campaign"],
  components: {LinkList},
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    openModal(){
      this.$bvModal.show(this.pin.x + '-' + this.pin.y);
    }
  },
  computed: {
  },
};
</script>

<style>
.pin {
  height: 1.8rem;
  cursor: pointer;
  width: 1rem;
  bottom: -0.5rem;
  left: -0.2rem;
  position: absolute;
  vertical-align: middle;
}
</style>

