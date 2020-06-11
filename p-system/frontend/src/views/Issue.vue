<template>
  <div class="dashboard">
    <Navbar btnNewString="New Credential" btnNewRoute="issue" home="dashboard"/>
    <div v-if="reqOK" class="alert alert-success" role="alert">
      Request accepted, visit
      <a
        :href="formatURL()"
        target="_blank"
        rel="noopener noreferrer"
        class="alert-link"
      >{{formatURL()}}</a>
      to scan the QRcode.
      <button
        @click="clear"
        type="button"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="container py-5">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Name</label>
          <input v-model="certificate.name" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Surname</label>
          <input v-model="certificate.surname" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="certificate.email" type="email" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Birthdate</label>
          <input v-model="certificate.birthdate" type="date" class="form-control" />
        </div>

        <div class="form-group">
          <label>Birthplace</label>
          <input v-model="certificate.birthplace" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Department</label>
          <input v-model="certificate.department" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Location</label>
          <input v-model="certificate.location" type="text" class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary mr-4">Issue</button>
      </form>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import http from "../util/http";
import config from "../config";

export default Vue.extend({
  name: "Issue",
  components: {
    Navbar
  },
  props: {
    name: String,
    surname: String,
    birthdate: String,
    birthplace: String,
    location: String,
    department: String
  },
  data() {
    return {
      certificate: {
        name: this.name || "",
        surname: this.surname || "",
        birthdate: this.birthdate || "",
        birthplace: this.birthplace || "",
        department: this.department || "",
        location: this.location || "",
        email: ""
      },
      reqOK: false,
      requestUID: "",
      apiEndpoint: config.apiEndpoint
    };
  },
  methods: {
    submit() {
      http.post("/issue", { ...this.certificate }).then(res => {
        this.requestUID = res.data;
        this.reqOK = true;
      });
    },
    formatURL() {
      return `${this.apiEndpoint}/widget/${this.requestUID}`;
    },
    clear() {
      this.reqOK = false;
      this.certificate.name = "";
      this.certificate.surname = "";
      this.certificate.birthdate = "";
      this.certificate.birthplace = "";
      this.certificate.department = "";
      this.certificate.location = "";
      this.certificate.email = "";
    }
  }
});
</script>

<style scoped>
.container {
  height: 100%;
}
</style>