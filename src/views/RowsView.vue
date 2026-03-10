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
import { ref, computed, onBeforeMount } from 'vue'

export default {
  setup() {
    const data = ref(null)
    const fetchData = async (year = new Date().getFullYear()) => {
      const url = "https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/rows_" + year + ".json"
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        data.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    const startYear = 2000
    const currentYear = new Date().getFullYear()

    const years = computed(() => Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
      fetchData(event.target.value)
    }

    return { data, years, yearSelected, onYearChange}
  }
}
</script>