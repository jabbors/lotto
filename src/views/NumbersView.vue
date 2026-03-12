<template>
  <h1>Nummerfördelning</h1>
  <form>
    <select v-model="yearSelected" @change="onYearChange">
        <option v-for="year in years" :key=year :value="year">{{year}}</option>
    </select>
  </form>
  <div class="container-2-columns">
  <div v-if="dataNumbersAll" class="left-align">
    <p>År: Alla</p>
    <p>Medeltal: {{ dataNumbersAll.average}}</p>
    <table>
      <thead>
        <tr>
          <th width="60px">Nummer</th>
          <th width="30px">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="number in dataNumbersAll.distribution" :key=number.number>
          <td>{{ number.number }}</td>
          <td>{{ number.frequency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="dataNumbers" class="left-align">
    <p>År: {{ yearSelected}}</p>
    <p>Medeltal: {{ dataNumbers.average}}</p>
    <table>
      <thead>
        <tr>
          <th width="60px">Nummer</th>
          <th width="30px">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="number in dataNumbers.distribution" :key=number.number>
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
    const dataNumbersAll = ref(null)
    const dataNumbers = ref(null)
    const fetchData = async (year = new Date().getFullYear()) => {
      if (dataNumbersAll.value === null) {
        try {
          const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers.json")
          if (!response.ok) throw new Error(`Response status: ${response.status}`)
          dataNumbersAll.value = await response.json()
        } catch (error) {
          console.error(error.message)
        }
      }
      const url = "https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers_" + year + ".json"
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataNumbers.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    const currentYear = new Date().getFullYear()
    const startYear = currentYear
    const endYear = 1987

    const years = computed(() => Array.from(
        { length: startYear - endYear + 1 },
        (_, i) => startYear - i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
      fetchData(event.target.value)
    }

    return { dataNumbersAll, dataNumbers, years, yearSelected, onYearChange}
  }
}
</script>