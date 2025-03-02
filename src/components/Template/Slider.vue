<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {register} from 'swiper/element'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const modules = [Autoplay, Navigation, Pagination]
register()

defineProps({
  items: Array
})
</script>

<template>
  <section class="slider">
    <div class="w-full px-5 m-auto mt-10 rounded-2xl">
      <swiper
          :space-between="50"
          :slides-per-view="1"
          class="rounded-2xl" :loop="false"
          :modules="modules"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :speed="1000"
      >
        <swiper-slide v-for="item in items" class="rounded-2xl">
          <div class="slide_content rounded-2xl"
               :style="{ backgroundImage: `url('${item.src}')` }">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style scoped>
.slide_content {
  min-width: 100%;
  min-height: 450px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: grab;
}
</style>