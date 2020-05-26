<template>
  <div class="dashboard">
    <Navbar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Dashboard',
  components:{
    Navbar
  }
}
</script>
