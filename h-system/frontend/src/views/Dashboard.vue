<template>
  <div class="dashboard">
    <Navbar />
    <div class="flex flex-col mx-8 my-6">
      <div class="flex flex-wrap items-center justify-between p-3 h-16" v-for="cred in credentials" :key="cred.name">
        <p class="mx-4">{{cred.name}}</p>
        <p class="mx-4" >{{cred.surname}}</p>
        <p class="mx-4" >{{formatDate(cred.timestamp)}}</p>
        <button @click="$router.push({name:'details'})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto rounded">Details</button>
        <button @click="$router.push({name:'revoke'})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded">Revoke</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import credentials from "../util/credentials.js";

export default {
  name: "Dashboard",
  data() {
    return {
      credentials
    };
  },
  components: {
    Navbar
  },
  methods: {
    formatDate(date) {
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }
  }
};
</script>

<style scoped>
/* .credential-item {
  min-height: 5rem;
} */
</style>