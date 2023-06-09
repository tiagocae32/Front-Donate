import { GeneratedInputs } from "../../interfaces/form/PropsForm";
import { ref } from "vue";

// Using Record Types
//type KeysLogin = "name" | "email" | "password";
//type InputsFormGeneric = Record<KeysLogin, PropsInput>

export const inputsRegister = ref<GeneratedInputs[]>(
    
    [
        {
            key : "name",
            type : "text",
            validations : {rules : {required : true, minLength : 6}},
            placeholder : "name de usuario",
            value : null
            
        },
        {
            key: "email",
            type : "email",
            validations : {rules : {required : true, email : true}},
            placeholder : "email",
            value : null
        },
        {
            key : "contraseña",
            type : "password",
            validations : {rules : {required : true}},
            placeholder : "contraseña",
            value : null
        },
        {
            key : "images", 
            type: "file"
        }
])