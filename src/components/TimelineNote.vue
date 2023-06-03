<template>
    <div>
        <br>
        <b-form-input style="width: 20%" v-model="note.date"></b-form-input>
        <br>
        <b-row>
          <b-col>
            <b-form-textarea style="height: 35rem; width: 100%" v-model="note.content">
            </b-form-textarea>
          </b-col>
          <b-col cols="4" v-if="campaign">
            <LinkList :linkList="note.links" :campaign="campaign"></LinkList>
          </b-col>
        </b-row>
    </div>
</template>

<script>
import LinkList from "./LinkList.vue"

export default {
  props: ["note", "campaign"],
  components: {LinkList},
};
</script>