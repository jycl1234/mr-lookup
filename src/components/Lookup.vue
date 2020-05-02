<template>
  <div class="container container--lookup">
    <h1>FGO Dropsheet Lookup Tool</h1>
    <div class="container--sheet-selector">
      <select v-model="sheetUrl">
        <option
          v-for="sheet in sheetIds"
          v-bind:key="sheet.sheetId"
          v-bind:value="sheet.sheetUrl"
          >{{ sheet.title }}</option
        >
      </select>
    </div>
    <div class="container--mat-selector">
      <select v-model="matRange">
        <option
          v-for="mat in mats"
          v-bind:key="mat.startRange + ':' + mat.endRange"
          v-bind:value="mat.startRange + ':' + mat.endRange"
          >{{ mat.name }}</option
        >
      </select>
    </div>
    <button class="button--submit" type="button" v-on:click="handleSubmit()">
      search
    </button>
    <button class="button--reset" type="button" v-on:click="handleReset()">
      reset
    </button>
    <div v-if="isLoading" class="overlay--loading"><span>loading...</span></div>
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
      isLoading: false,
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
        this.results = null;
        this.isLoading = true;
        const url = `${baseUrl}${spreadsheetId}/values/${this.sheetUrl}!${this.matRange}?key=${apiKey}`;
        axios
          .get(url)
          .then((res) => {
            this.isLoading = false;
            this.results = res.data.values;
            const { range } = res.data;
            if (range.indexOf("JP") > -1) {
              this.region = "JP";
            } else {
              this.region = "NA";
            }
          })
          .catch((err) => {
            this.isLoading = false;
            alert("Error loading data.");
            console.log(err);
          });
      }
    },
    handleReset() {
      this.results = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.container--lookup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 70%;
  max-width: 70rem;
  height: 28rem;
  text-align: center;
  background: rgba(49, 57, 93, 0.7);
  box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.7);
  h1 {
    color: #fff;
    margin: 1rem 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  .overlay--loading {
    color: #fff;
    margin-top: 4rem;
    font-size: 2rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  .container--sheet-selector,
  .container--mat-selector {
    margin-bottom: 1rem;
    select {
      width: 50%;
      font-size: 1rem;
    }
  }
  .button--submit,
  .button--reset {
    font-size: 1rem;
    margin: 0 0.5rem;
    padding: 0.25rem 2rem;
    border: 1px solid rgba(49, 57, 93);
  }
}
</style>
