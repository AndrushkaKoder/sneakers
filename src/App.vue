<script setup>
import {onMounted, ref, provide, reactive} from "vue";
import axios from "axios";

import Header from "@/components/Template/Header.vue";
import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Catalog from "@/components/Catalog/Catalog.vue";
import Footer from "@/components/Template/Footer.vue";
import Cart from "@/components/Cart/Cart.vue";
import Favorite from "@/components/Favorite/Favorite.vue";
import Alert from "@/components/Alert/Alert.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL

provide('backendUrl', backendUrl)

const items = ref([]);
const favoritesItems = ref([])
const favoriteIds = ref([])
const cartItems = ref([])
const cartIds = ref([])
const cartTotal = ref(0)
const alert = reactive({
  success: false,
  message: null
})

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
  } catch (error) {
    console.error('some error ' + error)
  }
}

const getCart = async () => {
  try {
      cartIds.value = await axios.get(`${backendUrl}/cart`).then(res => res.data)
      items.value.map(product => {
        if (cartIds.value.find(cartProduct => product.id === cartProduct.id)) {
          product.inCart = true
          cartItems.value.push(product)
          cartTotal.value += product.price
        }
      })
  } catch (error) {
    console.error('error in cart =(')
  }
}

const handleSearch = (searchResult) => {
  if (searchResult && searchResult.length > 0) {
    items.value = searchResult
  } else {
    getProducts()
  }
}

const handleAddToCart = (productInCart) => {
  cartItems.value.push(productInCart)
   let price = items.value.find(item => productInCart === item.id).price
  if (price) {
    cartTotal.value += price
  }
}

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5 content_wrapper">
    <Header :cartTotal="cartTotal"/>
    <Slider/>
    <Search @searched="handleSearch"/>
    <Catalog :items="items" @cart="handleAddToCart"/>
    <Cart :items="cartItems"/>
    <Favorite :items="favoritesItems"/>
    <Footer/>
    <Alert :message="alert.message" :success="alert.success"/>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .content_wrapper {
    width: 100%;
  }
}
</style>
