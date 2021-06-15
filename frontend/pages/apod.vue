<template>
  <div class="apod">
    <h1>Astronomy Picture Of Day</h1>
    <div id="contentBox_A"></div>
    <div class="arrowHolder">
      <button
        id="bP_A"
        disabled="true"
        class="arrow"
        @click="changeApod(-1)"
      ></button>
      <button
        id="bN_A"
        disabled="true"
        class="arrow"
        @click="changeApod(1)"
      ></button>
    </div>
    <div id="contentBox_A--explanation" class="alert">Loading.....</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { apodAPI } from '../config'

let apod: any[] = []
let focusedApod: number = 0
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
        .catch(() => this.draw(false))
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
      this.draw(true)
    },
    draw(arg: boolean) {
      const box0 = document.getElementById('contentBox_A') as HTMLDivElement
      const box1 = document.getElementById(
        'contentBox_A--explanation'
      ) as HTMLDivElement
      if (arg) {
        box0.innerHTML = ` 
          <h2>${apod[focusedApod].title}</h2>
          <h5>DATE : ${apod[focusedApod].date} </h5>
          <div class="img_holder">
            <img class="apod__photo" src="${apod[focusedApod].url}"
            onerror='this.onerror=null; this.src="https://bpgroup.lv/i/product_images/images/Z2000128389.jpg"'
            /> 
          </div>
        `
        box1.innerHTML = `
          <div class="textBox">${apod[focusedApod].explanation}</div>
        `
      } else {
        box0.innerHTML = ``
        box1.innerHTML = `<div class="alert textBox">Sorry, but we have problem with server.Try again later.<div>`
      }
    },
  },
})
</script>
