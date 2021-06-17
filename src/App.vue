<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="div">
      <router-link to="/store" tag="h1">Store页面</router-link> |
      <router-link to="/axios" tag="h1">axios页面</router-link> 
      <!-- <router-link to="/other" tag="h1">其他页面</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
.div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
