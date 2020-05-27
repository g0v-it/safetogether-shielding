<template>
  <div class="dashboard">
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  mounted() {
    axios.get("list").then(res => console.log(res.data));
  }
};
</script>
