<template>
    <div>
        <input
            v-model="campaña"
            @change="buscarCampañas"
            type="text"
            placeholder="Busqueda de campaña"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watchEffect } from "vue";
import axios from "../../services/ClientAxios";
import { Campañas } from "../../interfaces/campañas/campañasInterface";

interface Props {
    cleanInput : boolean
}

// Props
const props = defineProps<Props>();

// Make props reactive
const { cleanInput } = toRefs(props);

// Input data
const campaña = ref<string>("");

// Define emits
const emit = defineEmits(["buscarCampañas"]);

// Watcher
watchEffect(() => {
    if (cleanInput.value) campaña.value = "";
});

// Methods
const buscarCampañas = async (): Promise<void> => {
    if (campaña.value === "") return;
    const { data } = await axios.get<Campañas>(`/buscarCampanias/${campaña.value}`);
    emit("buscarCampañas", data);
};
</script>

<style></style>