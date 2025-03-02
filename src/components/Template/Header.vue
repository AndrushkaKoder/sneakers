<script setup>

defineProps({
  cartTotal: Number | String
})

const showCart = () => {
  const cart = document.querySelector('.cart')
  cart.classList.toggle('hidden')
}

const showFavorite = () => {
  const favorite = document.querySelector('.favorite')
  favorite.classList.toggle('hidden')
}

</script>

<template>
  <header class="header flex justify-between items-center p-6">
    <div class="logo flex gap-3 items-center justify-center">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="logo_image">
          <img src="/logo.png" alt="logo" class="max-w-[60px]">
        </div>
        <div class="logo_text">
          <h2 class="font-bold text-2xl">Sneakers box</h2>
        </div>
      </RouterLink>
    </div>
    <nav class="navigation">
      <ul class="flex justify-center items-center gap-3 nav_list">
        <li class="nav_item">
          <a v-if="cartTotal" href="#" class="flex justify-center items-center gap-2 cart_open" @click="showCart">
            <img src="/cart.svg" alt="cart">
            <span>{{ cartTotal }} P</span>
          </a>
        </li>
        <li class="nav_item">
          <RouterLink to="favorites" class="flex items-center gap-3">
            <img src="/heart.svg" alt="likes">
            <span>Закладки</span>
          </RouterLink>

        </li>
        <li class="nav_item">
          <RouterLink to="/profile" class="flex items-center gap-3">
            <img src="/profile.svg" alt="profile">
            <span>Профиль</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <hr class="text-gray-300 mt-3">
</template>

<style scoped>

</style>