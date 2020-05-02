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
    <button type="button" v-on:click="handleSubmit()">search</button>
    <button type="button" v-on:click="handleReset()">reset</button>
    <Results :results="results" :region="region" />
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl, spreadsheetId, apiKey } from "../constants";
import { sheetIds } from "../sheets";
import { mats } from "../mats";
import Results from "./Results";

export default {
  name: "Lookup",
  components: { Results },
  data() {
    return {
      sheetIds,
      mats,
      sheetUrl: "",
      matRange: ":",
      results: null,
      region: null,
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
        axios
          .get(url)
          .then((res) => {
            console.log(res.data);
            this.results = res.data.values;
            const { range } = res.data;
            if (range.indexOf("JP") > -1) {
              this.region = "JP";
            } else {
              this.region = "NA";
            }
          })
          .catch((err) => console.log(err));
      }
    },
    handleReset() {
      this.results = null;
    },
  },
};
</script>

<style scoped></style>
