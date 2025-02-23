<script setup>
import {inject, ref, watchEffect} from "vue";
import axios from "axios";

const props = defineProps({
  items: Array | Object,
  total: Number | String,
  showModal: Boolean
})

const backendUrl = inject('backendUrl');
const modal = ref('modal')
const userName = ref('')
const userAddress = ref('')
const userPhone = ref('')
const userDelivery = ref('')
const userComment = ref('')

const createOrder = async () => {
    try {
      await axios.post(`${backendUrl}/orders`, {
        sum: props.sum,
        name: userName,
        address: userAddress,
        phone: userPhone,
        delivery: userDelivery,
        comment: userComment,
        date: new Date(),
        items: props.items
      })
    } catch (error) {
      console.log(error)
    }
}


const showOrderModal = (show = false) => {
  if (show) {
    modal.value.classList.add('hidden')
  } else {
    modal.value.classList.remove('hidden')
  }

}

</script>

<template>
  <div v-if="showModal" id="crud-modal" ref="modal" tabindex="-1" aria-hidden="true" class="modal_order overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="m-auto relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Новый заказ
          </h3>
          <button type="button" @click="showOrderModal" class="close_modal_order text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">

            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя получателя</label>
              <input
                  v-model="userName"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
              >
            </div>

            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
              <input
                  v-model="userAddress"
                  type="text"
                  name="address"
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
              >
            </div>

            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон</label>
              <input
                  v-model="userPhone"
                  type="text"
                  name="phone"
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
              >
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Получение</label>
              <select v-model="userDelivery" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option selected="">Не выбрано</option>
                <option value="self">Самовывоз</option>
                <option value="delivery">Доставка</option>
              </select>
            </div>

            <div class="col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Комментарий к заказу</label>
              <textarea v-model="userComment" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ваши пожелания"></textarea>
            </div>
          </div>

          <button type="button" @click="createOrder" class="text-white m-auto inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_order {
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
</style>