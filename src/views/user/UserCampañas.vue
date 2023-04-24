<template>
    <div>
        <router-link :to="{ name: 'homeUser' }">Ir al inicio</router-link>
        <p v-if="campañas.length === 0">No tienes ninguna campaña creada</p>
        <div v-else>
            <h1>Mis campañas({{campañas.length}})</h1>
            <ul v-for="campaña in campañas" :key="campaña.id">
                <InfoCampaña :campaña="campaña" :notShowUserName="true" @eliminarCampaña="eliminarCampaña" />
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import InfoCampaña from "../../components/campañas/InfoCampaña.vue";
import { Campañas } from "../../interfaces/campañas/campañasInterface";
import { useUserStore } from "../../stores/userStore";

// Store
const store = useUserStore();

// Computed properties
const campañas = computed<Array<Campañas>>(() => store.getCampañas);

//Methods

const eliminarCampaña = (id : number) => store.deleteCampaña(id)


</script>

<style>
.box {
    width: 800px;
    padding: 40px;
    background: #f3f3f3;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.1);
}

ul li {
    list-style-type: none;
    padding: 10px;
}

.bar {
    width: 100%;
    background: #dfdfdf;
    overflow: hidden;
    padding: 5px;
}

.progress {
    padding: 15px;
    float: left;
}

.percent {
    float: right;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
}
</style>
