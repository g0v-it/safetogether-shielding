<template>
  <div class="dashboard">
    <Navbar />
    <div class="container">
      <div class="row m-4" v-for="cred in credentials" :key="cred.name">
        <p class="col">{{cred.name}}</p>
        <p class="col">{{cred.surname}}</p>
        <p class="col">{{formatDate(cred.timestamp)}}</p>
        <div class="col d-flex justify-content-around">
          <button @click="$router.push({name:'details'})" class="btn btn-primary">Details</button>
          <button @click="$router.push({name:'revoke'})" class="btn btn-warning">Revoke</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import credentials from "@/util/credentials";

export default Vue.extend({
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
    formatDate(date: Date) {
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }
  }
});
</script>

<style scoped>
/* .row{
  margin: 2rem;
} */
</style>