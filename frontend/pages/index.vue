<template>
  <div class="container">
    <button id="bP" class="arrow" @click="changeDay(-1)">Previus</button>
    <div id="contentBox" class="content">content</div>
    <button id="bN" class="arrow" @click="changeDay(1)">Next</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

let sols: any = []
let focusedDay = 0
const solsApi = 'http://www.localhost:7000/sols'
export default Vue.extend({
  mounted() {
    this.getSols()
  },
  methods: {
    getSols() {
      axios
        .get(solsApi)
        .then((response) => {
          return response.data.sols
        })
        .then((response) => {
          sols = response
          focusedDay = sols.length - 1
        })
        .then(() => this.changeDay(0))
    },
    draw() {
      const box = document.getElementById('contentBox') as HTMLDivElement
      box.innerHTML = `
      date:${sols[focusedDay].terrestrial_date} <br/>
      sol:${sols[focusedDay].sol}<br/>
      sunrise:${sols[focusedDay].sunrise}<br/>
      sunset:${sols[focusedDay].sunset}<br/>
      season:${sols[focusedDay].season}<br/>
      min_temp:${sols[focusedDay].min_temp}<br/>
      max_temp:${sols[focusedDay].max_temp}<br/>
      pressure:${sols[focusedDay].pressure}<br/>
      ls:${sols[focusedDay].ls}
      `
    },
    changeDay(int: number) {
      focusedDay += int
      const bP = document.getElementById('bP') as HTMLButtonElement
      const bN = document.getElementById('bN') as HTMLButtonElement
      if (focusedDay === 0) {
        bP.disabled = true
      } else {
        bP.disabled = false
      }
      if (focusedDay === sols.length - 1) {
        bN.disabled = true
      } else {
        bN.disabled = false
      }
      this.draw()
    },
  },
})
</script>
