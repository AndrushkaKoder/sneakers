<script setup>
const props = defineProps({
  id: Number | String,
  product_id: Number | String,
  title: String,
  image: String,
  price: String | Number,
  inCart: Boolean,
  deleteFromCart: Function
})
</script>

<template>
  <div class="cart_item flex items-center justify-between border-b border-gray-200 p-3">
    <img :src="image" :alt="title" class="w-25">
    <div class="flex flex-col text-justify items-center max-w-50">
      <span class="font-bold text-sm my-3">{{ title }}</span>
      <span class="text-gray-500 text-xs">{{ price }}</span>
    </div>
    <div>
      <img @click.prevent="deleteFromCart(props)" src="/public/close.svg" alt="close button">
    </div>
  </div>
</template>

<style scoped>

</style>