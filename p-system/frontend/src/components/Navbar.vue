<template>
  <nav class="navbar navbar-light bg-light">
    <router-link :to="{ name: home}" class="navbar-brand">P-System</router-link>
    <!-- <a @click="$router.push({name:home})" class="navbar-brand">P-System</a> -->
    <!-- Mettere nome operatore loggato -->
    <div class="d-flex">
      <router-link :to="{name: btnNewRoute}"  class="btn btn-primary mr-3">{{btnNewString}}</router-link>
      <!-- <button
        @click="$router.push({name: btnNewRoute})"
        class="btn btn-primary mr-3"
      >{{btnNewString}}</button> -->
      <button @click="logout" class="btn btn-outline-secondary">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { logoutUser } from "@/util/auth";

export default Vue.extend({
  name: "Navbar",
  props: {
    btnNewString: String,
    btnNewRoute: String,
    home: String
  },
  methods: {
    logout() {
      logoutUser();
      this.$router.push({ name: "login" });
    }
  }
});
</script>

