<template>
  <div class="container--mat-selector">
    <select v-model="matRange" v-on:change="$emit('handle-mat-select', $event.target.value)">
      <option value>-- Select Mat --</option>
      <option
        v-for="mat in filteredMats"
        v-bind:key="mat.startRange + ':' + mat.endRange"
        v-bind:value="mat.startRange + ':' + mat.endRange"
      >{{ mat.name }}</option>
    </select>
    <div class="container--mat-filter row">
      <div class="col-xs-12">
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matRarityFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="gold"
              class="input--checkbox-filter gold"
              value="gold"
            />
          </div>
          <label for="gold">gold</label>
        </div>
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matRarityFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="silver"
              class="input--checkbox-filter silver"
              value="silver"
            />
          </div>
          <label for="silver">silver</label>
        </div>
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matRarityFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="bronze"
              class="input--checkbox-filter bronze"
              value="bronze"
            />
          </div>
          <label for="bronze">bronze</label>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matTypeFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="mat"
              class="input--checkbox-filter mat"
              value="mat"
            />
          </div>
          <label for="mat">mat</label>
        </div>
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matTypeFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="skill"
              class="input--checkbox-filter skill"
              value="skill"
            />
          </div>
          <label for="skill">skill</label>
        </div>
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matTypeFilter"
              v-on:change="handleFilter"
              type="checkbox"
              id="ascension"
              class="input--checkbox-filter ascension"
              value="ascension"
            />
          </div>
          <label for="ascension">ascension</label>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matSort"
              v-on:change="handleFilter"
              type="radio"
              id="ascending"
              class="input--radio-filter ascending"
              value="ascending"
            />
          </div>
          <label for="ascending">A-Z</label>
        </div>
        <div class="wrapper--filter">
          <div class="wrapper--filter-inner">
            <input
              v-model="matSort"
              v-on:change="handleFilter"
              type="radio"
              id="descending"
              class="input--radio-filter descending"
              value="descending"
            />
          </div>
          <label for="descending">Z-A</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mats } from "../mats";

export default {
  name: "MatSelector",
  data() {
    return {
      mats,
      filteredMats: mats,
      matRange: "",
      matRarityFilter: ["gold", "silver", "bronze"],
      matTypeFilter: ["mat"],
      matSort: "ascending"
    };
  },
  methods: {
    handleFilter() {
      this.matRange = "";
      this.$emit("handle-mat-select", "");
      let newMatsRarityFiltered = [];
      let newMatsTypeFiltered = [];

      // sort by rarity

      for (let [, value] of Object.entries(this.matRarityFilter)) {
        let filtered = mats.filter(mat => {
          return mat.rarity === value;
        });
        newMatsRarityFiltered = [...newMatsRarityFiltered, ...filtered];
      }

      // sort by type

      for (let [, value] of Object.entries(this.matTypeFilter)) {
        let filtered = newMatsRarityFiltered.filter(mat => {
          return mat.type === value;
        });
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
  .col-xs-12 {
    margin-bottom: 0.5rem;
    .wrapper--filter {
      margin: 0.1rem 0.5rem;
    }
    .wrapper--filter,
    .wrapper--filter-inner {
      display: inline-block;
      margin: 0 0.5rem;
      .input--checkbox-filter,
      .input--radio-filter {
        position: relative;
        margin-right: 0.4rem;
        top: 0.12rem;
      }
    }
  }
}
</style>
