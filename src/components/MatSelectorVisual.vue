<template>
  <div class="container--mat-selector">
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
          <label for="skill">gems</label>
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
          <label for="ascension">pieces/monus</label>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col--selected-mat" v-if="selectedMat">
          <span class="span--label">Selected:</span>
          <img
            class="image--selected-mat"
            v-bind:src="selectedMatPath"
            v-on:click="handleToggle"
            title="Click to select another"
          />
          <span
            class="icon--toggle-mat"
            v-if="isClosed"
            v-on:click="handleToggle"
            title="Expand"
            >◀</span
          >
          <span
            class="icon--toggle-mat"
            v-on:click="handleToggle"
            v-else
            title="Collapse"
            >▼</span
          >
        </div>
        <div class="col-xs-12 col--selected-mat" v-else>
          <span class="span--label">Select a mat from below.</span>
        </div>
      </div>
    </div>
    <div class="container--image" v-bind:class="{ closed: isClosed }">
      <div
        class="wrapper--image"
        v-for="mat in filteredMats"
        v-bind:key="mat.filename"
      >
        <img
          class="image--mat"
          v-bind:class="{
            selected: isSelected == mat.startRange + ':' + mat.endRange
          }"
          v-bind:src="getUrl(mat)"
          v-on:click="handleClick(mat)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mats } from "../mats";

export default {
  name: "MatSelectorVisual",
  props: {
    savedMatRanges: String,
    region: String,
    isClosed: Boolean
  },
  data() {
    return {
      baseUrl: "./assets/",
      mats,
      filteredMats: mats,
      isSelected: null,
      selectedMat: null,
      selectedMatPath: null,
      matRarityFilter: ["gold", "silver", "bronze"],
      matTypeFilter: ["mat", "skill", "ascension"]
    };
  },
  methods: {
    getUrl(mat) {
      return require("@/assets/" + mat.filename + ".png");
    },
    handleToggle() {
      this.$emit("handle-mat-toggle");
    },
    handleClick(mat) {
      if (mat) {
        this.selectedMat = mat;
        this.selectedMatPath = this.getUrl(mat);
        this.handleToggle();
        this.isSelected = mat.startRange + ":" + mat.endRange;
        this.$emit("handle-mat-select", `${mat.startRange}:${mat.endRange}`);
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

      this.filteredMats = newMatsTypeFiltered;

      // order by filename

      newMatsTypeFiltered = newMatsTypeFiltered.sort((a, b) =>
        a.filename > b.filename ? 1 : -1
      );

      // double check mat still exists, otherwise reset

      if (
        this.filteredMats.filter(
          mat => `${mat.startRange}:${mat.endRange}` === this.isSelected
        ).length <= 0
      ) {
        this.isSelected = "";
        this.$emit("handle-mat-select", "");
      }
    }
  },
  watch: {
    savedMatRanges: {
      immediate: false,
      handler() {
        if (this.savedMatRanges !== "") {
          this.isSelected = this.savedMatRanges;
          this.selectedMat = this.filteredMats.filter(
            mat => `${mat.startRange}:${mat.endRange}` === this.isSelected
          );
          this.selectedMatPath = this.getUrl(this.selectedMat[0]);
          this.$emit("handle-mat-select", this.savedMatRanges);
        } else {
          this.selectedMat = null;
          this.selectedMatPath = null;
          this.isSelected = null;
        }
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
  .container--image {
    margin: 0 auto 2rem auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-height: 1500px;
    overflow: hidden;
    -webkit-transition: all ease-in-out 0.25s;
    -o-transition: all ease-in-out 0.25s;
    transition: all ease-in-out 0.25s;
    &.closed {
      max-height: 0;
    }
    @media (min-width: 992px) {
      width: 80%;
    }
    @media (min-width: 1200px) {
      width: 65%;
    }
    .wrapper--image {
      .image--mat {
        width: 3.5rem;
        margin: 0.05rem;
        border: 2px solid transparent;
        cursor: pointer;
        &.selected {
          border: 2px solid red;
        }
      }
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
    width: 65%;
  }
  .col--label,
  .col--filter {
    width: 100%;
    text-align: left;
    margin-bottom: 0.2rem;
    padding: 0;
    @media (min-width: 576px) {
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
  .col--selected-mat {
    text-align: left;
    padding: 0;
    margin-top: 1rem;
    @media (min-width: 576px) {
      text-align: center;
    }
    .span--label {
      font-weight: bold;
    }
    .icon--toggle-mat {
      position: absolute;
      top: 0.5rem;
      right: 0;
      font-size: 1.4rem;
      cursor: pointer;
    }
    .image--selected-mat {
      width: 3rem;
      margin-left: 1rem;
      cursor: pointer;
    }
  }
}
</style>
