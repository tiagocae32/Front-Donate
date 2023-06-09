<template>
    <div>
        <router-link :to="{ name: 'homeUser' }">Go Home</router-link>
        <h2>Crear campaña</h2>

        <form @submit.prevent="crearCampaña">
            <FormGeneric
                :inputs="inputsCrearCampaña"
                ref="refFormGeneric"
            />

            <input
                type="submit"
                value="Crear Campaña"
            />
        </form>

      <!--  <div v-if="previewImagesCampaña.length > 0">
            <img :style="{margin: '5px'}" v-for="(src,index) in previewImagesCampaña" :key="index" width="200" height="200" :src="src" alt="No image campaña">
        </div>
        --> 
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios";
import FormGeneric from "../../generic/FormGeneric.vue";
import { getCurrentInstance, ref, onMounted } from "vue";
import { Campañas } from "../../interfaces/campañas/campañasInterface";
import { showAlert } from "../../helpers/showAlerts";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { inputsCrearCampaña } from "../../inputs-form/campañas/inputsCrearCampaña";
import { convertObjToFormData } from "../../helpers/convertObjToFormData";

// Access to the this keyword
const app = getCurrentInstance()?.appContext.config.globalProperties;

// On Mounted Hook
onMounted(() => {
    /*
        setInterval(() => {
            autoSaveCampaña()
        }, 5000)
    */   
})

// Ref Form Generic
const refFormGeneric = ref<InstanceType<typeof FormGeneric> | null>(null)

//const previewImagesCampaña = ref([])

// Router
const router = useRouter();

// Store
const store = useUserStore();


// Methods

const autoSaveCampaña = () => {
    console.log("auto save campaña");
    //console.log("data", dataCampaña.value);
}

const crearCampaña = async () : Promise<void | null> => {
    try {
        let { isFormValid, data } = refFormGeneric.value.processformValues();
        console.log("data", data);
        if(!isFormValid) return

        if(data.images){
            data = convertObjToFormData(data);
        }

        console.log("data test", data);

        const resServer = await axios.post<Campañas>("/crearCampania", data);

        if(resServer?.status === 200 || resServer?.status === 201){
            // User alerts
            showAlert(app, "Success", "Campaña creada!", "success");

            // Actualizando el store para mostrar la campaña nueva en el momento
            store.setCampañas(resServer.data);

            router.replace({ name: "misCampañas" });
        }

        } catch (error) {
            showAlert(app, "Registro fallido", error, "error");
            return null;
        }
    };
</script>

<style></style>