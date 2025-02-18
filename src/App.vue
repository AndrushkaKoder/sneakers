<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import Header from "@/components/Template/Header.vue";
import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Catalog from "@/components/Catalog/Catalog.vue";
import Footer from "@/components/Template/Footer.vue";
import Cart from "@/components/Cart/Cart.vue";
import Favorite from "@/components/Favorite/Favorite.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL
const items = ref([]);
const favoritesItems = ref([])
const favoriteIds = ref([])
const cartItems = ref([])
const cartIds = ref([])

onMounted(() => {
  getProducts()
  getFavorites()
  getCart()
})

const getProducts = async () => {
  try {
    items.value = await axios.get(`${backendUrl}/products`).then(res => res.data)
  } catch (error) {
    console.error('some error ' + error)
  }
}

const getFavorites = async () => {
  try {
    if (items) {
      favoriteIds.value = await axios.get(`${backendUrl}/favorites`).then(res => res.data)
      items.value.map(product => {
        if (favoriteIds.value.find(favoriteProduct => product.id === favoriteProduct.id)) {
          product.liked = true
          favoritesItems.value.push(product)
        }
      })
    }
    console.log(favoritesItems.value)
  } catch (error) {
    console.error('some error ' + error)
  }
}

const handleSearch = (searchResult) => {
  if (searchResult && searchResult.length > 0) {
    items.value = searchResult
  } else {
    getProducts()
  }
}

const getCart = () => {
  console.log('cart')
}

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5 content_wrapper">
    <Header/>
    <Slider/>
    <Search @searched="handleSearch"/>
    <Catalog :items="items"/>
    <Cart :items="cartItems"/>
    <Favorite :items="favoritesItems"/>
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
