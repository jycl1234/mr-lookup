<template>
  <div class="container--sheet-selector">
    <select v-model="sheetUrl" v-on:change="handleChange" ref="sheetSelector">
      <option
        v-for="sheet in sheetIds"
        v-bind:key="sheet.sheetId"
        v-bind:value="sheet.sheetUrl"
        v-bind:data-key="sheet.sheetId"
        v-bind:data-type="sheet.sheetType"
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
      sheetUrl: "Main"
    };
  },
  methods: {
    handleChange(e) {
      if (e.target.value !== "") {
        this.$emit("handle-sheet-select", {
          key: e.target.querySelector(":checked").getAttribute("data-key"),
          value: {
            sheetId: e.target.value,
            sheetType: e.target
              .querySelector(":checked")
              .getAttribute("data-type")
          }
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
    const payload = {
      sheetId: firstOption.value,
      sheetType: firstOption.getAttribute("data-type")
    };
    this.$emit("handle-sheet-select", {
      key,
      value: payload
    });
  },
  watch: {
    sheetId: {
      immediate: false,
      handler(val) {
        const selectedOption = this.$refs.sheetSelector.querySelector(
          'option[data-key="' + val + '"'
        );
        this.sheetUrl = selectedOption.value;
        const payload = {
          sheetId: selectedOption.value,
          sheetType: selectedOption.dataset.type
        };
        this.$emit("handle-sheet-select", {
          key: val,
          value: payload
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
