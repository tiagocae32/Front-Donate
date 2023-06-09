<template>
    <div>
        <form @submit.prevent="userRegister">
            <FormGeneric
                :inputs="inputsRegister"
                ref="refFormGeneric"
            />
            <br />
            <input :disabled="disableButton" type="submit" value="Register" />
        </form>

        <router-link :to="{ name: 'authLogin' }"
            >Ya tienes una cuenta? Login</router-link
        >
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue";
import axios from "../../services/ClientAxios";
import { useRouter } from "vue-router";
import { showAlert } from "../../helpers/showAlerts";
import { User } from "../../interfaces/users/userInterface";
import { inputsRegister } from "../../inputs-form/user/inputsRegister";
import FormGeneric from "@/generic/FormGeneric.vue";
import { convertObjToFormData } from "../../helpers/convertObjToFormData"

// Access to the this keyword
const app = getCurrentInstance()?.appContext.config.globalProperties;

// Ref Form Generic
const refFormGeneric = ref<InstanceType<typeof FormGeneric> | null>(null)

// Router
const router = useRouter();

// Methods

// Button disabled
const disableButton = ref<boolean>(false)
//const checkError = (inputs : GeneratedInputs[])  => disableButton.value = checkInputsError(inputs);
//const getDataForm = (data : UserData) => userData.value = {...data};

const userRegister = async (): Promise<void | null> => {
        
        try {
            let { isFormValid, data } = refFormGeneric.value.processformValues();
            if(!isFormValid) return

            if(data.images){
                data = convertObjToFormData(data);
            }

            const resServer = await axios.post<User>("/registrarUsuario", data);

            if(resServer?.status === 200 || resServer?.status === 201){
                // User alerts
                showAlert(app, "Success", "Registro exitoso!", "success");
                router.replace({ name: "authLogin" });
            }

        } catch (error) {
            showAlert(app, "Registro fallido", error, "error");
            return null;
        }
}

</script>

<style></style>