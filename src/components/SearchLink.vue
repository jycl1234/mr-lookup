<template>
  <div class="container--searchlink" v-if="searchLink">
    <input
      readonly
      type="text"
      class="input--search-link"
      v-bind:value="searchLink"
      v-on:focus="$event.target.select()"
    />
  </div>
</template>

<script>
export default {
  name: "SearchLink",
  props: {
    searchLink: String
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.input--search-link {
  width: 98%;
  text-align: center;
  @media (min-width: 992px) {
    width: 50%;
  }
}
</style>
