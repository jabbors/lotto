<template>
  <h1>Statistik</h1>
  <p>Statistiken är beräknad på alla rader från och med 1987.</p>
  <p><b>Vinster</b></p>
  <p>Om man alltid hade lagt en rad me de sju mest förekommande nummren (dvs <span v-if="topSevenNumbers">{{ topSevenNumbers }}</span>) skulle man genom tiderna ha haft:</p>
  <div v-if="matches.length">
    <table v-for="match in matches" :key=match.category>
      <thead>
        <tr><td>{{ match.category }} rätt</td></tr>
        <tr><td>{{ match.total }} st</td></tr>
      </thead>
      <tbody>
        <tr v-for="date in match.dates" :key=date><td>{{ date }}</td></tr>
      </tbody>
  </table>
  </div>
  <p><b>Datumrader</b></p>
  <p>I tabellen nedan har jag listat hur många av de dragna raderna som bara innehåller nummror mindre än eller lika med 31 samt hur många rader som innehåller minst ett nummer större än 31.</p>
  <table v-if="dateStats">
    <thead>
        <tr><td>Beskrivning</td><td>Dragna</td><td>%</td></tr>
    </thead>
    <tbody>
        <tr><td>&lt;= 31</td><td>{{ dateStats.lessThanEqual.total }}</td><td>{{ dateStats.lessThanEqual.percentage }}</td></tr>
        <tr><td>&gt; 31</td><td>{{ dateStats.greaterThan.total }}</td><td>{{ dateStats.greaterThan.percentage }}</td></tr>
    </tbody>
  </table>
  <p><b>Kombinationer</b></p>
  <p>I tabellen nedan har jag listat hur många unika kombinationer av 7, 6, 5, 4, och 3 nummror man kan skapa bland 40 nummror. Dessutom har jag listat hur många av kombinationerna som redan har förekommit om man för varje rad som dragits sedan 1987 skapar unika kombinationer av 7, 6, 5, 4, och 3 nummror.</p>
  <table v-if="combinationStats">
    <thead>
        <tr><td>Antal nummer</td><td>Unika</td><td>Dragna</td><td>%</td></tr>
    </thead>
    <tbody>
        <tr v-for="combination in combinationStats" :key=combination.numbers>
            <td>{{ combination.length }}</td>
            <td>{{ combination.unique }}</td>
            <td>{{ combination.drawn }}</td>
            <td>{{ combination.percentage }}</td>
        </tr>
    </tbody>
  </table>
  <p><b>Alla rader och vinster</b></p>
  <p>Det finns totalt 18643560 st unika rader. Då en rad kostar 1,0 € skulle det kosta 18643560 € att gardera alla rader. Om man en godtycklig vecka garderade alla rader skulle det ge dig följande vinsfördelning:</p>
  <table>
    <tbody>
        <tr>
            <td>7 rätt</td>
            <td>1 st</td>
        </tr>
        <tr>
            <td>6+1 rätt</td>
            <td>21 st</td>
        </tr>
        <tr>
            <td>6 rätt</td>
            <td>203 st</td>
        </tr>
        <tr>
            <td>5 rätt</td>
            <td>10416 st</td>
        </tr>
        <tr>
            <td>4 rätt</td>
            <td>173600 st</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import {ref, onBeforeMount } from 'vue';

export default {
  setup() {
    var rows = []
    const topSevenNumbers = ref(null)
    const matches = ref([])
    const dateStats = ref(null)
    const combinationStats = ref(null)
    const matchNumbers = () => {
      var topSevenNumbersSet = new Set(topSevenNumbers.value)
      // find intersection between sets
      var wins = {4:[], 5:[], 6:[], 61:[], 7:[]}
      for (const row of rows.rounds) {
        var weekYear = row.round+'/'+row.date.substring(0, 4);
        var rowSet = new Set(row.numbers)
        var match = rowSet.intersection(topSevenNumbersSet)
        if (match.size < 4) continue
        if (match.size == 6) {
          var extraSet = new Set(row.extra)
          var matchExtra = extraSet.intersection(topSevenNumbersSet)
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
        rows = await response.json()
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
        topSevenNumbers.value = topSevenNumbersUnsorted.sort(function(a, b) {return a - b})
        matchNumbers()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/daterows_stats.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        dateStats.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
      try {
        const response = await fetch("https://raw.githubusercontent.com/jabbors/lotto-data/refs/heads/master/data/combinations_stats.json")
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        combinationStats.value = await response.json()
      } catch (error) {
        console.error(error.message)
      }
    }
    onBeforeMount(fetchData)

    return { topSevenNumbers, matches, dateStats, combinationStats }
  }
}
</script>