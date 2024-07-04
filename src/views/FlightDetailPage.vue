<!-- FlightDetailPage.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Detalles del Vuelo</ion-title>
        <ion-buttons slot="start">
          <BackButton />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="flight">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ flight.callsign }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>ICAO24: {{ flight.icao24 }}</p>
            <p>País de origen: {{ flight.origen_pais }}</p>
            <p>Altitud: {{ flight.altitud }} metros</p>
            <p>Velocidad: {{ flight.velocidad }} km/h</p>
            <p>Dirección: {{ flight.direccion }}°</p>
            <p>Latitud: {{ flight.ultima_posicion ? flight.ultima_posicion.latitud : 'N/A' }}</p>
            <p>Longitud: {{ flight.ultima_posicion ? flight.ultima_posicion.longitud : 'N/A' }}</p>
            <ion-button @click="verMapa">Ver Mapa</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchFlightDetails, FlightData } from '@/services/flightService';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const flight = ref<FlightData | null>(null);
const error = ref<string | null>(null);

const obtenerDetallesVuelo = async () => {
  try {
    console.log('Fetching flight details for ICAO24:', route.params.icao24);
    flight.value = await fetchFlightDetails(route.params.icao24 as string);
    console.log('Flight data:', flight.value);

    if (!flight.value) {
      error.value = 'No se encontraron detalles para este vuelo.';
    }
  } catch (err) {
    console.error('Error al obtener los detalles del vuelo:', err);
    error.value = 'Ocurrió un error al obtener los detalles del vuelo.';
  }
};

const verMapa = () => {
  if (flight.value) {
    router.push({
      name: 'FlightMap',
      params: { icao24: flight.value.icao24 },
      query: {
        lat: flight.value.ultima_posicion?.latitud,
        lng: flight.value.ultima_posicion?.longitud
      }
    });
  }
};

onMounted(() => {
  obtenerDetallesVuelo();
});
</script>

<style scoped>
/* Estilos opcionales según necesidades específicas */
</style>
