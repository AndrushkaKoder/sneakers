<script setup>
import Product from "@/components/Catalog/Product.vue";
import {reactive, ref} from "vue";

const data = reactive([
  {
    title: 'Nike Blazer',
    price: 11799.00,
    image: '/public/sneakers/sneakers-1.jpg',
    inCart: true,
    liked: true
  },
  {
    title: 'Nike Runner',
    price: 9999.00,
    image: '/public/sneakers/sneakers-2.jpg',
    inCart: true,
    liked: false
  },
  {
    title: 'Nike Blazer white 1985 limited edition',
    price: 7990.00,
    image: '/public/sneakers/sneakers-3.jpg',
    inCart: false,
    liked: false
  },
  {
    title: 'Puma',
    price: 24500.00,
    image: '/public/sneakers/sneakers-4.jpg',
    inCart: false,
    liked: true
  },
  {
    title: 'Reebok black',
    price: 13990.00,
    image: '/public/sneakers/sneakers-11.jpg',
    inCart: false,
    liked: true
  },
  {
    title: 'Puma 2',
    price: 8900.00,
    image: '/public/sneakers/sneakers-12.jpg',
    inCart: false,
    liked: false
  },
])

const catalogTitle = ref('Все сникеры')

const hasProducts = () => {
  return data.length > 0
}

</script>

<template>
  <section class="catalog">
    <div class="catalog_title text-center my-10">
      <h1 class="font-bold text-2xl">{{ catalogTitle }}</h1>
    </div>

    <div class="products_list flex flex-wrap items-center justify-center gap-5 max-w-4/5 m-auto" v-if="hasProducts">
      <Product v-for="item in data" :product="item"/>
    </div>
    <div v-else class="text-center ">
      <h2>Кроссовки пока не завезли, приходите позже =)</h2>
    </div>
  </section>
</template>

<style scoped>

</style>