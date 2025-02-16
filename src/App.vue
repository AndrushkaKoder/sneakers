<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";

import Header from "@/components/Template/Header.vue";
import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Catalog from "@/components/Catalog/Catalog.vue";
import Footer from "@/components/Template/Footer.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL

let items = ref([]);
let searchedItems = ref([]);

onMounted(async () => {
  try {
    items.value = await axios.get(`${backendUrl}/products`).then(res => res.data)
  } catch (error) {
    console.error('Backend error =(')
  }
})

watch(searchedItems, () => {

})

const onSearched = (items) => {
  console.log(items)
}

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5 content_wrapper">
    <Header/>
    <Slider/>
    <Search/>
    <Catalog :items="items"/>
    <!--    <Cart/>-->
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
