<script setup>
import {ref, inject} from "vue";
import axios from "axios";
import Product from "@/components/Catalog/Product.vue";

const catalogTitle = ref('Все сникеры')
const emit = defineEmits(['cart'])
const backendUrl = inject('backendUrl');
const props = defineProps({
  items: Array,
})

const hasProducts = () => {
  return props.items.length > 0
}

const addToCart = async (product) => {
    await axios.post(`${backendUrl}/cart`, {
      ...product
    }).then(res => emit('cart', res.data))
  props.items.find(item => {
    if (item.product_id === product.product_id) {
      item.inCart = true
    }
  })
}
</script>

<template>
  <section class="catalog">
    <div class="catalog_title text-center my-10">
      <h1 class="font-bold text-2xl">{{ catalogTitle }}</h1>
    </div>

    <div class="products_list flex flex-wrap items-center justify-center gap-5 max-w-4/5 m-auto" v-if="hasProducts" v-auto-animate>
      <Product v-for="item in items"
               :product_id="item.product_id"
               :title="item.title"
               :price="item.price"
               :image="item.image"
               :liked="item.liked"
               :inCart="item.inCart"
               :addToCart="addToCart"
      />
    </div>
    <div v-else class="text-center ">
      <h2>Кроссовки пока не завезли, приходите позже =)</h2>
    </div>
  </section>
</template>

<style scoped>

</style>