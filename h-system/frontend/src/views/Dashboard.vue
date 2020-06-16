<template>
  <div class="dashboard">
    <Navbar />
    <div class="container">
      <div class="row m-4" v-for="cred in credentials" :key="cred.name+cred.surname">
        <p class="col">{{cred.name}}</p>
        <p class="col">{{cred.surname}}</p>
        <p class="col">{{formatDate(new Date(cred.timestamp))}}</p>
        <div class="col d-flex justify-content-around">
          <button
            @click="$router.push({name:'issue', query:{...cred}})"
            class="btn btn-outline-primary"
          >Duplicate</button>
          <button @click="$router.push({name:'revoke'})" class="btn btn-outline-danger">Revoke</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import http from "../util/http";

export default Vue.extend({
  name: "Dashboard",
  data() {
    return {
      credentials: null
    };
  },
  components: {
    Navbar
  },
  created() {
    http.get("/certificates").then(res => (this.credentials = res.data));
  },
  methods: {
    formatDate(date: Date) {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
  }
});
</script>

<style scoped>
/* .row{
  margin: 2rem;
} */
</style>