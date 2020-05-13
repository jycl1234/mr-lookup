<template>
  <div class="container container--lookup">
    <h1>Magireco Dropsheet Lookup Tool</h1>
    <div class="row">
      <div class="col-sm-12">
        <MatSelectorVisual
          v-on:handle-mat-select="handleMatSelect"
          v-on:handle-mat-toggle="handleMatToggle"
          v-on:handle-trigger-reset="handleTriggerReset"
          :savedMatRanges="savedMatRanges"
          :isClosed="isClosed"
          :triggerReset="triggerReset"
        />
      </div>
      <div class="col-sm-12"><ErrorMsg :errorMsg="errorMsg" /></div>
      <div class="col-sm-12 container--button">
        <button class="button--reset" type="button" v-on:click="handleReset()">
          reset
        </button>
        <button class="button--link" type="button" v-on:click="handleLink()">
          link
        </button>
      </div>
    </div>
    <SearchLink :searchLink="searchLink" />
    <div v-if="isLoading" class="overlay--loading">
      <span>loading...</span>
    </div>
    <Results :results="results" />
  </div>
</template>

<script>
import axios from "axios";
import {
  baseUrl,
  spreadsheetId,
  spreadsheetNameMain,
  spreadsheetSheetIdMain
} from "../constants";
import { apiKey } from "../apiKey";
import { mats } from "../mats";
import MatSelectorVisual from "./MatSelectorVisual";
import Results from "./Results";
import SearchLink from "./SearchLink";
import ErrorMsg from "./ErrorMsg";

export default {
  name: "Lookup",
  components: {
    MatSelectorVisual,
    Results,
    SearchLink,
    ErrorMsg
  },
  data() {
    return {
      mats,
      matRanges: "",
      savedMatRanges: "",
      isClosed: true,
      triggerReset: false,
      results: null,
      isLoading: false,
      searchLink: null,
      errorMsg: null
    };
  },
  methods: {
    handleMatSelect(matRanges) {
      if (matRanges !== "") {
        this.savedMatRanges = matRanges;
        this.matRanges = matRanges;
        window.localStorage.setItem("matRanges", matRanges);
      } else {
        this.savedMatRanges = "";
        this.matRanges = "";
        window.localStorage.removeItem("matRanges");
        this.isClosed = false;
        this.results = null;
      }
      if (this.matRanges !== "") {
        this.handleSubmit();
      }
    },
    handleMatToggle() {
      this.isClosed = !this.isClosed;
    },
    handleTriggerReset() {
      this.triggerReset = false;
    },
    handleSubmit() {
      this.errorMsg = null;
      this.results = null;
      if (this.matRanges.length < 5) {
        this.errorMsg = "Please select a mat.";
        return;
      } else {
        this.isLoading = true;
        this.isClosed = true;
        const url = `${baseUrl}${spreadsheetId}?ranges=${spreadsheetNameMain}!${this.matRanges}&fields=sheets&key=${apiKey}`;
        axios
          .get(url)
          .then(res => {
            this.isLoading = false;
            const { rowData } = res.data.sheets[0].data[0]; // lol
            if (rowData) {
              // if there's no formattedValue on first line this is a blank entry
              if (rowData[0].values[2].formattedValue) {
                this.results = rowData;
              } else {
                this.results = [];
              }
            }
          })
          .catch(err => {
            this.isLoading = false;
            this.errorMsg = "Error loading data.";
            console.log(err);
          });
      }
    },
    handleReset() {
      this.results = null;
      this.searchLink = null;
      this.matRanges = "";
      this.savedMatRanges = "";
      this.errorMsg = null;
      this.isClosed = false;
      this.triggerReset = true;
      window.localStorage.removeItem("matRanges");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    handleLink() {
      this.errorMsg = null;
      if (this.savedMatRanges !== "") {
        this.searchLink = `${window.location.origin}${window.location.pathname}#${spreadsheetSheetIdMain}/${this.savedMatRanges}`;
      } else {
        this.errorMsg = "Please select a mat first.";
      }
    }
  },
  mounted: function() {
    if (window.localStorage.getItem("matRanges") !== null) {
      this.matRanges = window.localStorage.getItem("matRanges");
      this.savedMatRanges = window.localStorage.getItem("matRanges");
    } else {
      this.isClosed = false;
    }
    if (this.$route.path.length > 1) {
      const path = encodeURI(this.$route.path);
      const values = path.substr(1).split("/");
      this.matRanges = values[1];
      this.savedMatRanges = values[1];
      setTimeout(() => {
        this.handleSubmit();
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.container--lookup {
  width: 100%;
  max-width: 70rem;
  height: auto;
  text-align: center;
  background: rgba(29, 120, 148, 0.8);
  box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.7);
  padding: 2rem;
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 70%;
  }
  h1 {
    color: #fff;
    margin: 0 0 1rem 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
    font-size: 1.4rem;
    @media (min-width: 768px) {
      font-size: 1.6rem;
    }
    @media (min-width: 992px) {
      font-size: 2rem;
    }
  }
  .overlay--loading {
    color: #b5b5b5;
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
  .button--reset,
  .button--link {
    font-size: 1rem;
    margin: 0.5rem 0.5rem;
    padding: 0.25rem 2rem;
    border: 1px solid #fff;
    background: #29b6e1cc;
    color: #fff;
    -webkit-transition: all ease-in-out 0.25s;
    -o-transition: all ease-in-out 0.25s;
    transition: all ease-in-out 0.25s;
    &:hover {
      border: 1px solid #29b6e1cc;
      background: #fff;
      color: #29b6e1cc;
    }
    @media (min-width: 992px) {
      margin-bottom: 0 0.5rem;
    }
  }
}
</style>
