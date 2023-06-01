<template>
    <div>
        <br>
        <b-form-input style="width: 20%" v-model="note.date"></b-form-input>
        <br>
        <b-row>
          <b-col cols="7">
            <b-form-textarea style="height: 35rem; width: 100%" v-model="note.content">
            </b-form-textarea>
          </b-col>
          <b-col cols="5">
            <h4>Links</h4>
          </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
  props: ["note", "color1", "color2", "color3"],
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