<template>
  <div id="map" style="width: 100%; height: 100%;" v-if="!loading && !error"></div>
  <div v-else-if="loading" class="loading-container">
    <ion-spinner name="crescent"></ion-spinner>
    <p>Cargando mapa...</p>
  </div>
  <div v-else class="error-container">
    <ion-icon name="alert-circle-outline"></ion-icon>
    <p>Error al cargar el mapa. Inténtalo de nuevo.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IonSpinner, IonIcon } from '@ionic/vue';

const props = defineProps<{
  center: [number, number];
  callsign: string;
}>();

const map = ref<L.Map | null>(null);
const loading = ref(true);
const error = ref(false);

onMounted(() => {
  try {
    map.value = L.map('map').setView(props.center, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map.value);

    L.marker(props.center).addTo(map.value)
      .bindPopup(props.callsign)
      .openPopup();

    loading.value = false;
  } catch (e) {
    console.error('Error initializing map:', e);
    error.value = true;
    loading.value = false;
  }
});

watch(() => props.center, (newCenter) => {
  if (map.value) {
    map.value.setView(newCenter, 13);
    L.marker(newCenter).addTo(map.value)
      .bindPopup(props.callsign)
      .openPopup();
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.loading-container p,
.error-container p {
  margin-top: 1rem;
}
</style>
