<template>
    <div>
        <form @submit.prevent="crearComentario">
            <input type="text" placeholder="comentario" v-model="comentario" />
            <input type="submit" value="Enviar" />
        </form>
        <button @click="closeInputs">X</button>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import axios from "../../services/ClientAxios";
import { Comentarios } from "../../interfaces/campañas/comentariosInterface";

interface Props {
    index : Number
    campaña_id : Number | undefined
}

// Props
const props = defineProps<Props>();

// Desestructuring value of props
const { index, campaña_id } = toRefs(props);

// Input data
const comentario = ref<string>("");

// Emits
const emit = defineEmits(["closeInputsComentario", "addComentario"]);

// Methods
const closeInputs = () =>  emit("closeInputsComentario", { show: false, index: index?.value });

const crearComentario = async () : Promise<void> =>  {
    try {
        const resServer = await axios.post<Comentarios>("/createComentario", {
        comentario: comentario.value,
        campaña_id: campaña_id?.value,
    });

    if(resServer?.data){
        comentario.value = "";
        emit("addComentario", resServer.data);
    }
    
    } catch (error) {
        console.log(error);
    }
    
};
</script>

<style></style>
