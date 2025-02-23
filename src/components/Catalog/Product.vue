<script setup>
const props = defineProps({
  product_id: Number | String,
  title: String,
  price: String | Number,
  image: String,
  liked: Boolean,
  inCart: Boolean,
  addToCart: Function,
  addToFavorite: Function
})
</script>

<template>
  <div class="product rounded-2xl shadow-md relative flex flex-col items-center justify-center">
    <img @click="addToFavorite" :src="liked ? '/public/like-2.svg' : '/public/like-1.svg'" alt="like"
         class="absolute top-2 left-2 cursor-pointer">
    <img :src="image" :alt="title" class="product_img">
    <p class="my-2 text-center">{{ title }}</p>

    <div class="w-50 flex items-center justify-between">
      <div class="flex flex-col">
        <span class="font-bold">Цена: </span>
        <span>{{ price }} ₽</span>
      </div>
      <div>
        <img @click="addToCart(props)"
             :src="!inCart ? '/public/plus.svg' : '/public/checked.svg'" alt="cart">
      </div>
    </div>
  </div>
</template>

<style scoped>
.product {
  width: 260px;
  height: 240px;
  border: 1px solid lightgrey;
  cursor: pointer;
}

.product:hover {
  transition: all 200ms ease;
  transform: translateY(-3px);
  box-shadow: 4px 8px 6px 6px rgba(34, 60, 80, 0.2);
}

.product_img {
  max-width: 133px;
  max-height: 120px;
}

</style>