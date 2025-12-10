<script setup>
import { ref } from "vue"
import Navbar from "./components/Navbar.vue"
</script>

<template>
   <div id="app">
   <Navbar v-if="showNavbar" />
   <router-view />
</div>
</template>

<style scoped>
body {
   padding-top: 80px;
}
</style>
