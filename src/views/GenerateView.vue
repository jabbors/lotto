<template>
  <h1>Generera</h1>
  <p>Efter att ha analyserat resultaten konstaterade jag det inte lönar sig att spela med lottorader som redan förekommit en eller flera gånger, eftersom ingen rad ännu har förekommit mer än en gång. Dessutom är förekomsten bland kombinationer av 6 och 5 siffror väldigt låg. Därför beslöt jag att implementera en generator som genererar slumpmässiga rader som inte skulle ha gett en vinst med mer än 4 rätt.</p>
  <p>Välj antal rader du vill generera i fältet nedan.</p>
  <form>
    <select v-model="rowsSelected">
      <option v-for="option in rowsOptions" :key=option :value="option">{{option}}</option>
    </select>
    <button type="button" @click="clickRows">Generera</button>
  </form>
  <p></p>
  <div v-if="rowsGenerated.length">
    <table>
      <tbody>
        <tr v-for="(row, i) in rowsGenerated" :key=row><th width="30">{{ i+1 }}</th><td>{{ row.toString() }}</td></tr>
      </tbody>
    </table>
  </div>
  <p><b>Statistik över genererade rader</b></p>
    <p>Varje vecka genereras 1000 slumpmässiga rader. Här samlas information om hur många rätt de genererade raderna skulle ha gett per vecka.</p>
  <form>
    <select v-model="yearSelected" @change="onYearChange">
        <option v-for="year in years" :key=year :value="year">{{year}}</option>
    </select>
  </form>
  <p></p>
  <table v-if="data">
    <thead>
        <tr>
            <th width="60">Omgång</th>
            <th width="30">7</th>
            <th width="30">6+1</th>
            <th width="30">6</th>
            <th width="30">5</th>
            <th width="30">4</th>
            <th width="30">3+1</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="round in data.rounds" :key=round.round>
            <td>{{ round.round }}</td>
            <td>{{ round.winnings[7] }}</td>
            <td>{{ round.winnings['6p1'] }}</td>
            <td>{{ round.winnings[6] }}</td>
            <td>{{ round.winnings[5] }}</td>
            <td>{{ round.winnings[4] }}</td>
            <td>{{ round.winnings['3p1'] }}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'

export default {
  setup() {
    const data = ref(null)
    const rowsOptions = ref([1,2,3,4,5,6,7,8,9,10,11,12])
    const rowsSelected = ref(6)
    const rowsGenerated = ref([])
    var preGeneratedRows = null
    const fetchData = async (year = new Date().getFullYear()) => {
      if (preGeneratedRows === null) {
        try {
          const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/generated_rows.json")
          if (!response.ok) throw new Error(`Response status: ${response.status}`)
          preGeneratedRows = await response.json()
        } catch (error) {
          console.error(error.message)
        }
      }
      const url = "https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/generated_stats_" + year + ".json"
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        data.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)
    const clickRows = () => {
      var randomNumbers = []
      while (randomNumbers.length < rowsSelected.value ) {
        var randomNumber = Math.floor(Math.random() * preGeneratedRows.length);
        if (randomNumbers.includes(randomNumber)) continue
        randomNumbers.push(randomNumber)
      }
      rowsGenerated.value = []
      randomNumbers.forEach(randomNumber => rowsGenerated.value.push(preGeneratedRows[randomNumber]))
    }
    const currentYear = new Date().getFullYear()
    const startYear = currentYear
    const endYear = 2009

    const years = computed(() => Array.from(
        { length: startYear - endYear + 1 },
        (_, i) => startYear - i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
      fetchData(event.target.value)
    }

    return { rowsOptions, rowsSelected, rowsGenerated, clickRows, data, years, yearSelected, onYearChange}
  }
}
</script>