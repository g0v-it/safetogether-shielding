<template>
  <div class="login d-flex flex-column">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand">Civil protection</span>
    </nav>

    <div class="container flex-grow-1 d-flex align-items-center justify-content-center">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <div v-if="!isSuccess" class="form-group">
          <small class="form-text text-danger">Incorrect credentials</small>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { authenticateUser } from "@/util/auth";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isSuccess: true
    };
  },
  methods: {
    login() {
      // console.log({ u: this.username, p: this.password });
      const { username, password } = this;
      authenticateUser({ username, password })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => (this.isSuccess = false));
    }
  }
});
</script>

<style scoped>
.login {
  height: 100%;
}

/* .container   {
  height: 100%;
} */
</style>