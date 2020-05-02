<template>
  <div class="container--results">
    <div class="grid" v-if="results">
      <div class="row grid--row grid--header">
        <div class="grid--cell col-sm-12 col-lg-2">Area</div>
        <div class="grid--cell col-sm-12 col-lg-3">Quest</div>
        <div class="grid--cell col-sm-12 col-lg-1">AP</div>
        <div class="grid--cell col-sm-12 col-lg-1">
          BP/AP
          <span class="info" v-if="region === 'JP'" v-tooltip="jpMsg">(!)</span
          ><span v-else class="info" v-tooltip="naMsg">(!)</span>
        </div>
        <div class="grid--cell col-sm-12 col-lg-1">AP/Drop</div>
        <div class="grid--cell col-sm-12 col-lg-2">Drop Chance</div>
        <div class="grid--cell col-sm-12 col-lg-1">Runs</div>
      </div>
      <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
        <div class="grid--cell col-sm-12 col-lg-2">{{ row[2] }}</div>
        <div class="grid--cell col-sm-12 col-lg-3">{{ row[3] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[4] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[5] }}</div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[6] }}</div>
        <div class="grid--cell col-sm-12 col-lg-2">
          {{ row[8] }}
          <span v-if="row[8] !== ''">%</span>
        </div>
        <div class="grid--cell col-sm-12 col-lg-1">{{ row[10] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vtooltip from "v-tooltip";

Vue.use(Vtooltip);

export default {
  name: "Results",
  props: {
    results: {
      type: Array,
    },
    region: String,
  },
  data() {
    return {
      jpMsg: "1P+1L+1T",
      naMsg: "1P+2L",
    };
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
        .info {
          font-size: 0.8rem;
          position: absolute;
          top: -0.06rem;
          right: -0.3rem;
          cursor: pointer;
        }
      }
      .grid--grid--cell {
        padding: 0 0.1rem;
      }
    }
  }
}
</style>
