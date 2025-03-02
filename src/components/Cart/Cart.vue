<script setup>
import {inject, ref, watchEffect} from "vue";
import axios from "axios";

import CartHeader from "@/components/Cart/CartHeader.vue";
import CartItem from "@/components/Cart/CartItem.vue";
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
const modal = ref(null)
const totalSum = ref(props.sum)

const deleteItem = (product) => {
  axios.delete(`${backendUrl}/cart/${product.id}`)
  for (let i in props.items) {
    if (props.items[i].product_id === product.product_id) {
      props.items.splice(i, 1)
    }
  }
  emit('delItem', product)
}

const clearCart = async () => {
   await axios.get(`${backendUrl}/cart`).then((res) => {
    res.data.forEach(item => {
      deleteItem(item)
    })
  })
}

const handleSumWithPromo = (promocode) => {
  if (promocode) {
    totalSum.value = discount.value = props.sum * (1 - Number(promocode.percent) / 100)
  }
  return totalSum.value
}

const openOrderModal = () => {
  modal.value.classList.toggle('hidden')
}

const handlerCreateOrder = (data) => {
  if (data.success === true) {
    clearCart()
    modal.value.classList.add('hidden')
  }
}

watchEffect(() => {
  showCart.value = Number(props.sum) > 0
  totalSum.value = props.sum
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
        <button @click="openOrderModal" data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Оформить заказ
        </button>
      </div>

      <div class="cart_items px-5" v-auto-animate>
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

  <div id="crud-modal" ref="modal" tabindex="-1" aria-hidden="true"
       class="hidden modal_order overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="m-auto relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Новый заказ на сумму {{ totalSum }} ₽
          </h3>
          <button @click="openOrderModal" type="button"
                  class="close_modal_order text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <OrderModal :items="items" :total="totalSum" @orderCreated="handlerCreateOrder"/>
      </div>
    </div>
  </div>

</template>

<style>

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

.modal_order {
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
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