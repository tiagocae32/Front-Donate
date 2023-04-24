<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">

            <FormGeneric
                :inputs="inputsLogin"
                ref="refFormGeneric"
            />

            <b-button type="submit" variant="primary">Login</b-button>
        </form>

        <div>
            <GoogleLogin :callback="loginGoogle" />
        </div>

        <router-link :to="{ name: 'authRegister' }"
            >No tienes una cuenta? Registrese</router-link
        >
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue";
import { UserService } from "../../services/auth/Auth";
import { useUserStore } from "../../stores/userStore";
import { ParamsLoginService, User } from "../../interfaces/users/userInterface";
import { useRouter } from "vue-router";
import { decodeCredential } from "vue3-google-login";
import { showAlert } from "../../helpers/showAlerts";
import FormGeneric from "../../generic/FormGeneric.vue";
import { inputsLogin } from "../../utilityTypes/inputsLogin"

// Access to the this keyword
const app = getCurrentInstance()?.appContext.config.globalProperties;

// Store
const userStore = useUserStore();

// Router
const router = useRouter();

// Local interfaces
interface ResponseGoogle {
    credential : string
}

interface userCredential {
    email : string
}

let objLogin = ref<ParamsLoginService>({
    data : {},
    url : ""
});

// User instance 
const userService = UserService.getInstance

// Ref Form Generic
const refFormGeneric = ref<InstanceType<typeof FormGeneric> | null>(null)

const login = async (): Promise<void> => {
        const { isFormValid, values } = refFormGeneric.value.processDataBack();
        console.log("is valid", isFormValid, "values", values);
        if(!isFormValid) return

        objLogin.value = {data : values as ParamsLoginService, url : 'login'}
        const result = await makeRequest(objLogin.value);
};

const loginGoogle = async ({credential} : ResponseGoogle) : Promise<void> => {
    const user = decodeCredential(credential) as userCredential;
    objLogin.value = {data : { email : user.email }, url: 'loginGoogle'}
    const result = await makeRequest(objLogin.value)
    console.log("result", result);
};

const makeRequest  = async (data : ParamsLoginService) : Promise<void> => {
    try {
        const result = await userService.login(data)
        if(result.error) throw result.error

        setUserStoreAndRedirect(result.data.user)
        localStorage.setItem("token", result.data.token)
        console.log(result.data.user);
    }catch (error : any) {
        showAlert(app, "Login Fallido", error, "error");
    }
}

const setUserStoreAndRedirect = (user : User): void => {

    // Set data in store
    userStore.setUser(user)

    // User alerts
    showAlert(app, "Success", "Login exitoso!", "success");

    const roles_ids_users = [2,3]

    if (user.rol_id === 1) {
        router.replace({ name: "homeAdmin" });
    } else if (roles_ids_users.includes(<number> user.rol_id)) {
        router.replace({ name: "homeUser" });
    }
};
</script>

<style></style>