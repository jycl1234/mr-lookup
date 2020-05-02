<template>
  <select v-on:change="handleChange($event)">
    <option
      v-for="mat in mats"
      v-bind:key="mat.name"
      v-bind:value="mat.startRange + ':' + mat.endRange"
      >{{ mat.name }}</option
    >
  </select>
</template>

<script>
import { mats } from "../mats";

export default {
  name: "MatSelector",
  components: {},
  data() {
    return {
      mats,
    };
  },
  methods: {
    handleChange(e) {
      console.log(e.target.value);
    },
  },
};
</script>

<style scoped></style>
