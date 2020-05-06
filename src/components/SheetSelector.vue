<template>
  <div class="container--sheet-selector">
    <select v-model="sheetUrl" v-on:change="handleChange" ref="sheetSelector">
      <option data-key="" value="">-- Select Sheet --</option>
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
    sheetId: String
  },
  data() {
    return {
      sheetIds,
      sheetUrl: ""
    };
  },
  methods: {
    handleChange(e) {
      window.localStorage.setItem("sheetUrl", e.target.value);
      this.$emit("handle-sheet-select", {
        key: e.target.querySelector(":checked").getAttribute("data-key"),
        value: e.target.value
      });
    }
  },
  watch: {
    sheetId: {
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
      width: 50%;
    }
  }
}
</style>
