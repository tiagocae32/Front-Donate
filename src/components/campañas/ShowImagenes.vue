<template>
    <h3 v-if="imagenes?.length > 0">Imagenes</h3>
    <li v-for="{ path , id } in imagenes" :key="id">
        <img :src="`${urlImage}${params.campania_id}/${path}`" width="200" height="200" alt="No image campaña" />
    </li>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { Imagenes } from '../../interfaces/campañas/imagenesInterface';

interface Props {
    imagenes : Array<Imagenes>
}

// Props
defineProps<Props>();

//Route
const { params } = useRoute()

//Variables
const urlImage = "http://localhost:8000/storage/imagenesCampañas/"

</script>

<style></style>