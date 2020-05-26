<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-full max-w-xs">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div v-if="!isSuccess" class="mb-4">
          <p class="text-red-500 text-xs italic">Incorrect credentials</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            v-model="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            v-model="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { authenticateUser } from "../util/auth";
export default {
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
          this.$router.push({ name: "Dashboard" });
        })
        .catch(() => (this.isSuccess = false));
    }
  }
};
</script>