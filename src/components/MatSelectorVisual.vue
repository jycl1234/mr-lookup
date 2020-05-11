<template>
  <div class="container--image">
    <div class="wrapper--image" v-for="mat in mats" v-bind:key="mat.filename">
      <img v-bind:src="getUrl(mat)" v-on:click="handleClick(mat)" />
    </div>
  </div>
</template>

<script>
import { mats } from "../mats";

export default {
  methods: {
    getUrl(mat) {
      return require("@/assets/" + mat.filename + ".png");
    },
    handleClick(mat) {
      console.log(`${mat.startRange}:${mat.endRange}`);
    }
  },
  data() {
    return {
      baseUrl: "./assets/",
      mats
    };
  }
};
</script>

<style lang="scss" scoped>
.container--image {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .wrapper--image {
    img {
      width: 3.5rem;
      margin: 0.1rem;
      cursor: pointer;
    }
  }
}
</style>
