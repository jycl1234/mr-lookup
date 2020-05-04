<template>
  <div class="container--errorMsg" v-if="errorMsg">
    <span class="span--errorMsg">{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  name: "ErrorMsg",
  props: {
    errorMsg: String
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container--errorMsg {
  margin-bottom: 1rem;
  .span--errorMsg {
    color: red;
  }
}
</style>
