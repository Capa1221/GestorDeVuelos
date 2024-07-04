import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FlightDetails from '../views/FlightDetailPage.vue';
import FlightMap from '../views/FlightMapPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/vuelo/:icao24',
    name: 'FlightDetails',
    component: FlightDetails
  },
  {
    path: '/vuelo/:icao24/map',
    name: 'FlightMap',
    component: FlightMap
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
