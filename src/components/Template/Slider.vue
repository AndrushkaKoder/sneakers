<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {register} from 'swiper/element'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {reactive} from "vue";

register()

const modules = [Autoplay, Navigation, Pagination]

const data = reactive([
  {
    image: '1.jpg'
  },
  {
    image: '3.jpg'
  },
  {
    image: '4.jpg'
  },
  {
    image: '5.webp'
  },
])
</script>

<template>
  <section class="slider">
    <div class="w-full px-5 m-auto mt-10 rounded-2xl">
      <swiper
          :space-between="50"
          :slides-per-view="1"
          class="rounded-2xl" :loop="true"
          :modules="modules"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :speed="1000"
      >
        <swiper-slide v-for="slide in data" class="rounded-2xl">
          <div class="slide_content rounded-2xl"
               :style="{ backgroundImage: `url('/public/slider/${slide.image}')` }">
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