<script setup>
defineProps({
  message: String,
  success: Boolean
})

const showAlert = () => {
  return true
}

</script>

<template>
<!--    <div v-if="success" class="alert mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-success-label">-->
<!--      <span id="hs-soft-color-success-label" class="font-bold">{{ success ? 'Успешно' : 'Ошибка' }}</span> {{ message }}-->
<!--    </div>-->
<!--    <div v-else class="alert mt-2 bg-red-400 border border-b-red-400-400-200 text-sm text-red-600 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabindex="-1" aria-labelledby="hs-soft-color-success-label">-->
<!--      <span id="hs-soft-color-success-label" class="font-bold">{{ success ? 'Успешно' : 'Ошибка' }}</span> {{ message }}-->
<!--    </div>-->
</template>

<style scoped>
.alert {
  position: sticky;
  width: 450px;
  bottom: 200px;
  z-index: 999;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .alert {
    width: 350px;
    bottom: 100px;
  }
}

</style>