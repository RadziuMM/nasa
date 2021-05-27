<template>
  <div class="container">
    <button
      id="bP"
      class="arrow"
      disabled="true"
      @click="changeDay(-1)"
    ></button>
    <div id="contentBox" class="content">Loading......</div>
    <button
      id="bN"
      class="arrow"
      disabled="true"
      @click="changeDay(1)"
    ></button>
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
        .catch(() => {
          this.draw(false)
        })
    },
    draw(arg: boolean) {
      const box = document.getElementById('contentBox') as HTMLDivElement
      if (arg) {
        box.innerHTML = `
        <span class="title">date:</span>${sols[focusedDay].terrestrial_date}
         <span class="title">solar day:</span>${sols[focusedDay].sol}
         <span class="title">sunrise:</span>${sols[focusedDay].sunrise}
        <span class="title"> sunset:</span>${sols[focusedDay].sunset}
        <span class="title"> season:</span>${sols[focusedDay].season}
         <span class="title">max_temp:</span>${sols[focusedDay].max_temp}
         <span class="title">min_temp:</span>${sols[focusedDay].min_temp}
         <span class="title">pressure:</span>${sols[focusedDay].pressure}
        `
      } else {
        box.innerHTML = `Sorry, but we have problem with server.Try again later.`
      }
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
      this.draw(true)
    },
  },
})
</script>
