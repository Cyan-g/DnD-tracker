<template>
    <div>
        <br>
        <b-form-input style="width: 20%" v-model="note.date"></b-form-input>
        <br>
        <b-form-textarea style="height: 30rem; width: 40rem" v-model="note.content">
        </b-form-textarea>
    </div>
</template>-

<script>
export default {
  props: ["note"],
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