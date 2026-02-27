<template>
  <h1>Statistik</h1>
  <p>Statistiken är beräknad på alla rader från och med 1987.</p>
  <p><b>Vinster</b></p>
  <p>Om man alltid hade lagt en rad me de sju mest förekommande nummren (dvs {{ mostFreqNumbers.numbers }}) skulle man genom tiderna ha haft:</p>
  <table v-for="winning in mostFreqNumbers.winnings" :key=winning.category>
    <thead>
        <tr><td>{{ winning.category }} rätt</td></tr>
        <tr><td>{{ winning.total }} st</td></tr>
    </thead>
    <tbody>
        <tr v-for="date in winning.dates" :key=date><td>{{ date }}</td></tr>
    </tbody>
  </table>
  <p><b>Datumrader</b></p>
  <p>I tabellen nedan har jag listat hur många av de dragna raderna som bara innehåller nummror mindre än eller lika med 31 samt hur många rader som innehåller minst ett nummer större än 31.</p>
  <table>
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
  <table>
    <thead>
        <tr><td>Antal nummer</td><td>Unika</td><td>Dragna</td><td>%</td></tr>
    </thead>
    <tbody>
        <tr v-for="combination in combinationStats" :key=combination.numbers>
            <td>{{ combination.numbers }}</td>
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
export default {
  setup() {
    const mostFreqNumbers = {'numbers': [1,3,6,9,14,16,37], 'winnings': [{'category': '4', 'total': 25, 'dates': ['23/2023','26/2021','10/2021','25/2019','39/2017','8/2016','38/2015','34/2015','15/2012','20/2010','13/2008','39/2006','6/2005','11/2004','47/2001','21/2000','4/2000','23/1996','10/1995','39/1994','45/1992','9/1991','20/1990','48/1989','9/1987']},{'category': '5', 'total': 6, 'dates': ['18/2022','29/2019','33/2018','49/2001','19/1998','45/1991']},{'category': '6', 'total': 0, 'dates': []},{'category': '6+1', 'total': 0, 'dates': []},{'category': '7', 'total': 0, 'dates': []}]}
    const dateStats = {'lessThanEqual': {'total': 360, 'percentage': 17.29}, 'greaterThan': {'total': 1722, 'percentage': 82.71}}
    const combinationStats = [{'numbers': 7, 'unique': 18643560, 'drawn': 2082, 'percentage': 0.01},{'numbers': 6, 'unique': 3838380, 'drawn': 14541, 'percentage': 0.38},{'numbers': 5, 'unique': 658008, 'drawn': 42156, 'percentage': 6.41},{'numbers': 4, 'unique': 91390, 'drawn': 49271, 'percentage': 53.91},{'numbers': 3, 'unique': 9880, 'drawn': 9742, 'percentage': 98.6}]

    return { mostFreqNumbers, dateStats, combinationStats }
  }
}
</script>