import { Comentarios } from "./comentariosInterface"
import { Imagenes } from "./imagenesInterface"

export interface Campañas {
    id?: number,
    nombre: string,
    descripcion: string,
    fondos_a_recaudar: number,
    fondos_recaudado_actual? : number,
    usuario_id?: Number,
    usuario?: {
        nombre : string
    },
    comentarios?: Array<Comentarios>
    imagenes: Array<Imagenes>
    showInputComentario? : boolean
}


export interface CampañasResponse {
    campaña : Campañas
}