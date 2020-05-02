<template>
  <div class="results">
    <table v-if="results">
      <thead>
        <tr>
          <th>No.</th>
          <th>Area</th>
          <th>Quest</th>
          <th>AP</th>
          <th v-if="region === 'JP'">BP/AP<br />(1P+1L+1T)</th>
          <th v-else>BP/AP<br />(1P+2L)</th>
          <th>Ap/Drop</th>
          <th>Drop Chance</th>
          <th>Runs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in results" v-bind:key="row[0]">
          <td>{{ row[0] }}</td>
          <td>{{ row[2] }}</td>
          <td>{{ row[3] }}</td>
          <td>{{ row[4] }}</td>
          <td>{{ row[5] }}</td>
          <td>{{ row[6] }} AP</td>
          <td>{{ row[8] }}%</td>
          <td>{{ row[10] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Results",
  props: {
    results: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
