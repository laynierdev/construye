import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ClientApp from '../views/ClientApp.vue'
import VendorPage from '../views/VendorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/client', component: ClientApp },
    { path: '/vendedor', component: VendorPage },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
