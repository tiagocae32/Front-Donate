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
import { User } from "../../interfaces/users/userInterface";
import { useRouter } from "vue-router";
import { decodeCredential } from "vue3-google-login";
import { showAlert } from "../../helpers/showAlerts";
import FormGeneric from "../../generic/FormGeneric.vue";
import { inputsLogin } from "../../inputs-form/user/inputsLogin"

// Access to the this keyword
const app = getCurrentInstance()?.appContext.config.globalProperties;

// Store
const { setUser } = useUserStore();

// Router
const router = useRouter();

// Local interfaces
interface ResponseGoogle {
    credential : string
}

interface userCredential {
    email : string
}

// User instance 
const userService = UserService.getInstance

// Ref Form Generic
const refFormGeneric = ref<InstanceType<typeof FormGeneric> | null>(null)

const login = async (): Promise<void> => {
        const { isFormValid, data } = refFormGeneric.value.processformValues();
        if(!isFormValid) return
        await makeRequest({ data  , url : 'login'});
};

const loginGoogle = async ({credential} : ResponseGoogle) : Promise<void> => {
    const user = decodeCredential(credential) as userCredential;
    await makeRequest({data : { email : user.email }, url: 'loginGoogle'})
};

const makeRequest  = async (dataParam) : Promise<void> => {
    try {
        const { error, token, user } = await userService.login(dataParam)
        if(error) throw error
        setUser({user, token}) // store user
        showAlert(app, "Success", "Login exitoso!", "success");
        redirectUser(user)
    }catch (error : any) {
        showAlert(app, "Login Fallido", error, "error");
    }
}

const redirectUser = (user : User): void => {
    const roles_ids_users = [2,3]

    if (user.rol_id === 1) {
        router.replace({ name: "homeAdmin" });
    } else if (roles_ids_users.includes(<number> user.rol_id)) {
        router.replace({ name: "homeUser" });
    }
};
</script>

<style></style>