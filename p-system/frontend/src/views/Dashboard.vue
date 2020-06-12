<template>
  <div class="dashboard">
    <Navbar btnNewString="New Credential" btnNewRoute="issue" home="dashboard" />
    <div class="container">
      <table class="table m-4">
        <thead>
          <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Issued</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cred) in credentials" :key="cred.name+cred.surname">
            <!-- <th scope="row">{{i}}</th> -->
            <td >{{cred.name}}</td>
            <td >{{cred.surname}}</td>
            <td>{{formatDate(new Date(cred.timestamp))}}</td>
            <td class="d-flex justify-content-end">
              <button
                @click="$router.push({name:'issue', query:{...cred}})"
                class="btn btn-outline-primary mr-3"
              >Duplicate</button>
              <button @click="$router.push({name:'revoke'})" class="btn btn-outline-danger">Revoke</button>
            </td>
          </tr>
        </tbody>
      </table>

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