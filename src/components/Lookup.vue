<template>
  <div class="container container--lookup">
    <h1>FGO Dropsheet Lookup Tool</h1>
    <div class="row">
      <div class="col-sm-12">
        <SheetSelector
          v-on:handle-sheet-select="handleSheetSelect"
          :sheetId="sheetId"
        />
      </div>
      <div class="col-sm-12">
        <MatSelectorVisual
          v-on:handle-mat-select="handleMatSelect"
          v-on:handle-mat-toggle="handleMatToggle"
          v-on:handle-trigger-reset="handleTriggerReset"
          :savedMatRanges="savedMatRanges"
          :region="region"
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
import { baseUrl, spreadsheetId } from "../constants";
import { apiKey } from "../apiKey";
import { sheetIds } from "../sheets";
import { mats } from "../mats";
import SheetSelector from "./SheetSelector";
import MatSelectorVisual from "./MatSelectorVisual";
import Results from "./Results";
import SearchLink from "./SearchLink";
import ErrorMsg from "./ErrorMsg";

export default {
  name: "Lookup",
  components: {
    SheetSelector,
    MatSelectorVisual,
    Results,
    SearchLink,
    ErrorMsg
  },
  data() {
    return {
      sheetIds,
      mats,
      sheetUrl: "",
      sheetObj: {},
      sheetId: "",
      matRanges: "",
      savedMatRanges: "",
      isClosed: true,
      triggerReset: false,
      results: null,
      region: "",
      isLoading: false,
      searchLink: null,
      errorMsg: null
    };
  },
  methods: {
    handleSheetSelect(sheetObj) {
      if (sheetObj && sheetObj.key !== "") {
        this.sheetId = sheetObj.key;
        this.sheetUrl = sheetObj.value;
        window.localStorage.setItem("sheetUrl", sheetObj.value);
        if (sheetObj.value.indexOf("JP") > -1) {
          this.region = "JP";
        } else {
          this.region = "ALL";
        }
      } else {
        this.sheetId = "";
        this.sheetUrl = "";
        window.localStorage.removeItem("sheetUrl");
      }
      if (this.sheetUrl !== "" && this.matRanges !== "") {
        this.handleSubmit();
      }
    },
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
      if (this.sheetUrl !== "" && this.matRanges !== "") {
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
      if (!this.sheetUrl) {
        this.errorMsg = "Please select a sheet.";
        return;
      } else if (this.matRanges.length < 5) {
        this.errorMsg = "Please select a mat.";
        return;
      } else {
        this.isLoading = true;
        this.isClosed = true;
        const url = `${baseUrl}${spreadsheetId}?ranges=${this.sheetUrl}!${this.matRanges}&fields=sheets&key=${apiKey}`;
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
      this.sheetId = "843570146";
      this.matRanges = "";
      this.savedMatRanges = "";
      this.region = "JP";
      this.errorMsg = null;
      this.isClosed = false;
      this.triggerReset = true;
      window.localStorage.setItem(
        "sheetUrl",
        "Best%205%20AP%2FDrop%20%28JP%29"
      );
      window.localStorage.removeItem("matRanges");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    handleLink() {
      this.errorMsg = null;
      if (this.sheetId !== "" && this.savedMatRanges !== "") {
        this.searchLink = `${window.location.origin}${window.location.pathname}#${this.sheetId}/${this.savedMatRanges}`;
      } else {
        this.errorMsg = "Please select a sheet and a mat first.";
      }
    }
  },
  mounted: function() {
    if (
      window.localStorage.getItem("sheetUrl") !== null &&
      window.localStorage.getItem("matRanges") !== null
    ) {
      this.sheetUrl = window.localStorage.getItem("sheetUrl");
      this.matRanges = window.localStorage.getItem("matRanges");
      this.sheetId = this.sheetIds.find(
        i => i.sheetUrl === this.sheetUrl
      ).sheetId;
      this.savedMatRanges = window.localStorage.getItem("matRanges");
      if (this.sheetUrl.indexOf("JP") > -1) {
        this.region = "JP";
      } else {
        this.region = "ALL";
      }
    } else {
      this.isClosed = false;
    }
    if (this.$route.path.length > 1) {
      const path = encodeURI(this.$route.path);
      const values = path.substr(1).split("/");
      this.sheetId = values[0];
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
  background: rgba(49, 57, 93, 0.9);
  box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.7);
  padding: 2rem;
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 70%;
  }
  h1 {
    color: #b5b5b5;
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
