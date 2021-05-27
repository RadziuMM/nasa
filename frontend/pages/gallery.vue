<template>
  <div class="gallery">
    <div class="gallery__filter">
      Filter
      <div class="gallery__filter--date">
        DATE:<br />
        <input
          id="input__date"
          type="date"
          value="2017-12-12"
          @change="setDate()"
        /><br />
      </div>
      <div class="gallery__filter--rover">
        ROVER:<br />
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
        CAMERA:<br />
        <input type="checkbox" name="fhaz" @click="setCamera('fhaz')" />
        <label for="fhaz"> fhaz</label><br />
        <input type="checkbox" name="rhaz" @click="setCamera('rhaz')" />
        <label for="rhaz"> rhaz</label> <br />
        <input type="checkbox" name="mast" @click="setCamera('mast')" />
        <label for="mast"> mast</label><br />
        <input type="checkbox" name="chemcam" @click="setCamera('chemcam')" />
        <label for="chemcam"> chemcam</label><br />
        <input type="checkbox" name="mahli" @click="setCamera('mahli')" />
        <label for="mahli"> mahli</label><br />
        <input type="checkbox" name="mardi" @click="setCamera('mardi')" />
        <label for="mardi"> mardi</label><br />
        <input type="checkbox" name="navcam" @click="setCamera('navcam')" />
        <label for="navcam"> navcam</label><br />
        <input type="checkbox" name="pancam" @click="setCamera('pancam')" />
        <label for="pancam"> pancam</label><br />
        <input type="checkbox" name="minites" @click="setCamera('minites')" />
        <label for="minites"> minites</label><br />
      </div>
    </div>
    <div class="gallery__photos">
      <ul>
        <li v-for="item in Gallery" :key="item.id">
          <img class="gallery__photos--img" :src="item.img_src" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
const API = `http://www.localhost:7000/photos `
const cameras: any[] = []
const rovers: any = []
let date: string = ''
export default Vue.extend({
  data() {
    return {
      Gallery: [],
    }
  },
  mounted() {
    this.setDate()
  },
  methods: {
    setRovers(arg: any) {
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
      //
      const inputs = document.getElementsByTagName('input')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true
      }
      //
      this.Gallery = []
      if (rovers.length === 0) {
        rov = ['spirit', 'opportunity', 'curiosity']
      } else {
        rov = rovers
      }
      if (cameras.length !== 0) {
        cam = cameras
      }
      //
      rov.forEach((element) => {
        cam.forEach((ele) => {
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
