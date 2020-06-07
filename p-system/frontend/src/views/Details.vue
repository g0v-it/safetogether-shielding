<template>
  <div class="details">
    <h1>This is a details page</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Details",
  mounted() {
    // http.get("unauth").then(res => console.log(res.data));
  }
});
</script>