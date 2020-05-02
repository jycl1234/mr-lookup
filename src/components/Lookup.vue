<template>
  <div class="container container--lookup">
    <h1>FGO Dropsheet Lookup Tool</h1>
    <div class="row">
      <div class="col-sm-12 col-lg-6">
        <SheetSelector v-on:handle-sheet-select="handleSheetSelect" />
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <MatSelector v-on:handle-mat-select="handleMatSelect" />
        </div>
        <div class="col-sm-12 container--button">
          <button class="button--submit" type="button" v-on:click="handleSubmit()">search</button>
          <button class="button--reset" type="button" v-on:click="handleReset()">reset</button>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="overlay--loading">
      <span>loading...</span>
    </div>
    <Results :results="results" :region="region" />
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl, spreadsheetId, apiKey } from "../constants";
import { sheetIds } from "../sheets";
import { mats } from "../mats";
import SheetSelector from "./SheetSelector";
import MatSelector from "./MatSelector";
import Results from "./Results";

export default {
  name: "Lookup",
  components: { SheetSelector, MatSelector, Results },
  data() {
    return {
      sheetIds,
      mats,
      sheetUrl: "",
      matRange: ":",
      results: null,
      region: null,
      isLoading: false
    };
  },
  methods: {
    handleSheetSelect(sheetUrl) {
      this.sheetUrl = sheetUrl;
    },
    handleMatSelect(matRange) {
      this.matRange = matRange;
    },
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
          .then(res => {
            this.isLoading = false;
            this.results = res.data.values;
            console.log(res.data.values);
            const { range } = res.data;
            if (range.indexOf("JP") > -1) {
              this.region = "JP";
            } else {
              this.region = "NA";
            }
          })
          .catch(err => {
            this.isLoading = false;
            alert("Error loading data.");
            console.log(err);
          });
      }
    },
    handleReset() {
      this.results = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.container--lookup {
  width: 70%;
  max-width: 70rem;
  height: auto;
  text-align: center;
  background: rgba(49, 57, 93, 0.7);
  box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.7);
  padding: 2rem;
  h1 {
    color: #fff;
    margin: 2rem 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  .overlay--loading {
    color: #fff;
    margin-top: 4rem;
    font-size: 2rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  .container--button {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    -webkit-transition: all ease-in-out 0.25s;
    -o-transition: all ease-in-out 0.25s;
    transition: all ease-in-out 0.25s;
    flex-direction: column;

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }
  .button--submit,
  .button--reset {
    font-size: 1rem;
    margin: 0.5rem 0.5rem;
    padding: 0.25rem 2rem;
    border: 1px solid #fff;
    background: #193268;
    color: #fff;
    -webkit-transition: all ease-in-out 0.25s;
    -o-transition: all ease-in-out 0.25s;
    transition: all ease-in-out 0.25s;
    &:hover {
      border: 1px solid #193268;
      background: #fff;
      color: #193268;
    }
    @media (min-width: 992px) {
      margin-bottom: 0 0.5rem;
    }
  }
}
</style>
