<template>
    <div>
        <p v-if="comentarios.length === 0">No hay comentarios</p>
        <p v-else>
            Esta campaña tiene {{ comentarios.length }} comentarios
        </p>
        <ul v-for="comentario in comentarios" :key="comentario.id">
            <li>Comentario: {{ comentario.comentario }}</li>
            <li>Escrito por: {{ comentario.user.name }}</li>
            <li> Fecha: {{ new Date(comentario.created_at).toLocaleString() }}</li>
            <hr>
            <!--Solo el usuario que realizao el comentario, lo puede eliminar-->
            <button
                v-if="comentario.user_id === idUser"
                :style="{ backgroundColor: 'red', cursor: 'pointer' }"
                @click="eliminarComentario(comentario.id)"
            >
                Eliminar comentario
            </button>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { useUserStore } from "../../stores/userStore";
import axios from "../../services/ClientAxios";
import { Comentarios } from "../../interfaces/campañas/comentariosInterface";

interface Props {
    comentarios : Array<Comentarios>
}

// Props
const props = defineProps<Props>();

// Make a reactive variable through props
const { comentarios } = toRefs(props);

// emits
const emits = defineEmits(["eliminarComentario"]);

// Store
const store = useUserStore();

// Computed properties
const idUser = computed<Number>(() => store.getUser.id);

// Methods
const eliminarComentario = async (id: Number): Promise<void> => {
    try {
        const resServer = await axios.delete(`/eliminarComentario/${id}`);

        if(resServer?.data) emits("eliminarComentario", resServer.data);
    } catch (error) {
        console.log(error);
    }
};
</script>

<style></style>