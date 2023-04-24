<template>
    <div>
        <router-link :to="{ name: 'homeUser' }">Volver al home</router-link>
        <h1>Donaciones</h1>

        <div>
            <form @submit.prevent="sendForm">
                <input
                    type="number"
                    placeholder="monto a donar"
                    v-model="monto"
                />
                <br />
                <input type="submit" value="Donar" />
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Router
const router = useRouter();
const route = useRoute();

// Variables
const monto = ref<string>("");

// Methods
const sendForm = async () : Promise<void> => {
    try {
        const dataForm = {
            dinero_donado: monto.value,
            campaña_id: Number(route.params.id),
        };

        await axios.post("/donaciones", dataForm);

        monto.value = "";

        router.replace({ name: "homeUser" });
    } catch (error) {
        console.log(error);
    }
};
</script>

<style></style>