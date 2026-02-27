<template>
  <h1>Hem</h1>
  <p>En dag bestämde jag mig för att öka min chanser att vinna på lotto. Jag ville undersöka vilka nummer samt vilka kombinationer som förekommer mest. Jag samlade data från Veikkaus hemsida och gjorde resultaten tillgänglig för alla i form av denna webapp.</p>

  <p><b>Senaste raden</b></p>
  <table>
    <tbody>
      <tr>
        <td>{{ data.lastRow.date }}</td>
        <td>{{ data.lastRow.round }}</td>
        <td>{{ data.lastRow.numbers }}</td>
        <td>{{ data.lastRow.extra }}</td>
      </tr>
    </tbody>
  </table>

  <p><b>Kort om lotto</b></p>
  <p>Den första lottoraden drogs 3.1.1971. Under detta år drog man 6+3 nummror varje vecka. Från och med 1/1972 fram till 39/1980 drog man 6+2. Därefter fram till 1/1986 drog man 7+4. Från 17/1986 ända fram till 40/2011 drog man 7+3. Fram till 48/2016 drog man 7+2. Idag dras 7+1 nummror varje vecka.</p>
  <p>Den 24:e dragningen år 2009 introducerades nya vinstklasser genom LottoPlus. En rad LottoPlus kostade 0,20€ mer per rad vilket resulterade i ett radpris på 1€ per rad jamfört med 0,80€ för en vanlig rad. Den 41:e dragning år 2011 sammanslogs vinstklasserna i LottoPlus med de normala vinstklasserna och radpriset blev 1€. Den 23:e dragningen år 2014 eliminerade man LottoPlus vinstklasserna och införde istället ett dubbleringsnummer som dubblerar vinsten. I december 2016 återinförde man boll nummer 40 och en ny vinstklass infördes (3+1). Ändringen medförde också att man bara drar ett tilläggsnummer per vecka. Den 3:e dragningen år 2018 eliminarade man LottoPlus vinstklasserna och införde ett plus nummer. Om det dragna plusnummeret ingår i en vinnande rad så kan vinsten dubbleras upp till 5 gånger. Priset för en normal rad är 1€ och med plussad rad koster 1,50€.</p>

  <p><b>Om sidan</b></p>
  <p>Denna sida innehåller alla lottorader (7+3), (7+2) och (7+1) från år 1987 till den senaste. Sammanlagt {{ data.totalRows }} rader. Tanken är att denna sida skall innehålla alla lottorader, men det får bli ett senare projekt.</p>
</template>

<script>

export default {
  setup() {
    const data = {'lastRow': {'date': '2026-01-31', 'round': '5-1', 'numbers': [7, 17, 18, 19, 22, 25, 33], 'extra': [26] }, 'totalRows': 2079}

    return { data }
  }
}
</script>