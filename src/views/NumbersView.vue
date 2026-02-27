<template>
  <h1>Nummerfördelning</h1>
  <form>
    <select v-model="yearSelected" @change="onYearChange">
        <option v-for="year in years" :key=year :value="year">{{year}}</option>
    </select>
  </form>
  <div>
    <p>{{ dataAllYears.year}}</p>
    <p>{{ dataAllYears.average}}</p>
    <table>
      <thead>
        <tr>
          <th>Nummer</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="number in dataAllYears.distribution" :key=number.number>
          <td>{{ number.number }}</td>
          <td>{{ number.frequency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <p>{{ dataYear.year}}</p>
    <p>{{ dataYear.average}}</p>
    <table>
      <thead>
        <tr>
          <th>Nummer</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="number in dataYear.distribution" :key=number.number>
          <td>{{ number.number }}</td>
          <td>{{ number.frequency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const dataAllYears = {'year': 0, 'average': 485, 'distribution': [{'number': 16, 'frequency': 534}, {'number': 3, 'frequency': 530}, {'number': 6, 'frequency': 530}]}
    const dataYear = {'year': 2026, 'average': 1, 'distribution': [{'number': 3, 'frequency': 2}, {'number': 4, 'frequency': 2}, {'number': 7, 'frequency': 2}]}
    const startYear = 2000
    const currentYear = new Date().getFullYear()

    const years = computed(() => Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
        dataYear.value = {'year': event.target.value, 'average': 10, 'distribution': [{'number': 23, 'frequency': 15}, {'number': 39, 'frequency': 15}, {'number': 2, 'frequency':13}]}
    }

    return { dataAllYears, dataYear, years, yearSelected, onYearChange}
  }
}
</script>