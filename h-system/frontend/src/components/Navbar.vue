<template>
  <nav class="navbar navbar-light bg-light">
    <a href="#" @click="$router.push({name:'dashboard'})" class="navbar-brand">H-System</a>
    <div class="d-flex">
      <button @click="$router.push({name:'issue'})" class="btn btn-primary mr-3">New certificate</button>
      <button @click="logout" class="btn btn-outline-secondary">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { logoutUser } from "@/util/auth";

export default Vue.extend({
  name: "Navbar",
  methods: {
    logout() {
      logoutUser();
      this.$router.push({ name: "login" });
    }
  }
});
</script>