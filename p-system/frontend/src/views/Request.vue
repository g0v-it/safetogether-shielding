<template>
  <div class="dashboard">
    <Navbar btnNewString="New Request" btnNewRoute="request" home="callcenter"/>
     <div v-if="reqOK" class="alert alert-success" role="alert">
      Request accepted
      <button
        @click="reqOK=false"
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
          <label>Applicant</label>
          <input v-model="request.applicant" type="text" class="form-control" />
        </div>
         <div class="form-group">
          <label>Need</label>
          <textarea v-model="request.need"  class="form-control" />
        </div>
         <div class="form-group">
          <label>City</label>
          <input v-model="request.city" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>Applicant address</label>
          <input v-model="request.address" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label>date</label>
          <input v-model="request.deliveryDate" type="date" class="form-control" />
        </div>

        <div class="form-group">
          <label>information</label>
          <textarea v-model="request.deliveryInformation"  class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary mr-4">Add Request</button>
      </form>
    </div>
  </div>
</template>



<script>
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import http from "../util/http";
import config from "../config";



export default Vue.extend({
  name: "Request",
  components: {
    Navbar
  },
  data() {
    return {
      request: {
        applicant:"",
        need:"",
        city:"",
        address:"",
        deliveryDate:"",
        deliveryInformation:""
      },
      reqOK:false,
      apiEndpoint: config.apiEndpoint
    };
  },
  methods: {
    submit() {
      const today=new Date()
      const stringToday=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      console.log(stringToday)
      const reqObj={
        "applicant":this.request.applicant,
        "req_date":today,
        "description":"ADDRESS: "+this.request.city+" "+this.request.address
                                +"<br/>DATE: "+this.request.deliveryDate
                                +"<br/>INFOS: "+this.request.deliveryInformation
                                +"<br/>NEED: "+this.request.need
      }
      this.clear();
      http.post("/callcenter/request", reqObj).then(res => {
        this.reqOK = true;
      });
    },
    clear() {
      this.request.applicant = "";
      this.request.need = "";
      this.request.city = "";
      this.request.address = "";
      this.request.deliveryDate = "";
      this.request.deliveryInformation = "";
    }

  }
});

</script>

<style scoped>
.container {
  height: 100%;
}
</style>