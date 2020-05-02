<template>
  <div>
    <h1>FGO Dropsheet Lookup Tool</h1>
    <select v-model="sheetUrl">
      <option
        v-for="sheet in sheetIds"
        v-bind:key="sheet.sheetId"
        v-bind:value="sheet.sheetUrl"
        >{{ sheet.title }}</option
      >
    </select>
    <select v-model="matRange">
      <option
        v-for="mat in mats"
        v-bind:key="mat.startRange + ':' + mat.endRange"
        v-bind:value="mat.startRange + ':' + mat.endRange"
        >{{ mat.name }}</option
      >
    </select>
    <button type="primary" v-on:click="handleSubmit()">search</button>
  </div>
</template>

<script>
import { baseUrl, spreadsheetId, apiKey } from "../constants";
import { sheetIds } from "../sheets";
import { mats } from "../mats";

export default {
  name: "Lookup",
  data() {
    return {
      sheetIds,
      mats,
      sheetUrl: "",
      matRange: ":",
    };
  },
  methods: {
    handleSubmit() {
      let errors = 0;
      if (!this.sheetUrl) {
        errors++;
        alert("Please select a sheet.");
      }
      if (this.matRange.length < 5) {
        errors++;
        alert("Please select a mat.");
      }
      if (errors === 0) {
        const url = `${baseUrl}${spreadsheetId}/values/${this.sheetUrl}!${this.matRange}?key=${apiKey}`;
        console.log(url);
      }
    },
  },
};
</script>

<style scoped></style>
