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
import OrderModal from "@/components/Order/OrderModal.vue";

const backendUrl = import.meta.env.VITE_BACKEND_URL

provide('backendUrl', backendUrl)

const productItems = ref([]);
const favoritesItems = ref([])
const favoriteIds = ref([])
const cartItems = ref([])
const cartTotal = ref(0)
const alert = reactive({
  success: false,
  message: null
})

onMounted(async () => {
  await getProducts()
  await getCart()
})

const getProducts = async () => {
  try {
    productItems.value = await axios.get(`${backendUrl}/products`).then(res => res.data)
  } catch (error) {
    console.error('some error ' + error)
  }
}

const getCart = async () => {
  try {
    cartItems.value = await axios.get(`${backendUrl}/cart`).then(response => response.data)
    cartItems.value.forEach(el => {
      cartTotal.value += el.price ?? 0
      productItems.value.find(item => {
        if (item.product_id === el.product_id) {
          item.inCart = true
        }
      })
    })

  } catch (error) {
    console.error('Some error - ' + error)
  }
}

const getFavorites = async () => {
  try {
    if (productItems) {
      favoriteIds.value = await axios.get(`${backendUrl}/favorites`).then(res => res.data)
      productItems.value.map(product => {
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

const handleSearch = (searchResult) => {
  if (searchResult && searchResult.length > 0) {
    productItems.value = searchResult
  } else {
    getProducts()
  }
}

const handleAddToCart = (product) => {
  cartItems.value.push(product)
  cartTotal.value += product.price
}

const handleDeleteFromCart = (product) => {
  cartTotal.value -= product.price
}

</script>

<template>
  <div class="w-4/5 m-auto min-h-screen bg-white rounded-2xl shadow-2xl mt-5 content_wrapper">

    <Header :cartTotal="cartTotal"/>

    <Slider/>

    <Search @searched="handleSearch"/>

    <Catalog
        :items="productItems"
        @cart="handleAddToCart"
    />

    <Cart
        :items="cartItems"
        :sum="cartTotal"
        @delItem="handleDeleteFromCart"
    />

    <Favorite :items="favoritesItems"/>

    <Footer/>

    <Alert
        :message="alert.message"
        :success="alert.success"
    />
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .content_wrapper {
    width: 100%;
  }
}
</style>
