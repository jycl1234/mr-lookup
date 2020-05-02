<template>
  <div class="container--results">
    <table v-if="results">
      <colgroup>
        <col span="1" style="width:12%;" />
        <col span="1" style="width:24%;" />
        <col span="1" style="width:8%;" />
        <col span="1" style="width:16%;" />
        <col span="1" style="width:10%;" />
        <col span="1" style="width:10%;" />
        <col span="1" style="width:10%;" />
      </colgroup>
      <thead>
        <tr>
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
          <td>{{ row[2] }}</td>
          <td>{{ row[3] }}</td>
          <td>{{ row[4] }}</td>
          <td>{{ row[5] }}</td>
          <td>{{ row[6] }} <span v-if="row[6] !== ''">AP</span></td>
          <td>{{ row[8] }}<span v-if="row[8] !== ''">%</span></td>
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
    region: String,
  },
};
</script>

<style lang="scss" scoped>
.container--results {
  margin-top: 1rem;
  table {
    font-size: 0.9rem;
    width: 100%;
    padding: 1rem 1rem 2rem 1rem;
    background: rgba(255, 255, 255, 0.7);
    tr {
      td {
        padding: 0 0.1rem;
      }
    }
  }
}
</style>
