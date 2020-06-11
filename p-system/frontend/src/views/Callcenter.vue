<template>
  <div class="callcenter">
    <Modal v-show="isModalVisible" @close="closeModal" />
    <Navbar btnNewString="New Request" btnNewRoute="request" home="callcenter" />
    <div class="container">
      <div class="row m-8" v-for="request in requests" :key="request.id">
        <p class="col">{{request.id}}</p>
        <p class="col">{{request.applicant}}</p>
        <p class="col">{{formatDate(new Date(request.req_date))}}</p>
        <p class="col-3" v-html="request.description"></p>
        <p class="col">{{request.state}}</p>
        <template v-if="request.state=='TO_ASSIGN'">
          <div class="col d-flex justify-content-around">
            <button class="btn btn-outline-primary" @click="showModal">Assign</button>
          </div>
        </template>
        <template v-if="request.state=='TO_VERIFY'">
          <p class="col">{{request.volunteer}}</p>
        </template>
        <template v-if="request.state=='RUNNING'">
          <p class="col">{{request.volunteer}}</p>
          <p class="col">{{request.code}}</p>
          <div class="col d-flex justify-content-around">
            <button class="btn btn-outline-success">Complete</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Modal from "@/components/Modal.vue";
import http from "../util/http";

export default Vue.extend({
  name: "Dashboard",
  data() {
    return {
      isModalVisible: false,
      requests: null,
      volunteers: null
    };
  },
  components: {
    Navbar,
    Modal
  },
  created() {
    http.get("/callcenter/requests").then(res => (this.requests = res.data));
    http
      .get("/callcenter/volunteers")
      .then(res => (this.volunteers = res.data));
  },
  methods: {
    formatDate(date: Date) {
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
});
</script>

<style scoped>
/* .row{
  margin: 2rem;
} */
</style>

