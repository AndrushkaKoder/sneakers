<script setup>
import {inject, ref} from "vue";
import axios from "axios";

const emit = defineEmits(['promo'])
const promo = ref([])
const backendUrl = inject('backendUrl');

const sendPromo = async (event) => {
  let value = event.target.value
  if (value.length >= 3) {
    promo.value = await axios.get(`${backendUrl}/promocodes`).then(res => res.data)
    promo.value.find(item => {
      if (item.value === value) {
        emit('promo', item)
      }
    })
  } else {
    emit('promo', 0)
  }
}
</script>

<template>
  <div class="promo">
    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Есть промокод?
      Впиши и получи скидку</label>
    <input v-if="true" name="discount_promo" @input="sendPromo"
           class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
           placeholder="Место для Вашего промокода"
    >
    <input v-else disabled
           class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
           placeholder="Промокод применен"
    >
  </div>
</template>

<style scoped>
input {
  cursor: pointer;
}
</style>