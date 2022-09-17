<template>
  <div class="home">
    <Sidebar />
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Sidebar from '@/components/layouts/Sidebar'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Sidebar
  }
}
</script>
