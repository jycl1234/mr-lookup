<template>
  <div>
    <h1>FGO Dropsheet Lookup Tool</h1>
    <SheetSelector />
    <MatSelector />
  </div>
</template>

<script>
import SheetSelector from "./SheetSelector.vue";
import MatSelector from "./MatSelector.vue";

export default {
  name: "Lookup",
  components: { SheetSelector, MatSelector },
};
</script>

<style scoped></style>
