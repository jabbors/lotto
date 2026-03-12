<template>
  <h1>Statistik</h1>
  <p>Statistiken är beräknad på alla rader från och med 1987.</p>
  <p><b>Vinster</b></p>
  <p>Om man alltid hade lagt en rad me de sju mest förekommande nummren (dvs <span v-if="dataTopSevenNumbers">{{ dataTopSevenNumbers.toString() }}</span>) skulle man genom tiderna ha haft:</p>
  <div v-if="matches.length" class="container-5-columns">
    <div v-for="match in matches" :key=match.category class="column-left-align-80px">
    <table>
      <thead>
        <tr><td>{{ match.category }} rätt</td></tr>
        <tr><td>{{ match.total }} st</td></tr>
      </thead>
      <tbody>
        <tr v-for="date in match.dates" :key=date><td>{{ date }}</td></tr>
      </tbody>
  </table>
  </div>
  </div>
  <div class="clear"></div>
  <p><b>Datumrader</b></p>
  <p>I tabellen nedan har jag listat hur många av de dragna raderna som bara innehåller nummror mindre än eller lika med 31 samt hur många rader som innehåller minst ett nummer större än 31.</p>
  <table v-if="dataDateRowsStats">
    <thead>
        <tr><td width="80px">Beskrivning</td><td width="80px">Dragna</td><td width="60px">%</td></tr>
    </thead>
    <tbody>
        <tr><td>&lt;= 31</td><td>{{ dataDateRowsStats.lessThanEqual.total }}</td><td>{{ dataDateRowsStats.lessThanEqual.percentage }}</td></tr>
        <tr><td>&gt; 31</td><td>{{ dataDateRowsStats.greaterThan.total }}</td><td>{{ dataDateRowsStats.greaterThan.percentage }}</td></tr>
    </tbody>
  </table>
  <p><b>Kombinationer</b></p>
  <p>I tabellen nedan har jag listat hur många unika kombinationer av 7, 6, 5, 4, och 3 nummror man kan skapa bland 40 nummror. Dessutom har jag listat hur många av kombinationerna som redan har förekommit om man för varje rad som dragits sedan 1987 skapar unika kombinationer av 7, 6, 5, 4, och 3 nummror.</p>
  <table v-if="dataCombinationsStats">
    <thead>
        <tr><td width="140px">Antal nummer</td><td width="80px">Unika</td><td width="80px">Dragna</td><td width="60px">%</td></tr>
    </thead>
    <tbody>
        <tr v-for="combination in dataCombinationsStats" :key=combination.numbers>
            <td>{{ combination.length }}</td>
            <td>{{ combination.unique }}</td>
            <td>{{ combination.drawn }}</td>
            <td>{{ combination.percentage }}</td>
        </tr>
    </tbody>
  </table>
  <p><b>Alla rader och vinster</b></p>
  <p>Det finns totalt 18643560 st unika rader. Då en rad kostar 1,0 € skulle det kosta 18643560 € att gardera alla rader. Om man en godtycklig vecka garderade alla rader skulle det ge dig följande vinstfördelning:</p>
  <table>
    <tbody>
        <tr>
            <th width="80px">7 rätt</th>
            <td wdith="100px">1 st</td>
        </tr>
        <tr>
            <th>6+1 rätt</th>
            <td>21 st</td>
        </tr>
        <tr>
            <th>6 rätt</th>
            <td>203 st</td>
        </tr>
        <tr>
            <th>5 rätt</th>
            <td>10416 st</td>
        </tr>
        <tr>
            <th>4 rätt</th>
            <td>173600 st</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import {ref, onBeforeMount } from 'vue';

export default {
  setup() {
    var dataRows = []
    const dataTopSevenNumbers = ref(null)
    const matches = ref([])
    const dataDateRowsStats = ref(null)
    const dataCombinationsStats = ref(null)
    const matchNumbers = () => {
      var topSevenNumberSet = new Set(dataTopSevenNumbers.value)
      // find intersection between sets
      var wins = {4:[], 5:[], 6:[], 61:[], 7:[]}
      for (const row of dataRows.rounds) {
        var weekYear = row.date.substring(0, 4)+'/'+row.round
        var dataRowset = new Set(row.numbers)
        var match = dataRowset.intersection(topSevenNumberSet)
        if (match.size < 4) continue
        if (match.size == 6) {
          var extraSet = new Set(row.extra)
          var matchExtra = extraSet.intersection(topSevenNumberSet)
          if (matchExtra.size > 0) {
            wins[61].push(weekYear)
          } else {
            wins[6].push(weekYear)
          }
        } else {
          wins[match.size].push(weekYear)
        }
      }
      matches.value.push({'category': '4', 'total': wins[4].length, 'dates': wins[4]})
      matches.value.push({'category': '5', 'total': wins[5].length, 'dates': wins[5]})
      matches.value.push({'category': '6', 'total': wins[6].length, 'dates': wins[6]})
      matches.value.push({'category': '6+1', 'total': wins[61].length, 'dates': wins[61]})
      matches.value.push({'category': '7', 'total': wins[7].length, 'dates': wins[7]})
    }
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/rows.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataRows = await response.json()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/numbers.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        var data = await response.json()
        var topSevenNumbersUnsorted = []
        for (let i = 0; i < 7; i++) {
            topSevenNumbersUnsorted.push(data.distribution[i].number)
        }
        dataTopSevenNumbers.value = topSevenNumbersUnsorted.sort(function(a, b) {return a - b})
        matchNumbers()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/daterows_stats.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataDateRowsStats.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/combinations_stats.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dataCombinationsStats.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    return { dataTopSevenNumbers, matches, dataDateRowsStats, dataCombinationsStats }
  }
}
</script>