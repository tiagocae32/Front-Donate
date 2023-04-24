<template>
    <div>
        <input
            v-model="usuario"
            @change="buscarUsuarios"
            type="text"
            placeholder="Busqueda de usuario"
        />
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios";
import { ref, toRefs, watchEffect } from "vue";

// Input data
const usuario = ref("");

// Define emits
const emit = defineEmits(["buscarUsuario"]);

// Props
const props = defineProps({
    cleanInput: Boolean,
});

// Make props reactive
const { cleanInput } = toRefs(props);

// Watcher
watchEffect(() => {
    if (cleanInput.value) usuario.value = "";
});

// Methods
const buscarUsuarios = async (): Promise<void> => {
    if (usuario.value === "") return;
    const { data } = await axios.get(`/buscarUsuarios/${usuario.value}`);
    emit("buscarUsuario", data);
};
</script>

<style></style>
