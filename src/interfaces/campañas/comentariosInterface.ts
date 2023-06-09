export interface Comentarios {
    readonly id: number,
    usuario_id: number,
    readonly campaña_id: number,
    comentario: string,
    created_at : Date,
    user : {
        name : string
    }
}