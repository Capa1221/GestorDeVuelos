<!-- BackButton.vue -->
<template>
    <ion-button @click="regresar" color="primary">
      <ion-icon slot="start" :icon="arrowBack"></ion-icon>
      Regresar
    </ion-button>
  </template>
  
  <script setup lang="ts">
  import { arrowBack } from 'ionicons/icons';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const regresar = () => {
    router.go(-1); // Regresa una página en el historial del navegador
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales según necesidades específicas */
  </style>
  