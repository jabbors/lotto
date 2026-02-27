<template>
  <h1>Top 10</h1>
  <p><b>10 mest förekommande nummer</b></p>
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
  <p><b>Lottorader som förekommit mer än en gång</b></p>
  <div v-if="dataRows.combo7.length">
    <table>
      <thead>
        <tr><th>Kombination</th><th>#</th></tr>
      </thead>
      <tbody>
        <tr v-for="combo in dataRows.combo7" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
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
        <tr v-for="combo in dataRows.combo6" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
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
        <tr v-for="combo in dataRows.combo5" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
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
        <tr v-for="combo in dataRows.combo4" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
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
        <tr v-for="combo in dataRows.combo3" :key=combo><td>{{ combo.numbers }}</td><td>{{ combo.frequency }}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  setup() {
    const dataAllYears = {'year': 0, 'average': 485, 'distribution': [{'number': 16, 'frequency': 534}, {'number': 3, 'frequency': 530}, {'number': 6, 'frequency': 530}]}
    const dataYear = {'year': 2026, 'average': 1, 'distribution': [{'number': 3, 'frequency': 2}, {'number': 4, 'frequency': 2}, {'number': 7, 'frequency': 2}]}
    const dataRows = {'combo7': [{'numbers': [1,2,3,4,5,6,7], 'frequency': 1}], 'combo6': [{'numbers': [8, 11, 17, 23, 24, 35], 'frequency': 3},{'numbers': [2, 15, 17, 18, 20, 27], 'frequency': 2},{'numbers': [10, 23, 30, 32, 34, 35], 'frequency': 2},{'numbers': [9, 20, 24, 27, 34, 38], 'frequency': 2},{'numbers': [8, 11, 13, 19, 31, 39], 'frequency': 2},{'numbers': [4, 6, 7, 11, 25, 28], 'frequency': 2},{'numbers': [10, 12, 14, 16, 30, 38], 'frequency': 2},{'numbers': [1, 5, 23, 25, 31, 37], 'frequency': 2},{'numbers': [6, 7, 12, 22, 32, 36], 'frequency': 2},{'numbers': [1, 19, 20, 24, 33, 38], 'frequency': 2}], 'combo5': [{'numbers': [6, 18, 21, 28, 33], 'frequency': 4}, {'numbers': [1, 5, 23, 25, 31], 'frequency': 4}, {'numbers': [20, 25, 27, 34, 38], 'frequency': 3},{'numbers': [8, 11, 13, 19, 39], 'frequency': 3},{'numbers': [2, 13, 17, 33, 39], 'frequency': 3},{'numbers': [8, 11, 19, 31, 39], 'frequency': 3},{'numbers': [6, 21, 22, 24, 38], 'frequency': 3},{'numbers': [4, 6, 7, 11, 31], 'frequency': 3},{'numbers': [3, 7, 10, 30, 33], 'frequency': 3},{'numbers': [8, 11, 22, 27, 35], 'frequency': 3}], 'combo4': [{'numbers': [3, 5, 26, 28], 'frequency': 7},{'numbers': [3, 24, 33, 38], 'frequency': 7},{'numbers': [6, 9, 38, 39], 'frequency': 6},{'numbers': [6, 21, 22, 24], 'frequency': 6},{'numbers': [5, 10, 17, 20], 'frequency': 6},{'numbers': [18, 22, 36, 38], 'frequency': 6},{'numbers': [6, 21, 28, 33], 'frequency': 6},{'numbers': [19, 32, 35, 36], 'frequency': 6},{'numbers': [8, 9, 13, 19], 'frequency': 6},{'numbers': [4, 6, 7, 11], 'frequency': 6}], 'combo3': [{'numbers': [1, 23, 25], 'frequency': 20},{'numbers': [3, 33, 38], 'frequency': 20},{'numbers': [6, 18, 33], 'frequency': 19},{'numbers': [3, 16, 28], 'frequency': 19},{'numbers': [3, 17, 39], 'frequency': 19},{'numbers': [9, 35, 36], 'frequency': 18},{'numbers': [1, 2, 29], 'frequency': 18},{'numbers': [6, 17, 25], 'frequency': 17},{'numbers': [17, 19, 33], 'frequency': 17},{'numbers': [6, 26, 39], 'frequency': 17}]}

    return { dataAllYears, dataYear, dataRows }
  }
}
</script>