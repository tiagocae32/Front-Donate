import { PropsInput } from "../../interfaces/form/PropsForm";
import { ref } from "vue";

// Using Record Types
//type KeysLogin = "name" | "email" | "password";
//type InputsFormGeneric = Record<KeysLogin, PropsInput>

export const inputsRegister = ref<PropsInput[]>(
    
    [
        {
            key : "name",
            type : "text",
            validations : {rules : {required : true, minLength : 6}},
            placeholder : "username",
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
            key : "password",
            type : "password",
            validations : {rules : {required : true}},
            placeholder : "password",
            value : null
        },
        {
            key : "images", 
            type: "file"
        }
])