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
    Lookup
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.4;
}
</style>
