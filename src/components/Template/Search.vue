<script setup>
import {onMounted, provide, ref, watch} from "vue";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL
const selectData = ref([])
let query = ref('')
let sortByName = ref('')

onMounted(async () => {
  try {
    selectData.value = await axios.get(`${backendUrl}/select`).then(res => res.data)
  } catch (error) {
    console.error('Sort select not found =(')
  }
})

function searchByName(event) {
  query.value = event.target.value

}

function sort(event) {
  sortByName.value = event.target.value
}

watch(query, async () => {
  if (query.value.length >= 4) {
    const data = await axios.get(`${backendUrl}/products?title=*${query.value}*`).then(res => res.data)
    this.$emit('searched', data)
  }
})

watch(sortByName, () => {
  console.log(sortByName.value)
})



</script>

<template>
  <section class="search">
    <form class="max-w-xl mx-auto">
      <div class="flex justify-center items-center gap-6 search_wrapper">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="w-full max-w-md min-w-[200px]">
          <input @input="searchByName"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Найди свои кроссовочки"
              name="title"
          >
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">
            <select @change="sort"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="0" selected>Не выбрано</option>
              <option v-for="item in selectData" :value="item.title">{{ item.title }}</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .search_wrapper {
    flex-direction: column;
    padding: 12px;
  }
}
</style>