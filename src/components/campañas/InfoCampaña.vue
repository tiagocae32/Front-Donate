<template>
    <div>
        <strong
            v-if="<number> campaña.fondos_recaudado_actual >= campaña?.fondos_a_recaudar"
            >Esta campaña ha alcanzado su objetivo
        </strong>
        <button v-if="route.name === 'misCampañas'" @click="eliminarCampaña">Eliminar campaña</button>
        <li v-if="campaña.user && !notShowUserName">
            Campaña creada por: {{ campaña.user.name }}
        </li>
        <li>Nombre: {{ campaña?.name }}</li>
        <li>Descripcion: {{ campaña?.description }}</li>
        <li>Fondos a recaudar: {{ campaña?.fondos_a_recaudar }}$</li>
        <li>Fondos recaudados: {{ campaña?.fondos_recaudado_actual }}$</li>
        <br>
        <router-link :to="`/campania/${campaña.id}`">Ir al detalle de la campaña</router-link>
        <br>
        <div>
            <ShowComentarios
                :comentarios="<Array<Comentarios>> campaña.comentarios"
                @eliminarComentario="eliminarComentario"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios"
import {useRoute} from "vue-router"
import { toRefs } from "vue";
import ShowComentarios from "../campañas/ShowComentarios.vue";
import { Campañas } from "../../interfaces/campañas/campañasInterface";
import { Comentarios } from "../../interfaces/campañas/comentariosInterface";
import { InfoCampañaProps } from "../../typeProps/InfoCampañaProps"


// Props
const props = defineProps({
  ...InfoCampañaProps
});

// Creando una variable reactiva de la prop recibida
const { campaña, notShowUserName } = toRefs(props)

// Route 
const route = useRoute()

// emits
const emits = defineEmits(["eliminarCampaña","eliminarComentario"]);

// Methods
const eliminarCampaña = async () => {
    const { data } = await axios.delete<Campañas>(`/eliminarCampania/${campaña.value.id}`)
    emits("eliminarCampaña", data)
}

const eliminarComentario = (comentarioDelete: object): void => emits("eliminarComentario", comentarioDelete);

</script>

<style></style>