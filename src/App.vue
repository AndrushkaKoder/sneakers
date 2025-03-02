<script setup>
import {provide, ref} from "vue";

import Header from "@/components/Template/Header.vue";
import Footer from "@/components/Template/Footer.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL

provide('backendUrl', backendUrl)

const cartTotal = ref(0)

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5 content_wrapper">
    <Header :cartTotal="cartTotal"/>
    <main class="min-h-screen">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .content_wrapper {
    width: 100%;
  }
}
</style>
