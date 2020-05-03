<template>
  <div class="container--sheet-selector">
    <select
      v-model="sheetUrl"
      v-on:change="$emit('handle-sheet-select', $event.target.value)"
    >
      <option value="">-- Select Sheet --</option>
      <option
        v-for="sheet in sheetIds"
        v-bind:key="sheet.sheetId"
        v-bind:value="sheet.sheetUrl"
        >{{ sheet.title }}</option
      >
    </select>
  </div>
</template>

<script>
import { sheetIds } from "../sheets";

export default {
  name: "SheetSelector",
  data() {
    return {
      sheetIds,
      sheetUrl: ""
    };
  },
  methods: {}
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
