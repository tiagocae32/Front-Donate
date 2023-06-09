import { Campañas } from "../campañas/campañasInterface"
import { Permisos } from "./permisosInterface";
import { Rol } from "./rolInterface";

export interface User {
     id?: number,
     nombre: string | null;
     email?: string | null;
     rol_id: number | null,
     created_at? : Date,
     campañas? : Array<Campañas>,
     permisos: Array<Permisos>,
     rol?: Rol
}

export interface UserStore {
    isAuth?: Boolean,
    user: User
}

export interface UserData {
    nombre : string,
    contraseña : string,
    email? : string
}


export interface UserResponse {
    error? : {
        errors : any
    },
    token?: string,
    user? : User,
}

export interface UserHttpService {
    login(data : UserData) : Promise<UserResponse>,
    logout() : Promise<object>
}
