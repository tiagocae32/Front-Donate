
import { GeneratedInputs } from "../../interfaces/form/PropsForm";
import { ref } from "vue";

export const inputsCrearCampaña = ref<GeneratedInputs[]>([
        {
            key : "name",
            type : "text",
            validations : {rules : {required : true}},
            placeholder : "name de la campaña",
            value : null
            
        },
        {
            key: 'descripcion',
            type : "text",
            validations : {rules : {required : true}},
            placeholder : "descripcion",
            value : null
        },
        {
            key : 'fondos_a_recaudar',
            type : "text",
            validations : {rules : {required : true}},
            placeholder : "fondos a recaudar",
            value : null
        },
        {
            key : "images", 
            type: "file"
        }
])
    
    
