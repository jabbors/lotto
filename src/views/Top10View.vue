<template>
  <h1>Top 10</h1>
  <p><b>10 mest förekommande nummer</b></p>
  <div v-if="dataAllYears">
    <p>Alla</p>
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
  <div v-if="dataYear">
    <p>{{ currentYear }}</p>
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
  <p><b>Lottorader som förekommit mer än en gång</b></p>
  <div v-if="dataRows">
    <div v-if="dataRows.length7.length">
      <table>
        <thead>
          <tr><th>Kombination</th><th>#</th></tr>
        </thead>
        <tbody>
          <tr v-for="combo in dataRows.length7" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Inga rader
    </div>
    <p><b>10 mest förekommande kombinationerna av 6 siffror</b></p>
    <div>
      <table>
        <thead>
          <tr><th>Kombination</th><th>#</th></tr>
        </thead>
        <tbody>
          <tr v-for="combo in dataRows.length6" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
        </tbody>
      </table>
    </div>
    <p><b>10 mest förekommande kombinationerna av 5 siffror</b></p>
    <div>
      <table>
        <thead>
          <tr><th>Kombination</th><th>#</th></tr>
        </thead>
        <tbody>
          <tr v-for="combo in dataRows.length5" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
        </tbody>
      </table>
    </div>
    <p><b>10 mest förekommande kombinationerna av 4 siffror</b></p>
    <div>
      <table>
        <thead>
          <tr><th>Kombination</th><th>#</th></tr>
        </thead>
        <tbody>
          <tr v-for="combo in dataRows.length4" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
        </tbody>
      </table>
    </div>
    <p><b>10 mest förekommande kombinationerna av 3 siffror</b></p>
    <div>
      <table>
        <thead>
          <tr><th>Kombination</th><th>#</th></tr>
        </thead>
        <tbody>
          <tr v-for="combo in dataRows.length3" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {ref, onBeforeMount } from 'vue';

export default {
  setup() {
    const dataAllYears = ref(null)
    const dataYear = ref(null)
    const dataRows = ref(null)
    const currentYear = new Date().getFullYear()
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataAllYears.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers_"+currentYear+".json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataYear.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/combinations_top10.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataRows.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    return { dataAllYears, dataYear, dataRows, currentYear}
  }
}
</script>