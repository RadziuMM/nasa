<template>
  <div class="apod">
    <div id="contentBox_A"></div>
    <button id="bP_A" class="arrow" @click="changeApod(-1)"></button>
    <button id="bN_A" class="arrow" @click="changeApod(1)"></button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

let apod: any[] = []
let focusedApod = 0
const apodAPI = 'http://www.localhost:7000/apod'
export default Vue.extend({
  mounted() {
    this.getApod()
  },
  methods: {
    getApod() {
      axios
        .get(apodAPI)
        .then((response) => {
          return response.data.apod
        })
        .then((response) => {
          apod = response
          focusedApod = apod.length - 1
        })
        .then(() => this.changeApod(0))
    },
    changeApod(int: number) {
      focusedApod += int
      const bP = document.getElementById('bP_A') as HTMLButtonElement
      const bN = document.getElementById('bN_A') as HTMLButtonElement
      try {
        if (focusedApod === 0) {
          bP.disabled = true
        } else {
          bP.disabled = false
        }
        if (focusedApod === apod.length - 1) {
          bN.disabled = true
        } else {
          bN.disabled = false
        }
      } catch (error) {}
      this.draw()
    },
    draw() {
      const box = document.getElementById('contentBox_A') as HTMLDivElement
      box.innerHTML = ` 
        <h2>${apod[focusedApod].title}</h2>
        <h5>DATE : ${apod[focusedApod].date} </h5>
        <div class="img_holder">
          <img class="apod__photo" src="${apod[focusedApod].url}"
          onerror='this.onerror=null; this.src="https://bpgroup.lv/i/product_images/images/Z2000128389.jpg"'
          /> 
        </div>
        <div class="textBox">${apod[focusedApod].explanation}</div>
      `
    },
  },
})
</script>
