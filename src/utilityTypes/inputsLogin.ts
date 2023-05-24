import { PropsInput } from "../interfaces/form/PropsForm";
import { ref } from "vue";

// Using Record Types
//type KeysLogin = "name" | "password";
//type InputsFormGeneric = Record<KeysLogin, PropsInput>

export const inputsLogin = ref<PropsInput[]>([
        {
            key : "name",
            type : "text",
            validations : {rules : {required : true}},
            placeholder : "username",
            value : null
            
        },
        {
            key: 'password',
            type : "password",
            validations : {rules : {required : true}},
            placeholder : "password",
            value : null
        }
])
    
    
