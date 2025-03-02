import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import {createWebHistory, createRouter} from 'vue-router'

const app = createApp(App)

import HomeView from '@/pages/Home.vue'
import Favorites from '@/pages/Favorites.vue'
import Profile from "@/pages/Profile.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/favorites', component: Favorites},
    {path: '/profile', component: Profile}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(autoAnimatePlugin).use(router)

app.mount('#app');

