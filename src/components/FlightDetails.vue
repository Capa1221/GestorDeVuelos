<template>
  <ion-card v-if="vuelo">
    <ion-card-header>
      <ion-card-title>{{ vuelo.callsign }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>Origen: {{ vuelo.origen_pais }}</p>
      <p>Altitud: {{ vuelo.altitud }} metros</p>
      <p>Latitud: {{ vuelo.ultima_posicion?.latitud }}</p>
      <p>Longitud: {{ vuelo.ultima_posicion?.longitud }}</p>
      <ion-button @click="verMapa">Ver Mapa</ion-button>
    </ion-card-content>
  </ion-card>
  <ion-card v-else>
    <ion-card-header>
      <ion-card-title>Cargando...</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, watch } from 'vue';

const props = defineProps<{
  vuelo: {
    icao24: string;
    callsign: string;
    origen_pais: string;
    ultima_posicion: {
      latitud: number;
      longitud: number;
    } | null;
    altitud: number;
  };
}>();

const router = useRouter();

const verMapa = () => {
  if (props.vuelo.ultima_posicion) {
    router.push({
      name: 'FlightMap',
      params: { icao24: props.vuelo.icao24 },
      query: { lat: props.vuelo.ultima_posicion.latitud, lng: props.vuelo.ultima_posicion.longitud }
    });
  } else {
    console.error('No hay posición disponible para mostrar en el mapa.');
  }
};

// Watcher to ensure that the data is updated properly
watch(() => props.vuelo, (newVuelo) => {
  console.log('Datos del vuelo actualizados:', newVuelo);
});
</script>
