<template>
  <div id="app">
    <Lookup />
  </div>
</template>

<script>
// TODO:
// 1. refactor components
// 2. improve responsive data layout
// 2. improve error UX
// 3. pull down wiki links from sheets api
// 4. add in gems/pieces js

import Lookup from "./components/Lookup.vue";

export default {
  name: "App",
  components: {
    Lookup,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
}
html {
  font-size: 1rem !important;
  line-height: 1.4rem !important;
}
html * {
  font-family: "Quicksand", Arial, sans-serif !important;
}
#app {
  background-image: url("./assets/chaldea-wp.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  padding: 2rem;
  min-height: 100%;
}
</style>
