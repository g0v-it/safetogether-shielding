<template>
  <div class="details">
    <h1>This is a details page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import http from "../util/http.js";
export default {
  name: "Details",
  mounted() {
    http.get("unauth").then(res => console.log(res.data));
  }
};
</script>