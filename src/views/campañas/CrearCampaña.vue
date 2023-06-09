<template>
    <div>
        <router-link :to="{ name: 'homeUser' }">Go Home</router-link>
        <h2>Crear campaña</h2>

        <div v-if="previewImagesCampaña.length > 0">
            <img :style="{margin: '5px'}" v-for="(src,index) in previewImagesCampaña" :key="index" width="200" height="200" :src="src" alt="No image campaña">
        </div>

        <div>
            <form @submit.prevent="crearCampaña">
                <input
                    type="text"
                    placeholder="nombre campaña"
                    v-model="dataCampaña.name"
                />
                <textarea
                    placeholder="descripcion"
                    v-model="dataCampaña.description"
                ></textarea>
                <input
                    type="number"
                    placeholder="monto a recaudar"
                    v-model="dataCampaña.fondos_a_recaudar"
                />

                <input type="file" multiple @change="setImages" />

                <input
                    :disabled="disabledSubmitButton"
                    type="submit"
                    value="Crear Campaña"
                />
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios";
import { computed, getCurrentInstance, ref, onMounted } from "vue";
import { Campañas } from "../../interfaces/campañas/campañasInterface";
import { showAlert } from "../../helpers/showAlerts";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { previewImage } from "../../helpers/previewImage";

// Access to the this keyword
const instanceThis = getCurrentInstance()?.appContext.config.globalProperties;

// On Mounted Hook
onMounted(() => {
    /*
        setInterval(() => {
            autoSaveCampaña()
        }, 5000)
    */   
})

// Variables
const dataCampaña = ref<Campañas>({
    name: "",
    description: "",
    fondos_a_recaudar: 0,
    images: [],
});

const previewImagesCampaña = ref([])

// Form Data instance
const formData = new FormData();

// Router
const router = useRouter();

// Store
const store = useUserStore();

// Computed
const disabledSubmitButton = computed<boolean>(() => {
    const keys = ['name','description', 'fondos_a_recaudar']
    const enableButton = keys.some(key=> !dataCampaña.value[key])
    return enableButton
});

// Methods

const autoSaveCampaña = () => {
    console.log("auto save campaña");
    console.log("data", dataCampaña.value);
}

const crearCampaña = async () : Promise<void> => {
    try {
        Object.entries(dataCampaña.value).forEach(([key, val]) => {
            if (key !== "images") formData.append(key, val);
            else {
                console.log(dataCampaña.value[key]);
                dataCampaña.value[key].forEach((file, index: Number) => {
                    formData.append(`images[${index}]`, file);
                });
            }
        });

        const resServer = await axios.post<Campañas>("/crearCampania",formData);

        console.log(resServer);

        if(resServer?.data){
            // User alerts
            showAlert(instanceThis, "Success", "Campaña creada!", "success");

            // Actualizando el store para mostrar la campaña nueva en el momento
            store.setCampañas(resServer.data);

            router.replace({ name: "misCampañas" });
        }
    } catch (error) {
        console.log(error);
    }
};
interface InputFileEvent extends Event {
    target: HTMLInputElement;
}
const setImages = async (event: InputFileEvent) : Promise<void> => {
    dataCampaña.value.images = []
    previewImagesCampaña.value = []
    Object.values(event.target.files).forEach(async (file) => {
        dataCampaña.value.images.push(file);
        const src = await previewImage(file)
        previewImagesCampaña.value.push(src)
    });

};
</script>

<style></style>