<template>
  <h1>Nummerfördelning</h1>
  <form>
    <select v-model="yearSelected" @change="onYearChange">
        <option v-for="year in years" :key=year :value="year">{{year}}</option>
    </select>
  </form>
  <div class="container-2-columns">
  <div v-if="dataAllYears" class="left-align">
    <p>Alla</p>
    <p>Medeltal: {{ dataAllYears.average}}</p>
    <table>
      <thead>
        <tr>
          <th width="60px">Nummer</th>
          <th width="30px">#</th>
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
  <div v-if="dataYear" class="left-align">
    <p>{{ yearSelected}}</p>
    <p>Medeltal: {{ dataYear.average}}</p>
    <table>
      <thead>
        <tr>
          <th width="60px">Nummer</th>
          <th width="30px">#</th>
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
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'

export default {
  setup() {
    const dataAllYears = ref(null)
    const dataYear = ref(null)
    const fetchData = async (year = new Date().getFullYear()) => {
      if (dataAllYears.value === null) {
        try {
          const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers.json")
          if (!response.ok) throw new Error(`Response status: ${response.status}`)
          dataAllYears.value = await response.json()
        } catch (error) {
          console.error(error.message)
        }
      }
      const url = "https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers_" + year + ".json"
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataYear.value = await response.json()
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

    return { dataAllYears, dataYear, years, yearSelected, onYearChange}
  }
}
</script>