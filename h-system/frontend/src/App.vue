<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import http from "./util/http.js";
import { removeToken } from "./util/auth.js";

export default {
  created() {
    /**
     * Add interceptors, so if the request fails it redirects to login
     */
    http.interceptors.response.use(undefined, error => {
      return new Promise((resolve, reject) => {
        // console.log({...error})
        if (error?.config?.url != "login") {
          removeToken();
          this.$router.push({ name: "login" });
        }
        reject(error);
      });
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
html,
body,
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
}
</style>
