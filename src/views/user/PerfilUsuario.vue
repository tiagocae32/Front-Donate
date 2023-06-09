<template>
    <div>
        <router-link to="/homeUser">Home</router-link>
        <div>
            <h3>Tu informacion</h3>
            <button v-if="!isEdit" @click="isEdit = true">Editar</button>
            <button v-else @click="closeEdit">X</button>
            <div v-if="!isEdit">
                <p>Nombre de usuario: {{user.nombre}}</p>
                <p>Email: {{user.email}} </p>
            </div>
            <div v-else>
                <input type="text"  v-model="userEdit.usuario">
                <input type="text" v-model="userEdit.email">
                <button @click="editarUsuario">Editar</button>
            </div>
            <p>Numero de campañas creadas: {{user.campañas.length}}</p>
            <div>
                <h2>Tus permisos:</h2>
                <ul v-for="({permiso},index) in user.permisos" :key="index">
                    <li>{{permiso}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed,ref } from "vue";
import { User } from "../../interfaces/users/userInterface";
import { useUserStore } from "../../stores/userStore";
import axios from "../../services/ClientAxios"
import { useRoute } from "vue-router";

// Store
const store = useUserStore()

// Route

const {params} = useRoute()

// Computed properties
const user = computed<User>(() => store.getUser);

// Variables
const isEdit = ref<boolean>(false)

const userEdit = ref({
    usuario : user.value.nombre,
    email: user.value.email
})

// Methods
const closeEdit = () => {
    isEdit.value = false
    userEdit.value.usuario = user.value.nombre
    userEdit.value.email = user.value.email
}

const editarUsuario = async () : Promise<void> => {

    const { data } = await axios.put<User>(`/editarUsuario/${params.user_id}`, userEdit.value)

    /*Object.keys(user.value).forEach(key => {
        user.value[key] = data[key]
    })*/

    user.value.nombre = data.nombre
    user.value.email = data.email

    isEdit.value = false
}

</script>

<style scoped></style>