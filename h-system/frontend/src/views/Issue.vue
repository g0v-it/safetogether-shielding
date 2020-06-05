<template>
  <div class="dashboard">
    <Navbar />
    <div class="container py-5">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="exampleInputEmail1">Dizme username</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Dizme email</label>
          <input v-model="email" type="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input v-model="name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Surname</label>
          <input v-model="surname" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Birthdate</label>
          <input v-model="birthdate" type="date" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Birthplace</label>
          <input v-model="birthplace" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Covid status</label>
          <input v-model="status" type="text" class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary">Issue</button>
      </form>
    </div>
  </div>
  <!-- { name,
        surname,
        birthdate,
        birthplace,
        timestamp,
        status,
        username,
  email }-->
</template>



<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import http from "../util/http";

export default Vue.extend({
  name: "Login",
  components: {
    Navbar
  },
  data() {
    return {
      name: "",
      surname: "",
      birthdate: "",
      birthplace: "",
      timestamp: Date.now(),
      status: "",
      username: "",
      email: ""
    };
  },
  methods: {
    submit() {
      const {
        name,
        surname,
        birthdate,
        birthplace,
        timestamp,
        status,
        username,
        email
      } = this;
      console.log("issue", {
        name,
        surname,
        birthdate,
        birthplace,
        timestamp,
        status,
        username,
        email
      });
      http
        .post("/issue", {
          name,
          surname,
          birthdate,
          birthplace,
          timestamp,
          status,
          username,
          email
        })
        .then(res => {
          console.log(res.data);
        });
    }
  }
});
</script>

<style scoped>
.container {
  height: 100%;
}
</style>