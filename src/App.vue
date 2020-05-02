<template>
  <div id="app">
    <Lookup />
  </div>
</template>

<script>
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
body,
#app {
  height: 100%;
  width: 100%;
}
html * {
  font-family: "Quicksand", Arial, sans-serif;
}
#app {
  line-height: 1.4;
  background-image: url("./assets/chaldea-wp.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
