import { PropType } from "vue";
import { Campañas } from "../interfaces/campañas/campañasInterface";


export const InfoCampañaProps = {
    campaña : {
        type: Object as PropType<Campañas>,
        required : true,
        default : {}
    },
    notShowUserName : {
        type : Boolean as PropType<Boolean>,
        required : true
    }
}