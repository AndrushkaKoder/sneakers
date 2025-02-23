<script setup>
import {inject, ref, watchEffect} from "vue";
import CartHeader from "@/components/Cart/CartHeader.vue";
import CartItem from "@/components/Cart/CartItem.vue";
import axios from "axios";

const props = defineProps({
  items: Object,
  sum: Number | String
})

const backendUrl = inject('backendUrl');
const discount = ref(null)
const emit = defineEmits(['delItem'])
const showCart = ref(false)

const deleteItem = (product) => {
  axios.delete(`${backendUrl}/cart/${product.id}`)
  for (let i in props.items) {
    if (props.items[i].product_id === product.product_id) {
      props.items.splice(i, 1)
    }
  }
  emit('delItem', product)
}

watchEffect(() => {
  showCart.value = Number(props.sum) > 0
})
</script>

<template>
  <div v-if="showCart" class="cart bg-white hidden">
    <div class="cart_content">
      <CartHeader/>

      <div class="cart_total flex flex-col p-5 gap-5">
        <div class="promo">
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Есть промокод?
            Впиши и получи скидку</label>
          <input v-if="!discount" name="discount_promo"
                 class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                 placeholder="Место для Вашего промокода"
          >
          <input v-else disabled
                 class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                 placeholder="Промокод применен"
          >
        </div>
        <div class="flex justify-between my-5 gap-2">
          <span class="font-bold">Итого: </span>
          <div class="flex-1 border-b border-b-gray-300 border-dashed"></div>
          <span v-if="discount" class="font-bold text-xl text-red-400">{{ sum }}</span>
          <span :class="!discount ? 'font-bold text-xl' : 'line-through text-xl'">{{ sum }}</span>
          <span>₽</span>
        </div>
        <button type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Оформить заказ
        </button>
      </div>

      <div class="cart_items px-5">
        <CartItem v-for="item in items"
                  :id="item.id"
                  :product_id="item.product_id"
                  :title="item.title"
                  :image="item.image"
                  :price="item.price"
                  :deleteFromCart="deleteItem"
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

.cart {
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
  .cart {
    min-width: 100%;
    overflow-x: hidden;
    border: unset;
    border-radius: 0;
  }
}
</style>