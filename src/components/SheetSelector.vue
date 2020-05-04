<template>
  <div class="container--sheet-selector">
    <select v-model="sheetUrl" v-on:change="handleChange" ref="sheetSelector">
      <option value="">-- Select Sheet --</option>
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
        if (val) {
          const valueFromSearch = this.$refs.sheetSelector.querySelector(
            'option[data-key="' + this.sheetId + '"'
          ).value;
          this.sheetUrl = valueFromSearch;
          this.$emit("handle-sheet-select", {
            key: this.sheetId,
            value: valueFromSearch
          });
        }
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
