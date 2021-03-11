<template>
  <div id="app">
    <div >
      <router-view />
    </div>

    <div v-if="loading" style="position:absolute; width: 100%; height:100%; top:0; left:0; z-index:10000; background-color:white">
      <div id="logo-div" style="margin-left: auto; margin-right: auto">
          <img id="logo-img" src="./assets/omint-viagem.png">
      </div>
    </div>

  </div>

</template>

<script>

import store from './store'

export default {
  name: 'app',
  data () {
    return {
      name: '',
      position: '',
      loading: true
    }
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 3000)

    console.log(store.state)
  }
}

</script>

<style>
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#logo-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00316B;

}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
