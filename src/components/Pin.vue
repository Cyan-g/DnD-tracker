<template>
    <div 
      @mouseenter="enter()"
      @mouseleave="leave()"
      class="text-danger text-center"
      >
      <div
        :class="hover ? 'largePin' : 'pin'"
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
          <LinkList :linkList="pin.links" :campaign="campaign" id="PinLinkModal"></LinkList>
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
      hover: false
    };
  },
  created() {
  },
  methods: {
    enter(){
      this.hover = true;
      this.$emit('enter');
    },
    leave(){
      this.hover = false;
      this.$emit('leave');
    },
    openModal(){
      this.$bvModal.show(this.pin.x + '-' + this.pin.y);
    }
  },
  computed: {
  },
};
</script>

<style>
.largePin {
  height: 3rem;
  cursor: pointer;
  width: 3rem;
  bottom: -1.5rem;
  left: -1.5rem;
  position: absolute;
  vertical-align: middle;
  font-size: x-large;
}
.pin {
  height: 1.8rem;
  cursor: pointer;
  width: 1rem;
  bottom: -0.5rem;
  left: -0.5rem;
  position: absolute;
  font-size: medium;
  vertical-align: middle;
}
</style>

