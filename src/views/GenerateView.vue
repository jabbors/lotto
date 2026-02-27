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
  <div v-if="rowsGenerated.length">
    <table>
      <tbody>
        <tr v-for="row in rowsGenerated" :key=row><td>{{ row }}</td></tr>
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
  <table>
    <thead>
        <tr>
            <th>Omgång</th>
            <th>Vinster</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="round in data.rounds" :key=round.round>
            <td>{{ round.round }}</td>
            <td>{{ round.wins }}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const rowsOptions = ref([1,2,3,4,5,6,7,8,9,10,11,12])
    const rowsSelected = ref(6)
    const rowsGenerated = ref([])
    const preGeneratedRows = [[1,1,1,1,1,1,1],[2,2,2,2,2,2,2],[3,3,3,3,3,3,3],[4,4,4,4,4,4,4],[5,5,5,5,5,5,5],[6,6,6,6,6,6,6],[7,7,7,7,7,7,7],[8,8,8,8,8,8,8],[9,9,9,9,9,9,9],[10,10,10,10,10,10,10],[11,11,11,11,11,11,11],[12,12,12,12,12,12,12],[13,13,13,13,13,13,13],[14,14,14,14,14,14,14],[15,15,15,15,15,15,15],[16,16,16,16,16,16,16],[17,17,17,17,17,17,17],[18,18,18,18,18,18,18],[19,19,19,19,19,19,19],[20,20,20,20,20,20,20]]
    const clickRows = () => {
      var randomNumbers = []
      while (randomNumbers.length <= rowsSelected.value ) {
        var randomNumber = Math.floor(Math.random() * preGeneratedRows.length);
        if (randomNumbers.includes(randomNumber)) continue
        randomNumbers.push(randomNumber)
      }
      rowsGenerated.value = []
      randomNumbers.forEach(randomNumber => rowsGenerated.value.push(preGeneratedRows[randomNumber]))
    }
    const data = ref({'rounds': [{'round': '5-1', 'wins': [{'7':0, '6p1': 0, '6': 0, '5': 0, '4': 8, '3p1': 5}]},{'round': '4-1', 'wins': [{'7':0, '6p1': 0, '6': 0, '5': 0, '4': 10, '3p1': 5}]}]})
    const startYear = 2009
    const currentYear = new Date().getFullYear()

    const years = computed(() => Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
        )
    )
    const yearSelected = ref(currentYear)
    const onYearChange = (event) => {
        console.log(event.target.value)
        data.value = {'year': event.target.value, 'rounds': [{'round': '52-1', 'wins': [{'7':0, '6p1': 0, '6': 0, '5': 0, '4': 7, '3p1': 9}]},{'round': '51-1', 'wins': [{'7':0, '6p1': 0, '6': 0, '5': 0, '4': 7, '3p1': 4}]}]}
    }

    return { rowsOptions, rowsSelected, rowsGenerated, clickRows, data, years, yearSelected, onYearChange}
  }
}
</script>