<template>
  <h1>Rader</h1>
  <form>
    <select v-model="yearSelected" @change="onYearChange">
        <option v-for="year in years" :key=year :value="year">{{year}}</option>
    </select>
  </form>
  <div v-if="data">
    <table>
      <thead>
        <tr>
          <th>Omgång</th>
          <th>Lottorad</th>
          <th>Tilläggsnummer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="round in data.rounds" :key=round.round>
          <td>{{round.round}}</td>
          <td>{{round.numbers}}</td>
          <td>{{round.extra}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const data = ref({'year': 2026, 'rounds': [{'round': 1, 'numbers': [1,2,3], 'extra': [4]},{'round': 2, 'numbers': [2,3,4], 'extra': [5]}]})
    const startYear = 2000
    const currentYear = new Date().getFullYear()

    const years = computed(() => Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
        data.value = {'year': event.target.value, 'rounds': [{'round': 52, 'numbers': [10,20,30], 'extra': [40]},{'round': 51, 'numbers': [10,20,30], 'extra': [40]}]}
    }

    return { data, years, yearSelected, onYearChange}
  }
}
</script>