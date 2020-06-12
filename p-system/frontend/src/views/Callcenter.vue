<template>
  <div class="callcenter">
    <Modal v-if="isModalVisible" @close="isModalVisible = false" :volunteers="volunteers" v-on:selectedVolunteer="putVolunteer"/>

    <Navbar btnNewString="New Request" btnNewRoute="request" home="callcenter" />

    <div class="container-fluid box-margin">
      <div class="row m-12" v-for="request in requests" :key="request.id">
        <p class="col">{{request.id}}</p>
        <p class="col">{{request.applicant}}</p>
        <p class="col-4" v-html="request.description"></p>
        <p class="col">{{request.state}}</p>
        <template v-if="request.state=='TO_ASSIGN'">
          <div class="col d-flex justify-content-around">
            <button class="btn btn-outline-primary" @click="showModalAndUpdareId(request.id)">Assign</button>
          </div>
        </template>
        <template v-if="request.state=='TO_VERIFY'">
          <p class="col">{{request.volunteer}}</p>
        </template>
        <template v-if="request.state=='RUNNING'">
          <div class="col">{{request.volunteer}}<br>CODE: {{request.code}}</div>
          <div class="col d-flex justify-content-around">
            <button class="btn btn-outline-success" @click="requestCompleted(request.id)">Complete</button>
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
      requestToAssign:"",
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
    http.get("/callcenter/volunteers").then(res => (this.volunteers = res.data));
  },
  methods: {
    formatDate(date: Date) {
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
    showModalAndUpdareId(id: string){
      this.requestToAssign=id;
      this.isModalVisible=true;
    },
    putVolunteer(value: string){
      this.isModalVisible=false;
      http.put("/callcenter/request/"+this.requestToAssign,{"volunteer": value});
      http.get("/callcenter/requests").then(res => (this.requests = res.data));
    },
    requestCompleted(value: string){
      http.put("/callcenter/request/complete/"+value,{"volunteer": value});
      http.get("/callcenter/requests").then(res => (this.requests = res.data));
    }

  }
});
</script>

<style scoped>
.btn{
  height: 2rem;
}
.row{
  margin-bottom: 2rem;
  margin-top: 2rem;
  margin-left: 10rem;
  margin-right: 10rem;
}
</style>

