<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mapa del Vuelo</ion-title>
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
        <FlightMap v-if="flight.ultima_posicion" :center="[flight.ultima_posicion.latitud, flight.ultima_posicion.longitud]" :callsign="flight.callsign" />
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
import FlightMap from '@/components/FlightMap.vue';
import { fetchFlightDetails, FlightData } from '@/services/flightService';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const flight = ref<FlightData | null>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    flight.value = await fetchFlightDetails(route.params.icao24 as string);
    console.log('Datos del vuelo:', flight.value);

    if (!flight.value) {
      error.value = 'No se encontraron detalles para este vuelo.';
    }
  } catch (err) {
    console.error('Error fetching flight details:', err);
    error.value = 'Ocurrió un error al obtener los detalles del vuelo.';
  }
});

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
</script>
