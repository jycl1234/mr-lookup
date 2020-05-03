<template>
  <div class="container--results">
    <div class="grid--first-load" v-if="!results"></div>
    <div class="grid grid--no-result" v-else-if="results.length === 0">
      <span class="notification--no-result">No results found.</span>
    </div>
    <div class="grid" v-else-if="results.length > 0">
      <div class="row grid--row grid--header">
        <div class="grid--cell col-sm-12 col-md-2">Area</div>
        <div class="grid--cell col-sm-12 col-md-3">Quest</div>
        <div class="grid--cell col-sm-12 col-md-1">AP</div>
        <div class="grid--cell col-sm-12 col-md-1">BP/AP</div>
        <div class="grid--cell col-sm-12 col-md-1">AP/Drop</div>
        <div class="grid--cell col-sm-12 col-md-2">Drop Chance</div>
        <div class="grid--cell col-sm-12 col-md-1">Runs</div>
      </div>
      <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
        <div class="grid--cell col-sm-12 col-md-2">
          <span class="responsive--header">Area</span>
          {{ row.values[2].formattedValue }}
        </div>
        <div class="grid--cell col-sm-12 col-md-3">
          <span class="responsive--header">Quest</span>
          &nbsp;
          <a
            class="link--wiki"
            v-if="row.values[3].hyperlink"
            v-bind:href="row.values[3].hyperlink"
            target="_blank"
          >{{ row.values[3].formattedValue }}</a>
          <span v-else>{{ row.values[3].formattedValue }}</span>
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">AP</span>
          {{ row.values[4].formattedValue }}
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">BP/AP</span>
          {{ row.values[5].formattedValue }}
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">APD</span>
          {{ row.values[6].formattedValue }}
        </div>
        <div class="grid--cell col-sm-12 col-md-2">
          <span class="responsive--header" v-if="row.values[8].formattedValue">%</span>
          {{ row.values[8].formattedValue }}
          <span v-if="row.values[8].formattedValue">%</span>
        </div>
        <div class="grid--cell col-sm-12 col-md-1">
          <span class="responsive--header">Runs</span>
          {{ row.values[10].formattedValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  props: {
    results: {
      type: Array
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container--results {
  margin-top: 1rem;
  .grid {
    font-size: 0.8rem;
    width: 100%;
    padding: 1rem 1rem 2rem 1rem;
    background: rgba(255, 255, 255, 0.7);
    text-align: left;
    @media (min-width: 992px) {
      font-size: 0.85rem;
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
    &.grid--no-result {
      text-align: center;
      .notification--no-result {
        margin-top: 0.7rem;
        display: inline-block;
      }
    }
  }
}
</style>
