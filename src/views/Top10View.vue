<template>
  <h1>Top 10</h1>
  <p><b>10 mest förekommande nummer</b></p>
  <div class="container-2-columns">
  <div v-if="dataNumbersAll" class="left-align">
    <p>Alla</p>
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
  <div v-if="dataNumbersYear" class="left-align">
    <p>{{ currentYear }}</p>
    <p>Medeltal: {{ dataNumbersYear.average}}</p>
    <table>
      <thead>
        <tr>
          <th width="60px">Nummer</th>
          <th width="30px">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="number in dataNumbersYear.distribution" :key=number.number>
          <td>{{ number.number }}</td>
          <td>{{ number.frequency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  <div class="clear"></div>
  <div v-if="dataCombinations">
    <div v-for="combinations in dataCombinations" :key="combinations">
      <p><b>10 mest förekommande kombinationerna av {{ combinations.length }} siffror</b></p>
      <div v-if="combinations.combinations.length">
        <table>
          <thead>
            <tr><th width="180px">Kombination</th><th width="30px">#</th></tr>
          </thead>
          <tbody>
            <tr v-for="combination in combinations.combinations" :key=combination><td>{{ combination.numbers.toString() }}</td><td>{{ combination.frequency }}</td></tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        Inga rader
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onBeforeMount } from 'vue';

export default {
  setup() {
    const dataNumbersAll = ref(null)
    const dataNumbersYear = ref(null)
    const dataCombinations = ref(null)
    const currentYear = new Date().getFullYear()
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataNumbersAll.value = await response.json()
        dataNumbersAll.value.distribution = dataNumbersAll.value.distribution.slice(0,10)
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers_"+currentYear+".json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataNumbersYear.value = await response.json()
        dataNumbersYear.value.distribution = dataNumbersYear.value.distribution.slice(0,10)
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/combinations_top10.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataCombinations.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    return { dataNumbersAll, dataNumbersYear, dataCombinations, currentYear}
  }
}
</script>