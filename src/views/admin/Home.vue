<template>
    <div>
        <h1>Admin Home</h1>

        <div>
            <InputSearchUsers
                :cleanInput="cleanInput"
                @buscarUsuario="buscarUsuarios"
            />
        </div>

        <div>
            <button v-if="isSearch" @click="limpiarBusqueda">
                Limpiar busqueda
            </button>
        </div>

        <div>
            <h3>Usuarios del sistema: {{ users.length }}</h3>
            <ul v-for="{id, nombre,email,campañas,rol:{rol}, created_at} in users" :key="id">
                <li>
                    Name - {{ nombre }} | Email {{ email }} | Numero de
                    campañas creadas: {{ campañas?.length }}
                    | Rol : {{rol}} | Fecha de creacion: {{new Date(created_at).toLocaleString()}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "../../services/ClientAxios";
import { User } from "../../interfaces/users/userInterface";
import InputSearchUsers from "../../components/users/InputSearchUsers.vue";

// On mounted function
onMounted(() => {
    loadUsers();
});

// Variables
const users = ref<Array<User>>([]);
const refOriginalValuesUser = ref<Array<User>>([]);
const isSearch = ref<boolean>(false);
const cleanInput = ref<boolean>(false);

// Methods
const loadUsers = async (): Promise<void> => {
    try {
        const resServer = await axios.get<Array<User>>("/getUsers");
        if (resServer.data) {
            const { data } = resServer;
            users.value = data;
            refOriginalValuesUser.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};

const buscarUsuarios = (data: Array<User>) : void => {
    isSearch.value = true;
    cleanInput.value = false;
    users.value = data;
};

const limpiarBusqueda = () : void => {
    users.value = refOriginalValuesUser.value;
    isSearch.value = false;
    cleanInput.value = true;
};
</script>

<style></style>
