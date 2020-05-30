<template>
  <nav class="flex items-center justify-between bg-blue-500 p-4 px-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">H-System</span>
    </div>
    <div class="w-full block flex-grow flex items-center ml-auto lg:w-auto">
      <div class="ml-auto">
        <button
          @click="logout"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white"
        >Logout</button>
      </div>
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