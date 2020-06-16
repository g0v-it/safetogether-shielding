<template>
  <div class="callcenter">
    <Modal
      v-if="isModalVisible"
      @close="isModalVisible = false"
      :volunteers="volunteers"
      v-on:selectedVolunteer="putVolunteer"
    />

    <Navbar btnNewString="New Request" btnNewRoute="request" home="callcenter" />

    <div class="container-fluid">
      <table class="table m-4">
        <thead>
          <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col">Id</th>
            <th scope="col">Applicant</th>
            <th scope="col">Description</th>
            <th scope="col">State</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.id">
            <!-- <th scope="row">{{i}}</th> -->
            <td>{{request.id}}</td>
            <td>{{request.applicant}}</td>
            <td v-html="request.description"></td>
            <td>{{request.state}}</td>
            <td class="d-flex justify-content-end">
              <template v-if="request.state=='TO_ASSIGN'">
                <div class="col d-flex justify-content-around">
                  <button
                    class="btn btn-outline-primary"
                    @click="showModalAndUpdareId(request.id)"
                  >Assign</button>
                </div>
                <div class="col"></div>
              </template>
              <template v-if="request.state=='TO_VERIFY'">
                <p class="col">{{request.volunteer}}</p>
                <div class="col"></div>
              </template>
              <template v-if="request.state=='RUNNING'">
                <div class="col-auto">
                  {{request.volunteer}}
                  <br />
                  CODE: {{request.code.toUpperCase()}}
                </div>
                <div class="col d-flex justify-content-around">
                  <button
                    class="btn btn-outline-success"
                    @click="requestCompleted(request.id)"
                  >Complete</button>
                </div>
              </template>
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
import Modal from "@/components/Modal.vue";
import http from "../util/http";

export default Vue.extend({
  name: "Callcenter",
  data() {
    return {
      requestToAssign: "",
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
    showModalAndUpdareId(id: string) {
      this.requestToAssign = id;
      this.isModalVisible = true;
    },
    putVolunteer(value: string) {
      this.isModalVisible = false;
      http.put("/callcenter/request/" + this.requestToAssign, {
        volunteer: value
      });
      http.get("/callcenter/requests").then(res => (this.requests = res.data));
    },
    requestCompleted(value: string) {
      http.put("/callcenter/request/complete/" + value, { volunteer: value });
      http.get("/callcenter/requests").then(res => (this.requests = res.data));
    }
  }
});
</script>

<style scoped>
/* .btn {
  height: 2rem;
}
.row {
  margin-bottom: 2rem;
  margin-top: 2rem;
  margin-left: 10rem;
  margin-right: 10rem;
} */
</style>

