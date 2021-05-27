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
        <span class="title">date:</span>${sols[focusedDay].terrestrial_date} <br/>
         <span class="title">sol:</span>${sols[focusedDay].sol}<br/>
         <span class="title">sunrise:</span>${sols[focusedDay].sunrise}<br/>
        <span class="title"> sunset:</span>${sols[focusedDay].sunset}<br/>
        <span class="title"> season:</span>${sols[focusedDay].season}<br/>
         <span class="title">min_temp:</span>${sols[focusedDay].min_temp}<br/>
         <span class="title">max_temp:</span>${sols[focusedDay].max_temp}<br/>
         <span class="title">pressure:</span>${sols[focusedDay].pressure}<br/>
         <span class="title">ls:</span>${sols[focusedDay].ls}
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
