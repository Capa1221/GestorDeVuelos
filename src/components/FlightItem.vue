<template>
  <ion-item @click="verDetalles">
    <ion-label>{{ vuelo.callsign }}</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  vuelo: {
    icao24: string;
    callsign: string;
  };
}>();

const router = useRouter();

const verDetalles = () => {
  router.push({ name: 'FlightDetails', params: { icao24: props.vuelo.icao24 } });
};
</script>

<style scoped>
/* Tus estilos existentes */
</style>
