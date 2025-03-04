<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL
const emit = defineEmits(['searched']);
const selectData = ref([])

onMounted(async () => {
  try {
    selectData.value = await axios.get(`${backendUrl}/select`).then(res => res.data)
  } catch (error) {
    console.error('Sort select not found =( ' + error)
  }
})

const onSearch = async (event) => {
  try {
    if ((event.target.value !== null) && (event.target.value.length >= 4)) {
      emit('searched', await axios.get(`${backendUrl}/products?title=*${event.target.value}*`).then(res => res.data))
      event.target.classList.add('success')
    } else {
      event.target.classList.remove('success')
      emit('searched', null)
    }
  } catch (error) {
    event.target.classList.remove('error')
    console.error('Some server errors =( ' + error)
  }
}

</script>

<template>
  <section class="search">
    <form class="max-w-xl mx-auto">
      <div class="flex justify-center items-center gap-6 search_wrapper">
        <label for="default-search"
               class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="w-full max-w-md min-w-[200px]">

          <input @input="onSearch"
                 class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                 placeholder="Найди свои кроссовочки"
                 name="title"
          >
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">

            <select @change="onSearch"
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="null" selected>Все</option>
              <option v-for="item in selectData" :value="item.title">{{ item.title }}</option>
            </select>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2"
                 stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
            </svg>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.success {
  border: 2px solid lightgreen;
}
.error {
  border: 2px solid lightcoral;
}
@media screen and (max-width: 768px) {
  .search_wrapper {
    flex-direction: column;
    padding: 12px;
  }
}
</style>