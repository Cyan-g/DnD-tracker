<template>
    <div 
      @mouseenter="$emit('enter')"
      @mouseleave="$emit('leave')"
      >
        <b-button 
          pill 
          class="pin" 
          v-b-popover.hover.top="pin.name"
          variant="dark">
        </b-button>

        <b-modal>
          <LinkList :links="pin.links"></LinkList>
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
  },
  computed: {
  },
};
</script>

<style>
.pin {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  border: solid white 1px !important;
  bottom: -0.9rem;
  right: -0.9rem;
  position: absolute;
}
</style>

