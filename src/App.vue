<template>
  <div id="app">
    <div id="nav"></div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
// TODO
// - dynamically update url on search param updates
// - autocopy on get link focus
// - sort mats by order of appearance in story (unlikely)
</script>

<style lang="scss">
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
  background-image: url("./assets/kamihama-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  padding: 2rem;
  min-height: 100%;
}
</style>
