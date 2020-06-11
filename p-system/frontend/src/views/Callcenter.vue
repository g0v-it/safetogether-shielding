<template>
  <div class="callcenter">
    <Navbar />
    <div class="container">
      <div class="row m-4" v-for="request in requests" :key="request.id">
        <p class="col">{{request.id}}</p>
        <p class="col">{{request.applicant}}</p>
        <p class="col">{{formatDate(new Date(request.req_date))}}</p>
        <p class="col">{{request.description}}</p>
        <p class="col">{{request.status}}</p>
        <p class="col">{{request.volunteer}}</p>
        <p class="col">{{request.code}}</p>
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
      requests: null,
      volunteers: null
    };
  },
  components: {
    Navbar
  },
  created() {
    http.get("/callcenter/requests").then(res => (this.credentials = res.data));
    http.get("/callcenter/volunteers").then(res => (this.volunteers = res.data));
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