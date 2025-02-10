<script setup>
import Header from "@/components/Template/Header.vue";
import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Catalog from "@/components/Catalog/Catalog.vue";

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5">
    <Header/>
    <Slider/>
    <Search/>
    <Catalog/>
  </div>
</template>

<style scoped>

</style>
