import { Comentarios } from "./comentariosInterface"
import { Imagenes } from "./imagenesInterface"

export interface Campañas {
    id?: number,
    name: string,
    descripcion: string,
    fondos_a_recaudar: number,
    fondos_recaudado_actual? : number,
    user_id?: Number,
    user?: {
        name : string
    },
    comentarios?: Array<Comentarios>
    imagenes: Array<Imagenes>
    showInputComentario? : boolean
}


export interface CampañasResponse {
    campaña : Campañas
}