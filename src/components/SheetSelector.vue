<template>
  <div class="container--sheet-selector">
    <select v-model="sheetUrl" v-on:change="handleChange" ref="sheetSelector">
      <option
        v-for="sheet in sheetIds"
        v-bind:key="sheet.sheetId"
        v-bind:value="sheet.sheetUrl"
        v-bind:data-key="sheet.sheetId"
        >{{ sheet.title }}</option
      >
    </select>
  </div>
</template>

<script>
import { sheetIds } from "../sheets";

export default {
  name: "SheetSelector",
  props: {
    savedSheetId: String
  },
  data() {
    return {
      sheetIds,
      sheetUrl: "Best%205%20AP%2FDrop%20%28JP%29" // JP default
    };
  },
  methods: {
    handleChange(e) {
      if (e.target.value !== "") {
        this.$emit("handle-sheet-select", {
          key: e.target.querySelector(":checked").getAttribute("data-key"),
          value: e.target.value
        });
      } else {
        this.$emit("handle-sheet-select", {
          key: "",
          value: ""
        });
      }
    }
  },
  mounted: function() {
    const firstOption = this.$refs.sheetSelector.querySelector("option");
    const key = firstOption.getAttribute("data-key");
    const value = firstOption.value;
    this.$emit("handle-sheet-select", {
      key,
      value
    });
  },
  watch: {
    savedSheetId: {
      immediate: false,
      handler(val) {
        const valueFromSearch = this.$refs.sheetSelector.querySelector(
          'option[data-key="' + val + '"'
        ).value;
        this.sheetUrl = valueFromSearch;
        this.$emit("handle-sheet-select", {
          key: val,
          value: valueFromSearch
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container--sheet-selector {
  margin-bottom: 1rem;
  select {
    width: 100%;
    font-size: 1rem;
    @media (min-width: 992px) {
      width: 80%;
    }
    @media (min-width: 1200px) {
      width: 65%;
    }
  }
}
</style>
