<template>
  <div class="container--results">
    <div class="grid--first-load" v-if="!results"></div>
    <div class="grid grid--no-result" v-else-if="results.length === 0">
      <span class="notification--no-result">No results found.</span>
    </div>
    <div v-else-if="results.length > 0">
      <div class="grid">
        <h2 class="header--grid">Main Drops</h2>
        <div class="row grid--row grid--header">
          <div class="grid--cell col-xs-12 col-sm-2">Quest</div>
          <div class="grid--cell col-xs-12 col-sm-2">AP Cost</div>
          <div class="grid--cell col-xs-12 col-sm-2">Difficulty</div>
          <div class="grid--cell col-xs-12 col-sm-2">Runs</div>
          <div class="grid--cell col-xs-12 col-sm-2">AP/Drop</div>
          <div class="grid--cell col-xs-12 col-sm-2">Drop Rate</div>
        </div>
        <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">Quest</span>
            {{ row.values[0].formattedValue }}
          </div>
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">AP Cost</span>
            {{ row.values[1].formattedValue }}
          </div>
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">Difficulty</span>
            {{ row.values[2].formattedValue }}
          </div>
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">Runs</span>
            {{ row.values[3].formattedValue }}
          </div>
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">APD</span>
            {{ row.values[4].formattedValue }}
          </div>
          <div class="grid--cell col-xs-12 col-sm-2">
            <span class="responsive--header">Drop Rate</span>
            {{ row.values[5].formattedValue }}
          </div>
        </div>
      </div>
      <div class="grid">
        <h2 class="header--grid">Other Drops</h2>
        <div class="row grid--row" v-for="row in results" v-bind:key="row[0]">
          <div
            class="grid--cell other col-xs-12 col-sm-2"
            v-if="row.values[0].formattedValue"
          >
            <span class="responsive--header">Quest</span>
            {{ row.values[0].formattedValue }}
          </div>
          <div
            class="grid--cell other col-xs-2 col-sm-1"
            v-if="row.values[7].formattedValue"
          >
            <img
              class="image--mat"
              v-bind:src="getUrl(row.values[7].formattedValue)"
            />
          </div>
          <div
            class="grid--cell other col-xs-10 col-sm-2"
            v-if="row.values[8].formattedValue"
          >
            <span>{{ row.values[8].formattedValue }}</span>
          </div>
          <div
            class="grid--cell other col-xs-2 col-sm-1"
            v-if="row.values[10].formattedValue"
          >
            <img
              class="image--mat"
              v-bind:src="getUrl(row.values[10].formattedValue)"
            />
          </div>
          <div
            class="grid--cell other col-xs-10 col-sm-2"
            v-if="row.values[11].formattedValue"
          >
            <span>{{ row.values[11].formattedValue }}</span>
          </div>
          <div
            class="grid--cell other col-xs-2 col-sm-1"
            v-if="row.values[13].formattedValue"
          >
            <img
              class="image--mat"
              v-bind:src="getUrl(row.values[13].formattedValue)"
            />
          </div>
          <div
            class="grid--cell other col-xs-10 col-sm-2"
            v-if="row.values[14].formattedValue"
          >
            <span>{{ row.values[14].formattedValue }}</span>
          </div>
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
  methods: {
    getUrl(filename) {
      return require("@/assets/" + filename + ".png");
    }
  }
};
</script>

<style lang="scss" scoped>
.container--results {
  margin-top: 1rem;
  .grid {
    font-size: 0.9rem;
    width: 100%;
    padding: 1rem 1rem 2rem 1rem;
    background: #fff;
    text-align: left;
    @media (min-width: 768px) {
      font-size: 0.8rem;
      text-align: center;
    }
    @media (min-width: 992px) {
      font-size: 0.85rem;
    }
    .header--grid {
      margin: 0 0 1rem 0;
    }
    .grid--row {
      border-bottom: 1px dotted #8f8f8f;
      margin: 0.2rem 0;
      &.grid--header {
        font-weight: bold;
        display: none;
        @media (min-width: 768px) {
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
        color: #000;
        &.other {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 2.2rem;
          @media (min-width: 768px) {
            display: block;
          }
          .responsive--header {
            width: 16.66666667%;
          }
        }
        a {
          color: rgba(49, 57, 93, 1);
        }
        @media (min-width: 768px) {
          margin: 0;
        }
        .responsive--header {
          font-weight: bold;
          width: 35%;
          display: inline-block;
          @media (min-width: 768px) {
            display: none;
          }
        }
        .responsive--link {
          width: 65%;
          float: right;
          @media (min-width: 768px) {
            float: none;
            display: block;
            width: 100%;
          }
        }
        .image--mat {
          width: 2.2rem;
          border: 2px solid transparent;
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
