<template>
  <div id="app">
    <div id="container">
      <!-- SIDEBAR -->
      <Sidebar></Sidebar>

      <!-- CONTENT -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar/templates/Sidebar.vue'
export default {
  name: "App",
  components: {
    Sidebar
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("CHANGE_ISLOGGED", true)
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(
    at right top,
    rgb(51, 65, 85),
    rgb(30, 41, 59),
    rgb(17, 24, 39)
  );
  display: flex;
  flex-direction: row;
}
.fa-solid {
  color: white;
  padding-top: 1rem;
}
</style>
