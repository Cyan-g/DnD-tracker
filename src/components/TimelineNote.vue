<template>
    <div v-if="note">
        <br>
        <b-form-input 
          :class="getStylingClass('input')"
          style="width: 20%" 
          v-model="note.date">
        </b-form-input>
        <br>
        <b-row>
          <b-col>
            <b-form-textarea
              :class="getStylingClass('input')"
              style="height: 35rem; width: 100%" v-model="note.content">
            </b-form-textarea>
          </b-col>

          <b-col cols="4" v-if="campaign">
            <LinkList :getStylingClass="getStylingClass"  :linkList="note.links" :campaign="campaign" id="NoteLinkModal"></LinkList>
          </b-col>
        </b-row>
    </div>
</template>

<script>
import LinkList from "./LinkList.vue"

export default {
  props: ["note", "campaign", "getStylingClass"],
  components: {LinkList},
};
</script>