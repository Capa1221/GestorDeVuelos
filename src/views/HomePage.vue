<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Gestor de Vuelos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Gestor de Vuelos</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <FlightItem v-for="vuelo in vuelos" :key="vuelo.icao24" :vuelo="vuelo" />
      </ion-list>
      
      <ion-item v-if="error">
        <ion-label color="danger">{{ error }}</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FlightItem from '@/components/FlightItem.vue';

const vuelos = ref<any[]>([]);
const error = ref<string | null>(null);
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const obtenerVuelos = async (retries = 0) => {
  try {
    const respuesta = await axios.get('https://opensky-network.org/api/states/all');
    vuelos.value = respuesta.data.states.map((vuelo: any) => ({
      icao24: vuelo[0],
      callsign: vuelo[1],
      origen_pais: vuelo[2],
      ultima_posicion: {
        latitud: vuelo[6],
        longitud: vuelo[5]
      },
      altitud: vuelo[7]
    }));
    console.log('Vuelos obtenidos:', vuelos.value);
    error.value = null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 429) {
      if (retries < MAX_RETRIES) {
        console.log(`Retrying... (${retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => obtenerVuelos(retries + 1), RETRY_DELAY);
      } else {
        error.value = 'Has excedido el límite de solicitudes. Por favor, intenta nuevamente más tarde.';
      }
    } else {
      error.value = 'Error al obtener los vuelos. Por favor, intenta nuevamente.';
    }
    console.error('Error al obtener los vuelos:', err);
  }
};

onMounted(() => {
  obtenerVuelos();
});
</script>

<style scoped>
/* Tus estilos existentes */
</style>
