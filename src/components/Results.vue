<template>
  <div class="container--results">
    <div class="grid" v-if="results">
      <div class="row grid--row grid--header">
        <div class="grid--cell col-sm-12 col-md-2">Area</div>
        <div class="grid--cell col-sm-12 col-md-3">Quest</div>
        <div class="grid--cell col-sm-12 col-md-1">AP</div>
        <div class="grid--cell col-sm-12 col-md-1">
          BP/AP
          <span class="info" v-if="region === 'JP'" v-tooltip="jpMsg">(!)</span
          ><span v-else class="info" v-tooltip="naMsg">(!)</span>
        </div>
        <div class="grid--cell col-sm-12 col-md-1">AP/Drop</div>
        <div class="grid--cell col-sm-12 col-md-2">Drop Chance</div>
        <div class="grid--cell col-sm-12 col-md-1">Runs</div>
      </div>
      <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
        <div class="grid--cell col-sm-12 col-md-2">
          <span class="responsive--header">Area</span>{{ row[2] }}
        </div>
        <div class="grid--cell col-sm-12 col-md-3">
          <span class="responsive--header">Quest</span>{{ row[3] }}
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">AP</span>{{ row[4] }}
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">BP/AP</span>{{ row[5] }}
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">APD</span>{{ row[6] }}
        </div>
        <div class="grid--cell col-sm-12 col-md-2">
          <span class="responsive--header">%</span>{{ row[8]
          }}<span v-if="row[8] !== ''">%</span>
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">Runs</span>{{ row[10] }}
        </div>
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
  methods: {},
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
    text-align: left;
    @media (min-width: 992px) {
      text-align: center;
    }
    .grid--row {
      border-bottom: 1px dotted #8f8f8f;
      margin: 0.2rem 0;
      &.grid--header {
        font-weight: bold;
        display: none;
        @media (min-width: 992px) {
          display: block;
        }
        .info {
          font-size: 0.8rem;
          position: absolute;
          top: -0.06rem;
          right: -0.3rem;
          cursor: pointer;
        }
      }
      .grid--cell {
        padding: 0 0.1rem;
        margin: 0 0 0.4rem 0;
        @media (min-width: 992px) {
          margin: 0;
        }
        .responsive--header {
          font-weight: bold;
          width: 35%;
          display: inline-block;
          @media (min-width: 992px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
