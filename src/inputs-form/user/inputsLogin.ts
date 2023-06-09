import { GeneratedInputs} from "../../interfaces/form/PropsForm";
import { ref } from "vue";

// Using Record Types
//type KeysLogin = "name" | "password";
//type InputsFormGeneric = Record<KeysLogin, PropsInput>

export const inputsLogin = ref<GeneratedInputs[]>([
        {
            key : "name",
            type : "text",
            validations : {rules : {required : true}},
            placeholder : "nombre de usuario",
            value : null
            
        },
        {
            key: 'password',
            type : "password",
            validations : {rules : {required : true}},
            placeholder : "contraseña",
            value : null
        }
])
    
    
