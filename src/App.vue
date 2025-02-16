<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import Header from "@/components/Template/Header.vue";
import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Catalog from "@/components/Catalog/Catalog.vue";

const backendUrl = 'https://c68fa968b688ddc2.mokky.dev'
let items = ref([]);

onMounted(async () => {
  try {
    items.value = await axios.get(`${backendUrl}/products`).then(res => res.data)
  } catch (error) {
    console.error('Backend error =( Check request')
  }
})
</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5">
    <Header/>
    <Slider/>
    <Search/>
    <Catalog :items="items"/>
    <!--    <Cart/>-->
  </div>
</template>

<style scoped>

</style>
