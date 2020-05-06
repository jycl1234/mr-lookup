<template>
  <div class="container--mat-selector">
    <select v-model="matRange" v-on:change="handleChange">
      >
      <option value="">-- Select Mat --</option>
      <option
        v-for="mat in filteredMats"
        v-bind:key="mat.startRange + ':' + mat.endRange"
        v-bind:value="mat.startRange + ':' + mat.endRange"
        >{{ mat.name }}</option
      >
    </select>
    <div class="container--mat-filter container-fluid">
      <div class="row">
        <div class="col-xs-3 col--label">
          <span class="wrapper--filter-label">Rarity</span>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matRarityFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="gold"
            class="input--checkbox-filter gold"
            value="gold"
          />
          <label for="gold">gold</label>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matRarityFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="silver"
            class="input--checkbox-filter silver"
            value="silver"
          />
          <label for="silver">silver</label>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matRarityFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="bronze"
            class="input--checkbox-filter bronze"
            value="bronze"
          />
          <label for="bronze">bronze</label>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3 col--label">
          <span class="wrapper--filter-label">Type</span>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matTypeFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="mat"
            class="input--checkbox-filter mat"
            value="mat"
          />
          <label for="mat">mat</label>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matTypeFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="skill"
            class="input--checkbox-filter skill"
            value="skill"
          />
          <label for="skill">skill</label>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matTypeFilter"
            v-on:change="handleFilter"
            type="checkbox"
            id="ascension"
            class="input--checkbox-filter ascension"
            value="ascension"
          />
          <label for="ascension">ascension</label>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3 col--label">
          <span class="wrapper--filter-label">Sort</span>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matSort"
            v-on:change="handleFilter"
            type="radio"
            id="ascending"
            class="input--radio-filter ascending"
            value="ascending"
          />
          <label for="ascending">A-Z</label>
        </div>
        <div class="col-xs-3 col--filter">
          <input
            v-model="matSort"
            v-on:change="handleFilter"
            type="radio"
            id="descending"
            class="input--radio-filter descending"
            value="descending"
          />
          <label for="descending">Z-A</label>
        </div>
        <div class="col-xs-3 col--filter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mats } from "../mats";

export default {
  name: "MatSelector",
  props: {
    savedMatRanges: String,
    region: String
  },
  data() {
    return {
      mats,
      matRange: "",
      filteredMats: mats,
      matRarityFilter: ["gold", "silver", "bronze"],
      matTypeFilter: ["mat", "skill", "ascension"],
      matSort: "ascending"
    };
  },
  methods: {
    handleChange(e) {
      if (e.target.value !== "") {
        window.localStorage.setItem("matRanges", e.target.value);
        this.$emit("handle-mat-select", e.target.value);
      } else {
        window.localStorage.removeItem("matRanges");
        this.$emit("handle-mat-select", "");
      }
    },
    handleFilter() {
      let newMatsRegionFiltered = [];
      let newMatsRarityFiltered = [];
      let newMatsTypeFiltered = [];

      // remove unavailable mats

      if (this.region === "" || this.region === "JP") {
        newMatsRegionFiltered = mats;
      } else {
        let filtered = mats.filter(mat => mat.availability === this.region);
        newMatsRegionFiltered = [...newMatsRegionFiltered, ...filtered];
      }

      // sort by rarity

      for (let [, value] of Object.entries(this.matRarityFilter)) {
        let filtered = newMatsRegionFiltered.filter(
          mat => mat.rarity === value
        );
        newMatsRarityFiltered = [...newMatsRarityFiltered, ...filtered];
      }

      // sort by type

      for (let [, value] of Object.entries(this.matTypeFilter)) {
        let filtered = newMatsRarityFiltered.filter(mat => mat.type === value);
        newMatsTypeFiltered = [...newMatsTypeFiltered, ...filtered];
      }

      // order by ASC/DESC

      if (this.matSort === "ascending") {
        newMatsTypeFiltered = newMatsTypeFiltered.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
      } else {
        newMatsTypeFiltered = newMatsTypeFiltered.sort((a, b) =>
          a.name < b.name ? 1 : -1
        );
      }
      this.filteredMats = newMatsTypeFiltered;

      // double check mat still exists, otherwise reset

      if (
        this.filteredMats.filter(
          mat => `${mat.startRange}:${mat.endRange}` === this.matRange
        ).length <= 0
      ) {
        this.matRange = "";
        this.$emit("handle-mat-select", "");
      }
    }
  },
  watch: {
    savedMatRanges: {
      immediate: false,
      handler() {
        this.matRange = this.savedMatRanges;
        this.$emit("handle-mat-select", this.matRange);
      }
    },
    region: {
      immediate: false,
      handler() {
        this.handleFilter();
      }
    }
  },
  created: function() {
    this.handleFilter();
  }
};
</script>

<style lang="scss" scoped>
.container--mat-selector {
  margin-bottom: 1rem;
  select {
    width: 100%;
    font-size: 1rem;
    @media (min-width: 992px) {
      width: 50%;
    }
  }
}
.container--mat-filter {
  margin-top: 1.4rem;
  color: #fff;
  width: 98%;
  margin: 1rem auto;
  @media (min-width: 992px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 64%;
  }
  .col--label,
  .col--filter {
    width: 100%;
    text-align: center;
    margin-bottom: 0.2rem;
    @media (min-width: 576px) {
      text-align: left;
      width: 25%;
    }
    .input--checkbox-filter,
    .input--radio-filter {
      position: relative;
      margin-right: 0.4rem;
      top: 0.18rem;
    }
  }
  .col--label {
    margin: 0.6rem 0 1rem 0;
    font-weight: bold;
    @media (min-width: 576px) {
      margin: 0 0 0.8rem 0;
    }
  }
}
</style>
