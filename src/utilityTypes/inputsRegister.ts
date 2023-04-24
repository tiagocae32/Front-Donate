import { PropsInput } from "../interfaces/form/PropsForm";
import { ref } from "vue";

// Using Record Types
type KeysLogin = "name" | "email" | "password";
type InputsFormGeneric = Record<KeysLogin, PropsInput>

export const inputsRegister = ref<InputsFormGeneric>({
    name : {
        type : "text",
        validations : {rules : {required : true, minLength : 6}},
        placeholder : "username",
        value : null
    },
    email : {
        type : "text",
        validations : {rules : {required : true, email : true}},
        placeholder : "email",
        value : null
    },
    password : {
        type : "password",
        validations : {rules : {required : true}},
        placeholder : "password",
        value : null
    }
})