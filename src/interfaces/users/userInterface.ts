import { Campañas } from "../campañas/campañasInterface"
import { Permisos } from "./permisosInterface";
import { Rol } from "./rolInterface";

export interface User {
     id?: number,
     name: string | null;
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
    name : string,
    password : string,
    email? : string
}


export interface LoginResponse {
    data? : {
        user : User,
        token : string
    }
    error?: object
}
export interface ParamsLoginService {
    data : object
    url : string
}

export interface UserHttpService {
    login(data : ParamsLoginService) : Promise<LoginResponse>,
    logout() : Promise<object>
}
