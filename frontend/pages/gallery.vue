<template>
  <div class="gallery">
    <h2>Gallery</h2>
    <div class="gallery__filter">
      <h3 class="subtitle">Filter</h3>
      <div class="gallery__filter--date">
        <span class="subtitle">DATE:</span><br />
        <input
          id="input__date"
          type="date"
          value="2017-12-12"
          @change="setDate()"
        /><br />
      </div>
      <div class="gallery__filter--rover">
        <span class="subtitle">ROVER:</span><br />
        <input
          type="checkbox"
          name="curiosity"
          @click="setRovers('curiosity')"
        />
        <label for="curiosity"> curiosity</label><br />
        <input
          type="checkbox"
          name="opportunity"
          @click="setRovers('opportunity')"
        />
        <label for="opportunity"> opportunity</label> <br />
        <input type="checkbox" name="spirit" @click="setRovers('spirit')" />
        <label for="spirit"> spirit</label><br />
      </div>
      <div class="gallery__filter--camera">
        <span class="subtitle">CAMERA:</span><br />
        <span v-for="item in Cameras" :key="item">
          <input type="checkbox" :name="item" @click="setCamera(item)" />
          <label :for="item"> {{ item }}</label>
          <br />
        </span>
      </div>
    </div>
    <div id="gallery" class="gallery__photos">
      <div id="alert"></div>
      <ul>
        <li v-for="item in Gallery" :key="item.id">
          <img class="gallery__photos--img" :src="item.img_src" alt="" />
          <div>
            <span class="photoTitle">Date:</span>{{ item.earth_date }} <br />
            <span class="photoTitle">Photo id:</span>{{ item.id }}<br />
            <span class="photoTitle">Solar day:</span>{{ item.sol }} <br />
            <span class="photoTitle">Camera:</span>{{ item.camera.full_name }}
            <br />
            <span class="photoTitle">Rover:</span>{{ item.rover.name }} <br />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import { photosAPI } from '../config'

const API = `${photosAPI}`
const cameras: string[] = []
const rovers: string[] = []
let quene: number = 0
let date: string = ''
export default Vue.extend({
  data() {
    return {
      Gallery: [],
      Cameras: [
        'fhaz',
        'rhaz',
        'mast',
        'chemcam',
        'mahli',
        'mardi',
        'navcam',
        'pancam',
        'minites',
      ],
    }
  },
  mounted() {
    this.setDate()
  },
  methods: {
    setRovers(arg: string) {
      if (rovers.includes(arg)) {
        const index = rovers.indexOf(arg)
        if (index > -1) {
          rovers.splice(index, 1)
        }
      } else {
        rovers.push(arg)
      }
      this.sendRequest()
    },
    setCamera(arg: any) {
      if (cameras.includes(arg)) {
        const index = cameras.indexOf(arg)
        if (index > -1) {
          cameras.splice(index, 1)
        }
      } else {
        cameras.push(arg)
      }
      this.sendRequest()
    },
    setDate() {
      date = (document.getElementById('input__date') as HTMLInputElement).value
      this.sendRequest()
    },
    sendRequest() {
      let cam: any[] = ['all']
      let rov: any[] = []
      const alert = document.getElementById('alert') as HTMLDivElement
      alert.innerHTML = ``
      const inputs = document.getElementsByTagName('input')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true
      }
      this.Gallery = []
      if (rovers.length === 0) {
        rov = ['spirit', 'opportunity', 'curiosity']
      } else {
        rov = rovers
      }
      if (cameras.length !== 0) {
        cam = cameras
      }
      rov.forEach((element) => {
        cam.forEach((ele) => {
          quene++
          axios
            .post(API, { date, rover: element, camera: ele })
            .then((response) => {
              return response.data.photos
            })
            .then((response) => {
              response.forEach((element: never) => {
                this.Gallery.push(element)
              })
            })
            .then(() => {
              const inputs = document.getElementsByTagName('input')
              quene--
              if (quene === 0) {
                for (let i = 0; i < inputs.length; i++) {
                  inputs[i].disabled = false
                }
              }
            })
            .catch(() => {
              const inputs = document.getElementsByTagName('input')
              const alert = document.getElementById('alert') as HTMLDivElement
              alert.innerHTML = `<div class="alert ">Sorry, but we have problem with server.Try again later.<div>`
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].disabled = false
              }
            })
        })
      })
    },
  },
})
</script>
