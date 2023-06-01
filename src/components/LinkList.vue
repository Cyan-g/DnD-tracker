<template>
    <div>
      <h4>Links</h4> 
      <b-button @click="addLink()">Add Link</b-button>
      
      <div v-for="(link, index) in linkList" :key="index + '_link'" >
        <Link :link="link" :campaign="campaign"></Link>
        <br>
      </div>
    </div>
</template> 

<script>
import _ from "lodash";
import Link from "./Link.vue"

export default {
  props: ["linkList", "campaign"],
  components: {Link},
  data() {
    return {
      linkTemplate: {
        label: "Day 1",
        type: "note",
        number: 0
      }
    };
  },
  created() {
  },
  methods: {
    addLink(){
      this.linkList.push(_.cloneDeep(this.linkTemplate));
    }
  },
  computed: {
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
  margin-top: 20px;
}
#app > * {
  background-color: #304152;
}
#smallprint {
  color: black;
  font-size: 0.8rem;
}
</style>
