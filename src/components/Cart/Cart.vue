<script setup>
import {inject, ref, watchEffect} from "vue";
import CartHeader from "@/components/Cart/CartHeader.vue";
import CartItem from "@/components/Cart/CartItem.vue";
import axios from "axios";
import Promocode from "@/components/Cart/Promocode.vue";
import OrderModal from "@/components/Order/OrderModal.vue";

const props = defineProps({
  items: Object,
  sum: Number | String
})

const backendUrl = inject('backendUrl');
const discount = ref(0)
const emit = defineEmits(['delItem', 'promo'])
const showCart = ref(false)
const openModal = ref(false)

const deleteItem = (product) => {
  axios.delete(`${backendUrl}/cart/${product.id}`)
  for (let i in props.items) {
    if (props.items[i].product_id === product.product_id) {
      props.items.splice(i, 1)
    }
  }
  emit('delItem', product)
}

const handleSumWithPromo = (promocode) => {
  return  discount.value = props.sum * (1 - Number(promocode.percent) / 100)
}

const openModalHandler = () => {
  openModal.value = true
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
        <Promocode @promo="handleSumWithPromo"/>
        <div class="flex justify-between my-5 gap-2">
          <span class="font-bold">Итого: </span>
          <div class="flex-1 border-b border-b-gray-300 border-dashed"></div>
          <span v-if="discount" class="font-bold text-xl text-red-400">{{ discount }}</span>
          <span :class="!discount ? 'font-bold text-xl' : 'line-through text-xl'">{{ sum }}</span>
          <span>₽</span>
        </div>
        <div>
          <div v-if="discount"
               class="alert mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
               role="alert" tabindex="-1" aria-labelledby="hs-soft-color-success-label">
            <span id="hs-soft-color-success-label" class="font-bold">Поздравляем!</span> промокод применен!
          </div>
        </div>
        <button @click="openModalHandler" data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button"
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

  <OrderModal :items="items" :total="handleSumWithPromo" :showModal="openModal"/>
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
  z-index: 100;
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