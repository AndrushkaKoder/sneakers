<script setup>
import CartItem from "@/components/Cart/CartItem.vue";
import FavoriteHeader from "@/components/Favorite/FavoriteHeader.vue";

defineProps({
  items: Object
})
</script>

<template>
  <div class="favorite bg-white hidden">
    <div class="cart_content">
      <FavoriteHeader/>
      <div class="cart_items px-5">
        <CartItem v-for="item in items"
                  :title="item.title"
                  :image="item.image"
                  :price="item.price"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
body {
  overflow: hidden;
  height: 50vh;
}

.favorite {
  min-width: 450px;
  position: fixed;
  margin: 0;
  top: 0;
  right: 0;
  height: 100vh;
  background: white;
  z-index: 999;
  border: 1px solid lightgrey;
  border-radius: 10px;
  overflow: auto;
}

@media screen and (max-width: 768px) {
  .favorite {
    min-width: 100%;
    overflow-x: hidden;
    border: unset;
    border-radius: 0;
  }
}
</style>
