<template>
  <div class="menu">
    <div class="menu__handler">
      <div>MENU</div>
    </div>
    <ul class="menu__links">
      <li>
        <NuxtLink class="link" to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink class="link" to="apod">APOD</NuxtLink>
      </li>
      <li>
        <NuxtLink class="link" to="gallery">Gallery</NuxtLink>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
$white: #f0e7e7;
$brown: #451804;
$orage: #c1440e;
$darkYellow: #e77d11;
$lightYellow: #fda600;
.menu {
  position: fixed;
  top: 0;
  left: 100vw;
  background-color: black;
  height: 100vh;
  width: 30vw;
  transform: translate(-20%, 0);
  transition: 1s;
  &:hover {
    transform: translate(-100%, 0);
  }
  & > .menu__handler {
    color: $orage;
    float: left;
    height: 100vh;
    width: 20%;
    margin-top: 50vh;
    font-size: 24px;
    letter-spacing: 10px;
    transform: translate(0%, -13%);
    & > div {
      transform: rotate(270deg);
    }
  }
  & > .menu__links {
    float: left;
    height: 100vh;
    width: 80%;
    list-style-type: none;
    & > li {
      text-align: center;
      margin: 10px;
      transition: 0.5s;
      &:hover {
        transform: scale(1.2);
        & > a {
          color: $darkYellow;
        }
      }
      &:first-child {
        margin-top: 30vh;
      }
      & > a {
        color: $lightYellow;
        text-decoration: none;
        font-size: 24px;
        letter-spacing: 5px;
      }
      .nuxt-link-exact-active {
        color: $darkYellow;
      }
    }
  }
}
</style>
