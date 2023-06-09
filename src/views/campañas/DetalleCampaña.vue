<template>
    <div>
        Detalle de campaña

        <div>
            <router-link :to="{name: 'homeUser'}">Home</router-link>
        </div>

        <div>
            <li>Campaña creada por: {{ campaña?.usuario?.nombre }}</li>
            <li>Nombre: {{ campaña?.nombre }}</li>
            <li>Descripcion: {{ campaña?.descripcion }}</li>
            <li>Fondos a recaudar: {{ campaña?.fondos_a_recaudar }}$</li>
            <li>Fondos recaudados: {{ campaña?.fondos_recaudado_actual }}$</li>
            <ShowImagenes :imagenes="<Array<Imagenes>> campaña?.imagenes"/>
            <div class="box">
            <h3>Porcentaje del total recaudado</h3>
            <div class="bar">
                <div class="progress" :style="{ background: '#f4511e', width:
                (<number> campaña?.fondos_recaudado_actual * 100) / campaña?.fondos_a_recaudar + '%'}"
                ></div>
                <span class="percent">
                    {{ ((<number> campaña?.fondos_recaudado_actual * 100) / campaña?.fondos_a_recaudar).toFixed(2) }}%</span
                >
            </div>
        </div>
        </div>

        <br>
        <button v-if="showButtonDownloadPdf" :style="{marginTop: '5px'}" @click="descargarPdf">Descargar info campaña </button>

    </div>
</template>


<script lang="ts" setup>
import axios from '../../services/ClientAxios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ShowImagenes from '../../components/campañas/ShowImagenes.vue';
import { Campañas } from '../../interfaces/campañas/campañasInterface';
import { useUserStore } from '../../stores/userStore';
import { downloadFiles } from '../../helpers/downloadFiles';
import { Imagenes } from '../../interfaces/campañas/imagenesInterface';

// Store 
const store = useUserStore()

// Router
const { params } = useRoute()

// Local Variables 
const campaña = ref<Campañas>({usuario: {nombre: ""},descripcion: "", fondos_a_recaudar: 0, fondos_recaudado_actual: 0, imagenes : [],nombre: "" })
const idCampaña = Number(params.campania_id)
const showButtonDownloadPdf = ref<boolean>(true)

// On Mounted
onMounted(async () => await loadCampaña())

// Methods
const loadCampaña = async () => {
    const campañas : Array<Campañas> = store.getUser.campañas
    campaña.value  = campañas?.find(campaña => campaña.id === idCampaña)
    if(!campaña.value){
        campaña.value = await getCampañaApi()
        showButtonDownloadPdf.value = false
    }
}

const getCampañaApi = async () : Promise<Campañas> => (await axios.get<Campañas>(`/getCampania/${idCampaña}`)).data

const descargarPdf = async () : Promise<void> => await downloadFiles({url: `/descargarPdfCampania?idCampaña=${campaña?.value.id}`, typeBlob: "application/octec-stream",fileName: "InformeCampaña.pdf"})

</script>

<style></style>