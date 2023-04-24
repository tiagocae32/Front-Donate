<template>
    <div>
        <div :style="{marginTop: '10px'}">
            <router-link :to="`/perfilUsuario/${user.id}`">Perfil usuario</router-link>
        </div>
        <div>
            <div v-if="store.verificarPermiso(Permisos.CCA)">
            <router-link  :to="{name: 'crearCampaña'}">Crear campaña</router-link>
            <br>
            <router-link :to="{name: 'misCampañas'}">Tus campañas</router-link>
            </div>
        </div>
       
        <p v-if="campañas.length === 0"> No hay campañas para mostrar</p>
        <div v-else>
            <h3>Feed principal</h3>
            <InputSearchCampañas
                v-if="campañas.length > 0"
                :cleanInput="cleanInput"
                @buscarCampañas="buscarCampañas"
            />
            <div>
                <button v-if="isSearch" @click="limpiarBusqueda">
                    Limpiar busqueda
                </button>
            </div>
            <ul v-for="(campaña, index) in campañas" :key="campaña.id">
                <InfoCampaña :campaña="campaña" :not-show-user-name="false" @eliminarComentario="eliminarComentario"  />
                <div>
                    <button
                        v-if="store.verificarPermiso(Permisos.CC)"
                        @click="showInputs({ show: true, index })"
                    >
                        Dejar un comentario
                    </button> 
                </div>
                <div v-if="campaña.showInputComentario">
                    <CrearComentario
                        :index="index"
                        :campaña_id="campaña.id"
                        @closeInputsComentario="showInputs"
                        @addComentario="addComentario"
                    />
                </div>
                <router-link
                    v-if=" store.verificarPermiso(Permisos.RD) 
                           && (<number> campaña.fondos_recaudado_actual < campaña.fondos_a_recaudar)"
                    :to="`/donaciones/${campaña.id}`"
                    >Donar</router-link
                >
                <hr>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "../../services/ClientAxios";
import { computed, onMounted, ref } from "vue";
import { Permisos } from "../../enums/enumsPermisos";
import { Campañas } from "../../interfaces/campañas/campañasInterface";
import { Comentarios  } from "../../interfaces/campañas/comentariosInterface";
import { useUserStore } from "../../stores/userStore";
import InfoCampaña from "../../components/campañas/InfoCampaña.vue";
import InputSearchCampañas from "../../components/campañas/InputSearchCampañas.vue";
import CrearComentario from "../../components/campañas/CrearComentario.vue";
import { User } from "@/interfaces/users/userInterface";

// On mounted function
onMounted(() => {
    loadCampañas();
});

// Store
const store = useUserStore();

// Computed properties
const user = computed<User>(() => store.getUser);

// Variables
const campañas = ref<Array<Campañas>>([]);
const refOriginalValuesCampaña = ref<Array<Campañas>>([]);
const isSearch = ref<boolean>(false);
const cleanInput = ref<boolean>(false);

// Methods
const loadCampañas = async (): Promise<void> => {
    const resServer = await axios.get<Array<Campañas>>("/getCampanias");
    if (resServer?.data) {
        console.log("Res server campañas", resServer);
        const { data } = resServer;
        data.forEach((val: Campañas) => (val.showInputComentario = false));
        campañas.value = data;
        refOriginalValuesCampaña.value = data;
    }
};

interface PropsInputs {
    show: boolean;
    index: number;
}

const showInputs = ({ show, index }: PropsInputs): void => {
    campañas.value[index].showInputComentario = show;

    //Solo dejo un input de comentarios abierto a la vez
    campañas.value
        .filter((_, i) => i !== index)
        .forEach((el) => (el.showInputComentario = false));
};

const addComentario = (comentario: Comentarios): void => {
    const indexCampaña = campañas.value.findIndex(campaña => campaña.id === comentario.campaña_id)
    campañas.value[indexCampaña].comentarios.push(comentario)
};

const eliminarComentario = (comentarioDelete: Comentarios) : void => {
    const indexCampaña = campañas.value.findIndex(campaña => campaña.id === comentarioDelete.campaña_id)
    const indexComentario = campañas.value[indexCampaña].comentarios.findIndex(comentario => comentario.id === comentarioDelete.id)
    campañas.value[indexCampaña].comentarios.splice(indexComentario,1);
}

const buscarCampañas = (data: Array<Campañas>) : void => {
    isSearch.value = true;
    cleanInput.value = false;
    campañas.value = data;
};

const limpiarBusqueda = () : void => {
    campañas.value = refOriginalValuesCampaña.value;
    isSearch.value = false;
    cleanInput.value = true;
};
</script>

<style></style>