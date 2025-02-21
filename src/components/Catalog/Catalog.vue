<script setup>
import {ref, inject} from "vue";
import axios from "axios";
import Product from "@/components/Catalog/Product.vue";


const emit = defineEmits(['searched', 'cart']);
const backendUrl = inject('backendUrl');
const props = defineProps({
  items: Array,
})

const catalogTitle = ref('Все сникеры')

const hasProducts = () => {
  return props.items.length > 0
}

const addToCart = (productId) => {
  if (productId) {
    axios.post(`${backendUrl}/cart`, {
      id: productId
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        emit('cart', productId)
        props.items.find(item => {
          if (item.id === productId) {
            item.inCart = true
          }
        })
      }
    })
  }
}

const addToFavorite = () => {
  alert('IN FAVORITE!')
}

</script>

<template>
  <section class="catalog">
    <div class="catalog_title text-center my-10">
      <h1 class="font-bold text-2xl">{{ catalogTitle }}</h1>
    </div>

    <div class="products_list flex flex-wrap items-center justify-center gap-5 max-w-4/5 m-auto" v-if="hasProducts()">
      <Product v-for="item in items"
               :id="item.id"
               :title="item.title"
               :price="item.price"
               :image="item.image"
               :liked="item.liked"
               :inCart="item.inCart"
               :addToCart="addToCart"
               :addToFavorite="addToFavorite"
      />
    </div>
    <div v-else class="text-center ">
      <h2>Кроссовки пока не завезли, приходите позже =)</h2>
    </div>
  </section>
</template>

<style scoped>

</style>