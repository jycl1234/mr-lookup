<template>
  <div class="container--results">
    <div class="grid" v-if="results">
      <div class="row grid--row grid--header">
        <div class="grid--cell col-sm-12 col-lg-2">Area</div>
        <div class="grid--cell col-sm-12 col-lg-3">Quest</div>
        <div class="grid--cell col-sm-12 col-lg-1">AP</div>
        <div class="grid--cell col-sm-12 col-lg-2" v-if="region === 'JP'">
          BP/AP<br />(1P+1L+1T)
        </div>
        <div class="grid--cell col-sm-12 col-lg-1" v-else>
          BP/AP<br />(1P+2L)
        </div>
        <div class="grid--cell col-sm-12 col-lg-1">Ap/Drop</div>
        <div class="grid--cell col-sm-12 col-lg-1">Drop Chance</div>
        <div class="grid--cell col-sm-12 col-lg-1">Runs</div>
      </div>
      <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
        <div class="grid--cell col-sm-12 col-lg-2">{{ row[2] }}</div>
        <div class="grid--cell col-sm-12 col-lg-3">{{ row[3] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[4] }}</div>
        <div class="grid--cell col-sm-12 col-lg-2">{{ row[5] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[6] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">
          {{ row[8] }}<span v-if="row[8] !== ''">%</span>
        </div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[10] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  props: {
    results: {
      type: Array,
    },
    region: String,
  },
};
</script>

<style lang="scss" scoped>
.container--results {
  margin-top: 1rem;
  .grid {
    font-size: 0.9rem;
    width: 100%;
    padding: 1rem 1rem 2rem 1rem;
    background: rgba(255, 255, 255, 0.7);
    .grid--row {
      border-bottom: 1px dotted #8f8f8f;
      margin: 0.2rem 0;
      &.grid--header {
        font-weight: bold;
      }
      .grid--grid--cell {
        padding: 0 0.1rem;
      }
    }
  }
}
</style>
