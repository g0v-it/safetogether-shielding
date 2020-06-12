<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Select a volunteer</h3>
          </div>

          <div class="modal-body">
            <p class="error">{{error}}</p>
            <div class="ratio-block" v-for="volunteer in volunteers" :key="volunteer.mail">
              <input
                type="radio"
                :id="volunteer.mail"
                :value="volunteer.mail"
                v-model="selectedVolunteer"
              />
              <label class="label" :for="volunteer.mail">{{volunteer.name}} {{volunteer.surname}}</label>
              <p class="under">{{volunteer.mail}}</p>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-primary" @click="pushVolunteer()">Select</button>
            <button class="btn btn-outline-danger" @click="$emit('close')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Modal",
  props: {
    volunteers: Array
  },
  data() {
    return {
      error: "",
      selectedVolunteer: ""
    }
  },
  methods: {
    pushVolunteer() {
      if (this.selectedVolunteer == "")
        this.error = "Please select a volunteer";
      else {
        this.$emit('selectedVolunteer', this.selectedVolunteer)
      }
    }
  }
});
</script>


<style lang="css" scoped>
.error {
  color: red;
  font-size: 1rem;
}
.radio-block {
  margin-bottom: 2em;
}
.under {
  font-style: italic;
  text-decoration: underline;
  font-size: 1em;
  margin-left: 1.5em;
}
.label {
  margin-left: 1em;
  font-size: 1.5em;
  margin-bottom: 0px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  font-size: 2em;
}

.modal-body {
  margin: 20px 0;
}

/*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
