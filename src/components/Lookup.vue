<template>
  <div>
    <h1>FGO Dropsheet Lookup Tool</h1>
    <SheetSelector />
  </div>
</template>

<script>
import SheetSelector from "./SheetSelector.vue";

export default {
  name: "Lookup",
  components: { SheetSelector }
};
</script>

<style scoped>
</style>