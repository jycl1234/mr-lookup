<template>
  <select v-on:change="handleChange($event)">
    <option
      v-for="sheet in sheetIds"
      v-bind:key="sheet.sheetId"
      v-bind:value="sheet.sheetId"
    >{{ sheet.title }}</option>
  </select>
</template>

<script>
import { sheetIds } from "../constants";

export default {
  name: "SheetSelector",
  components: {},
  data() {
    return {
      sheetIds
    };
  },
  methods: {
    handleChange(e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style scoped>
</style>