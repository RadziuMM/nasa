<template>
  <div id="app">
    <div id="nav">
      <Menu />
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Menu from "./components/Navigation.vue";
import * as dotenv from "dotenv";
dotenv.config();
export default Vue.extend({
  components: {
    Menu
  }
});
</script>
<style lang="scss">
@import "./sass/main.scss";
</style>
