<template>
  <div>
      <br>
      <b-form-input style="width: 20%" v-model="character.name"></b-form-input>
      <br>
      <b-row>
        <b-col>
          
        </b-col>
        <b-col cols="4" v-if="campaign">
          <LinkList :linkList="character.links" :campaign="campaign"></LinkList>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import LinkList from "./LinkList.vue"

export default {
props: ["character", "campaign"],
components: {LinkList},
};
</script>