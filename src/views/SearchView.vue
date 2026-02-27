<template>
  <h1>Sök</h1>
  <p>Skriv in din favoritrad eller någon annan godtycklig rad och se om den skulle ha gett dig vinst.</p>
  <div>
    <div v-if="formInputWarning != null">{{ formInputWarning }}</div>
    <form ref="numberForm">
      <input type="text" size="2" maxlength="2" v-model="numbers.input1" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input2" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input3" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input4" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input5" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input6" />
      <input type="text" size="2" maxlength="2" v-model="numbers.input7" />
      <button type="button" @click="clickSearch">Sök</button>
    </form>
  </div>
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
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const rows = [{'round': '1-1', 'year':2026, 'numbers':[1,2,3,4,5,6,7], 'extra':[8]}, {'round': '2-1', 'year':2026, 'numbers':[11,12,13,14,15,16,17], 'extra':[18]}, {'round': '3-1', 'year':2026, 'numbers':[1,2,3,4,15,16,17], 'extra':[18]}]
    const matches = ref([])
    const numberForm = ref(null)
    const numbers = ref({'input1':'', 'input2':'', 'input3':'', 'input4':'', 'input5':'', 'input6':'', 'input7':''})
    const formInputWarning = ref(null)

    const clickSearch = () => {
      matches.value = []
      matchNumbers()
    }

    const validNumberForm = () => {
      numbers.value.input1 = Number(numbers.value.input1)
      numbers.value.input2 = Number(numbers.value.input2)
      numbers.value.input3 = Number(numbers.value.input3)
      numbers.value.input4 = Number(numbers.value.input4)
      numbers.value.input5 = Number(numbers.value.input5)
      numbers.value.input6 = Number(numbers.value.input6)
      numbers.value.input7 = Number(numbers.value.input7)
      if (numbers.value.input1 < 1 || numbers.value.input1 > 40) return false
      if (numbers.value.input2 < 1 || numbers.value.input2 > 40) return false
      if (numbers.value.input3 < 1 || numbers.value.input3 > 40) return false
      if (numbers.value.input4 < 1 || numbers.value.input4 > 40) return false
      if (numbers.value.input5 < 1 || numbers.value.input5 > 40) return false
      if (numbers.value.input6 < 1 || numbers.value.input6 > 40) return false
      if (numbers.value.input7 < 1 || numbers.value.input7 > 40) return false
      return true
    }

    const matchNumbers = () => {
      if (!validNumberForm()) {
        formInputWarning.value = "ange siffror mellan 1 och 40"
        return
      }
      var numberSet = new Set([numbers.value.input1, numbers.value.input2, numbers.value.input3, numbers.value.input4, numbers.value.input5, numbers.value.input6, numbers.value.input7])
      if (numberSet.size != 7) {
        formInputWarning.value = "sifforna måste vara unika"
        return
      }
      formInputWarning.value = null
      numbers.value = {'input1':'', 'input2':'', 'input3':'', 'input4':'', 'input5':'', 'input6':'', 'input7':''}

      // find intersection between sets
      var wins = {4:[], 5:[], 6:[], 61:[], 7:[]}
      for (const row of rows) {
        var weekYear = row.round+'/'+row.year
        var rowSet = new Set(row.numbers)
        var match = rowSet.intersection(numberSet)
        if (match.size < 4) continue
        if (match.size == 6) {
          var extraSet = new Set(row.extra)
          var matchExtra = extraSet.intersection(numberSet)
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

    return { matches, numberForm, numbers, formInputWarning, clickSearch }
  }
}
</script>