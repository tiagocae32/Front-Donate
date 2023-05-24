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
import { inputsRegister } from "../../utilityTypes/inputsRegister";
//import { GeneratedInputs } from "../../interfaces/form/PropsForm";
//import { checkInputsError } from "../../helpers/inputsError";
import FormGeneric from "@/generic/FormGeneric.vue";


// Access to the this keyword
const app = getCurrentInstance()?.appContext.config.globalProperties;

// Ref Form Generic
const refFormGeneric = ref<InstanceType<typeof FormGeneric> | null>(null)

// Router
const router = useRouter();

// Form data
/*const userData = ref<UserData>({
    name: "",
    email: "",
    password: "",
});
*/

// Methods

// Button disabled
const disableButton = ref<boolean>(false)
//const checkError = (inputs : GeneratedInputs[])  => disableButton.value = checkInputsError(inputs);
//const getDataForm = (data : UserData) => userData.value = {...data};

const userRegister = async (): Promise<void | null> => {
        try {

            const { isFormValid, data } = refFormGeneric.value.processformValues();
            if(!isFormValid) return

            const resServer = await axios.post<User>("/registrarUsuario", data);

            // User alerts
            showAlert(app, "Success", "Registro exitoso!", "success");

            if (resServer.data) {
                router.replace({ name: "authLogin" });
            }
        } catch (error) {
            showAlert(app, "Registro fallido", error, "error");
            return null;
    }
}

</script>

<style></style>