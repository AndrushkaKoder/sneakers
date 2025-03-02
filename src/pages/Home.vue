<script setup>

import axios from "axios";
import {inject, onMounted, ref} from "vue";

import Slider from "@/components/Template/Slider.vue";
import Search from "@/components/Template/Search.vue";
import Cart from "@/components/Cart/Cart.vue";
import Favorite from "@/components/Favorite/Favorite.vue";
import Catalog from "@/components/Catalog/Catalog.vue";

const backendUrl = inject('backendUrl')
const productItems = ref([]);
const favoritesItems = ref([])
const favoriteIds = ref([])
const cartItems = ref([])
const cartTotal = ref(0)
const sliderItems = ref([])

onMounted(async () => {
  await getProducts()
  await getCart()
  await getSlider()
})

const getSlider = async () => {
  sliderItems.value = await axios.get(`${backendUrl}/slider`).then(res => res.data)
}

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
  <Slider :items="sliderItems"/>
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
</template>

<style scoped>

</style>