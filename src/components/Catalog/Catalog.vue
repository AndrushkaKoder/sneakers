<script setup>
import Product from "@/components/Catalog/Product.vue";
import {reactive, ref} from "vue";

const props = defineProps({
  items: Array
})

const catalogTitle = ref('Все сникеры')

const hasProducts = () => {
  return props.items.length > 0
}

const addToCart = () => {
  alert('In CART!')
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