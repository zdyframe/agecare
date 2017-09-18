<template>
  <div id="app">
    <!--模态框组件-->
    <modal></modal>
    <!--路由页-->
    <router-view></router-view>
  </div>
</template>

<script>

  import modal from './components/modal/modal'

  export default {
    name: 'app',
    components : {
      modal
    }
  }
</script>

<style>

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
