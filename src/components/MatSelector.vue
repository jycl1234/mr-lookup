<template>
  <div class="container--mat-selector">
    <select v-on:change="$emit('handle-mat-select', $event.target.value)">
      <option
        v-for="mat in mats"
        v-bind:key="mat.startRange + ':' + mat.endRange"
        v-bind:value="mat.startRange + ':' + mat.endRange"
      >{{ mat.name }}</option>
    </select>
  </div>
</template>

<script>
import { mats } from "../mats";

export default {
  name: "MatSelector",
  data() {
    return {
      mats,
      matRange: ":"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container--mat-selector {
  margin-bottom: 1rem;
  select {
    width: 100%;
    font-size: 1rem;
    @media (min-width: 992px) {
      width: 70%;
    }
  }
}
</style>

